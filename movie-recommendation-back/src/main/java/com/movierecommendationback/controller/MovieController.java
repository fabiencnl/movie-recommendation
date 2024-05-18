package com.movierecommendationback.controller;

import com.movierecommendationback.domain.Movie;
import com.movierecommendationback.service.MovieService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }


    // Endpoint to fetch all movies
    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies(@RequestParam(defaultValue = "0") int pageNumber,
                                                    @RequestParam(defaultValue = "30") int pageSize) {

        // Define a pageable request with sorting by average rating
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.DESC, "voteAverage"));

        Page<Movie> moviesPage = movieService.getAllMovies(pageable);
        List<Movie> movies = moviesPage.getContent();
        return ResponseEntity.ok(movies);
    }

    // Endpoint to fetch movie by ID
    @GetMapping("/{movieId}")
    public ResponseEntity<String> getMovieDetails(@PathVariable String movieId) {
        Optional<String> movieDetails = movieService.fetchMovieDetails(movieId);
        return movieDetails.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(500).body("Error fetching movie details"));
    }
}