import requests
import psycopg2
from psycopg2 import sql
import random
import string


# Function to generate a random id for a given movie
def generate_random_string(length):
    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for _ in range(length))


# Function to generate a random copy count for a movie
def generate_random_copy_count():
    return random.randint(0, 20)


# Function to fetch movie data from the API
def fetch_movies\
                (page_index):
    try:
        # API endpoint URL
        url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=" + str(page_index)

        headers = {
            "accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTQzNGQwZDcyNTBkNDk1MTkxZWI4MGRkMDA1NzMxMyIsInN1YiI6IjY2NDIzMDQ4N2FhOTY0MjkxM2MxOWZjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkJ7l-6G2jhcaa8sil47doMkVVWdMfmWOigvM-Spals"
        }
        # Send GET request to fetch movie data
        response = requests.get(url, headers=headers)
        # After sending the GET request
        print("API Response:", response.text)

        # Check if request was successful
        if response.status_code == 200:
            return response.json()
        else:
            print("Failed to fetch movie data from API")
            return None
    except Exception as e:
        print("Error fetching movie data:", e)
        return None


# Function to insert movie data into PostgreSQL database
def insert_movies(movies):

    try:
        # Connect to PostgreSQL database
        conn = psycopg2.connect(
            dbname="movie-rental-back",
            user="postgres",
            password="pingu1999",
            host="localhost"
        )

        # Create a cursor object
        cursor = conn.cursor()

        # Iterate through each movie and insert into database
        for movie in movies['results']:

            # Generate random id
            random_id = generate_random_string(10)  # Generate a random string of length 10

            # Generate random available_copies count
            available_copies = generate_random_copy_count()

            # Construct SQL query to insert movie
            insert_query = sql.SQL("INSERT INTO movie (id, title, overview, release_date, poster_path, vote_average, "
                                   "available_copies)"
                                   " VALUES (%s, %s, %s, %s, %s, %s, %s)")
            cursor.execute(insert_query, (random_id, movie['title'], movie['overview'], movie['release_date'],
                                          movie['poster_path'], movie['vote_average'], available_copies))

        # Commit the transaction
        conn.commit()
        print("Movie data inserted successfully")

        # Close database connection
        cursor.close()
        conn.close()
    except Exception as e:
        print("Error inserting movie data into database:", e)

    # Main function to fetch and insert movie data


def main():
    # Fetch 300 pages of movie data from the API
    i = 1
    while i < 301:
        movies = fetch_movies(i)

        # If movie data is retrieved successfully, insert into database
        if movies:
            insert_movies(movies)
            i += 1
        else:
            print("No movie data fetched")


if __name__ == "__main__":
    main()
