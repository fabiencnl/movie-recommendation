package com.movierecommendationback.repository;

import com.movierecommendationback.domain.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MovieRepository extends JpaRepository<Movie, UUID> {
}
