package com.movierecommendationback.controller;

import com.movierecommendationback.domain.Genre;
import com.movierecommendationback.domain.Movie;
import com.movierecommendationback.dto.MovieDTO;
import com.movierecommendationback.service.MovieService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    // Endpoint to fetch all movies, with additional layers of filtering and sorting
    @GetMapping
    public ResponseEntity<Page<MovieDTO>> getMovies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "releaseDate") String sortBy,
            @RequestParam(required = false) List<String> genres
    ) {
        if (genres == null) {
            genres = Collections.emptyList();
        }
        System.out.println(genres.size());
        Page<MovieDTO> movies = movieService.getMoviesByGenreAndSort(genres, page, size, sortBy);
        return ResponseEntity.ok(movies).hasBody() ? ResponseEntity.ok(movies) : ResponseEntity.status(500).build();
    }

    // Endpoint to fetch movie by ID
    @GetMapping("/{movieId}")
    public ResponseEntity<String> getMovieDetails(@PathVariable String movieId) {
        Optional<String> movieDetails = movieService.fetchMovieDetails(movieId);
        return movieDetails.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(500).body("Error fetching movie details"));
    }
}