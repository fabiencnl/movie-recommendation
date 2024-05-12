package com.movierentalback.service;

import com.movierentalback.domain.Movie;
import com.movierentalback.repo.MovieRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepo movieRepo;
    public Page<Movie> getAllMovies(int page, int size) {
        return movieRepo.findAll(PageRequest.of(page, size, Sort.by("name")));
    }
    public Movie getMovie(String id) {
        return movieRepo.findById(id).orElseThrow(() -> new RuntimeException("Movie not found"));
    }

    public Movie createMovie(Movie movie) {
        return movie.save(movie);
    }

    public void deleteMovie(Movie movie) {

    }

}
