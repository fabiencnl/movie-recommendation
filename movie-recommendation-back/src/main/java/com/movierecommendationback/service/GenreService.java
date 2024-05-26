package com.movierecommendationback.service;

import com.movierecommendationback.domain.Genre;
import com.movierecommendationback.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GenreService {

    @Autowired
    private GenreRepository genreRepository;

    public List<String> getAllGenreNames() {
        return genreRepository.findAll().stream()
                .map(Genre::getName)
                .collect(Collectors.toList());
    }
}
