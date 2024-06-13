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
        print("API key is missing.")
        return {}

    url = f"https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key={api_key}"
    response = requests.get(url)

    if response.status_code == 200:
        genres = response.json().get('genres', [])
        return {genre['id']: genre['name'] for genre in genres}
    else:
        print(f"Failed to fetch genres: {response.status_code}")
        return {}


# Function to fetch movie data from the API
def fetch_movies(page_index, retries=3):
    api_key = os.environ.get('API_KEY')
    if not api_key:
        print("API key is missing.")
        return None

    url = f"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page={page_index}&api_key={api_key}"
    headers = {"accept": "application/json"}

    for attempt in range(retries):
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Failed to fetch movies page {page_index} (attempt {attempt + 1}): {response.status_code}")
            sleep(0.5)
    return None


# Function to insert movie and genre data into PostgreSQL database
def insert_movies_and_genres(all_movies, cursor):
    movie_data = []
    movie_genre_data = []

    for movie in all_movies:
        movie_id = movie['id']
        title = movie['title']
        release_date = movie.get('release_date', None)
        poster_path = movie.get('poster_path', None)
        vote_average = movie.get('vote_average', 0.0)
        popularity = movie.get('popularity', 0.0)

        if not release_date or not title:
            continue

        movie_data.append((movie_id, title, release_date, poster_path, vote_average, popularity))
        movie_genre_data.extend((movie_id, genre_id) for genre_id in movie.get('genre_ids', []))

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


# Function used to insert all genres (id/name association) in the table
def insert_genres(genres, cursor, conn):
    # Prepare the data for insertion
    genre_data = [(genre_id, genre_name) for genre_id, genre_name in genres.items()]

    # Insert genres
    if genre_data:
        insert_genre_query = sql.SQL("INSERT INTO genre (id, name) VALUES %s ON CONFLICT (id) DO NOTHING")
        extras.execute_values(cursor, insert_genre_query, genre_data)
        conn.commit()


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

        # Insert genres first
        insert_genres(genres, cursor, conn)

        all_movies = []
        batch_size = 500  # Movie batch size

        # Total number of pages available in TMDB for popular API fetching, 20 movies per page
        for i in range(1, 472):
            movies = fetch_movies(i)
            print(f'Fetching page: {i}')
            if movies:
                all_movies.extend(movies['results'])
                sleep(0.2)  # To avoid hitting API rate limits

                # Insert in batches to improve performance
                if len(all_movies) >= batch_size or i == 471:
                    print('Batch inserting movies')
                    insert_movies_and_genres(all_movies, cursor)
                    conn.commit()
                    all_movies.clear()
            else:
                break

        cursor.close()
        conn.close()
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    main()
