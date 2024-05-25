import requests
import psycopg2
from psycopg2 import sql, extras
import os
from dotenv import load_dotenv
from time import sleep

load_dotenv()


# Function to fetch the list of genres from TMDB
def fetch_genres():
    api_key = os.environ.get('API_KEY')
    if not api_key:
        return {}

    url = f"https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key={api_key}"
    response = requests.get(url)

    if response.status_code == 200:
        genres = response.json().get('genres', [])
        return {genre['id']: genre['name'] for genre in genres}
    else:
        return {}


# Function to fetch movie data from the API
def fetch_movies(page_index):
    api_key = os.environ.get('API_KEY')
    if not api_key:
        return None

    url = f"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page={page_index}&api_key={api_key}"
    headers = {"accept": "application/json"}
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        return None


# Function to insert movie and genre data into PostgreSQL database
def insert_movies_and_genres(movies, genres, cursor, existing_genres):
    new_genres = []
    movie_data = []
    movie_genre_data = []

    for movie in movies['results']:
        movie_id = movie['id']
        title = movie['title']
        release_date = movie.get('release_date', None)
        poster_path = movie.get('poster_path', None)
        vote_average = movie.get('vote_average', 0.0)
        popularity = movie.get('popularity', 0.0)

        if not release_date or not title:
            continue

        movie_data.append((movie_id, title, release_date, poster_path, vote_average, popularity))

        for genre_id in movie['genre_ids']:
            if genre_id not in existing_genres:
                genre_name = genres.get(genre_id, 'Unknown')
                new_genres.append((genre_id, genre_name))
                existing_genres.add(genre_id)
            movie_genre_data.append((movie_id, genre_id))

    # Insert new genres
    if new_genres:
        insert_genre_query = sql.SQL("INSERT INTO genre (id, name) VALUES %s ON CONFLICT (id) DO NOTHING")
        extras.execute_values(cursor, insert_genre_query, new_genres)

    # Insert movies
    if movie_data:
        insert_movie_query = sql.SQL(
            "INSERT INTO movie (id, title, release_date, poster_path, vote_average, popularity)"
            " VALUES %s ON CONFLICT (id) DO NOTHING"
        )
        extras.execute_values(cursor, insert_movie_query, movie_data)

    # Insert movie_genre relationships
    if movie_genre_data:
        insert_movie_genre_query = sql.SQL(
            "INSERT INTO movie_genre (movie_id, genre_id) VALUES %s ON CONFLICT DO NOTHING")
        extras.execute_values(cursor, insert_movie_genre_query, movie_genre_data)


def main():
    genres = fetch_genres()
    if not genres:
        return

    try:
        conn = psycopg2.connect(
            dbname=os.environ.get('DB_NAME'),
            user=os.environ.get('DB_USERNAME'),
            password=os.environ.get('DB_PASSWORD'),
            host=os.environ.get('DB_HOST')
        )
        cursor = conn.cursor()

        # Fetch existing genres to avoid duplicates
        cursor.execute("SELECT id FROM genre")
        existing_genres = {row[0] for row in cursor.fetchall()}

        for i in range(1, 472):  # Total number of pages available in TMDB for popular api fetching, 20 movies per page
            movies = fetch_movies(i)
            print('Fetching page:', i)
            if movies:
                insert_movies_and_genres(movies, genres, cursor, existing_genres)
                conn.commit()
                sleep(0.2)  # To avoid hitting API rate limits
            else:
                break

        cursor.close()
        conn.close()
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    main()
