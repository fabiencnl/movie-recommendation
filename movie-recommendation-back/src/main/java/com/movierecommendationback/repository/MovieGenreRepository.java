package com.movierecommendationback.repository;

import com.movierecommendationback.domain.MovieGenre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieGenreRepository extends JpaRepository<MovieGenre, Integer> {
    List<MovieGenre> findByMovieId(Integer id);
}

