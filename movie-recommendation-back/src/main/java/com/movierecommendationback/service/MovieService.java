package com.movierecommendationback.service;

import com.movierecommendationback.domain.Genre;
import com.movierecommendationback.domain.Movie;
import com.movierecommendationback.dto.MovieDTO;
import com.movierecommendationback.repository.MovieRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;

    @Value("${API_TOKEN}")
    private String tmdbApiKey;

    @Value("${TMDB_GET_MOVIE_INFO_URL}")
    private String tmdbApiUrl;

    private final HttpClient httpClient;

    // Method to fetch paginated list of movies
    @Transactional
    public Page<MovieDTO> getAllMovies(Pageable pageable) {
        Page<Movie> movies = movieRepository.findAll(pageable);
        return movies.map(movie -> {
            Hibernate.initialize(movie.getGenres());
            return new MovieDTO(
                    movie.getId(),
                    movie.getTitle(),
                    movie.getReleaseDate(),
                    movie.getPosterPath(),
                    movie.getVoteAverage(),
                    movie.getPopularity(),
                    movie.getGenres().stream().map(Genre::getName).collect(Collectors.toList())
            );
        });
    }


    public Optional<String> fetchMovieDetails(String movieId) {
        try {
            String uri = tmdbApiUrl + movieId + "?language=en-US";

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(uri))
                    .header("accept", "application/json")
                    .header("Authorization", "Bearer " + tmdbApiKey)
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                return Optional.of(response.body());
            } else {
                System.out.println("Error fetching movie details: " + response.statusCode());
                return Optional.empty();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

}
