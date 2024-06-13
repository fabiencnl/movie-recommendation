# Movies Recommendation App
## ⚠️ Attention
This project is a work in progress. Still have quite a lot of work to do:
- authentication, with Spring Security
- Movie page design and display
- Might do a list of favorites and then add a "recommendations" category based on those favorites

Key challenges in this project include integrating with a movie API to fetch real-time data, storing it in database, designing an intuitive and visually appealing user interface, implementing navigation between different pages efficiently, managing state and data flow within the React components.

A full stack movies recommendation application using React and Spring Boot.

![Screenshot](./docs/hub.png)

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication and authorization
- Personalized movie recommendations
- Movie search functionality
- User reviews and ratings

## Technologies Used
### Frontend
- React 18.3.1
- Typescript 4.9.5
- Node 22.1.0
- 
### Backend
- Java 21
- Spring boot 3.2.5
- Lombok, Hibernate
- Python 3.12.3
- PostgreSQL 16.3.1
- Docker
- Cron-job to ping the app every 10 minutes (probably not working, app still sleeps after inactivity)
- Deployed on render

## Getting Started
### Prerequisites
- Node.js
- Java
- PostgreSQL

### Installation
1. Clone the repo
   ```bash
   git clone https://github.com/fabiencnl/movies-recommendation-app.git

2. Steps
   - Get API key for free on TMDB account
   - Create PSQL localhost database
   - Create env.properties file in backend, required variables are API_KEY, API_TOKEN, TMDB_GET_MOVIE_INFO_URL (https://api.themoviedb.org/3/movie/)
DB_NAME, DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD
   - npm start for front, run backend application
