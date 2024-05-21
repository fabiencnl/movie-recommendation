package com.movierecommendationback.controller;

import com.movierecommendationback.dto.MovieDTO;
import com.movierecommendationback.service.MovieService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    // Endpoint to fetch all movies
    @GetMapping
    public ResponseEntity<Page<MovieDTO>> getAllMovies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "releaseDate") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDirection) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sortDirection), sortBy));
        Page<MovieDTO> movies = movieService.getAllMovies(pageable);
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