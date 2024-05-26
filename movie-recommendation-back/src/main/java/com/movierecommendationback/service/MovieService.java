package com.movierecommendationback.service;

import com.movierecommendationback.domain.Genre;
import com.movierecommendationback.domain.Movie;
import com.movierecommendationback.repository.MovieRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import com.movierecommendationback.dto.MovieDTO;


import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;

    @Value("${API_TOKEN}")
    private String tmdbApiKey;

    @Value("${TMDB_GET_MOVIE_INFO_URL}")
    private String tmdbApiUrl;

    private final HttpClient httpClient;

    @Transactional
    public Page<MovieDTO> getMoviesByGenreAndSort(
            List<String> genres, int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(
                        Sort.Order.desc(sortBy),
                        Sort.Order.asc("id")
                )
        );

        if (genres.isEmpty()) {
            return movieRepository.findAllMovies(pageable).map(this::convertToDto);
        } else {
            return movieRepository.findByGenres(genres, pageable).map(this::convertToDto);
        }
    }

    private MovieDTO convertToDto(Movie movie) {
        Set<String> genreNames = movie.getGenres().stream()
                .map(Genre::getName)
                .collect(Collectors.toSet());
        return new MovieDTO(movie.getId(), movie.getTitle(), movie.getPopularity(), movie.getPosterPath(), movie.getReleaseDate(), movie.getVoteAverage(), genreNames);
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
