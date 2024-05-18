package com.movierecommendationback.service;

import com.movierecommendationback.domain.Movie;
import com.movierecommendationback.repository.MovieRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;

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
    public Page<Movie> getAllMovies(Pageable pageable) {
        return movieRepository.findAll(pageable);
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
