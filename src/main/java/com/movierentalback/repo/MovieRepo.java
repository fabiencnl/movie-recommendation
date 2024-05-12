package com.movierentalback.repo;

import com.movierentalback.domain.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MovieRepo extends JpaRepository<Movie, String> {
    default Optional<Movie> findById(String id) {
        return null;
    }
}
