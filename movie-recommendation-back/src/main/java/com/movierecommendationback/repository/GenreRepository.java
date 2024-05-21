package com.movierecommendationback.repository;

import com.movierecommendationback.domain.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Integer> {
}

