package com.movierecommendationback.repository;

import com.movierecommendationback.domain.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    @Query("SELECT m FROM Movie m JOIN m.genres g WHERE g.name IN :genres")
    Page<Movie> findByGenres(@Param("genres") List<String> genres, Pageable pageable);

    @Query("SELECT m FROM Movie m")
    Page<Movie> findAllMovies(Pageable pageable);
}
