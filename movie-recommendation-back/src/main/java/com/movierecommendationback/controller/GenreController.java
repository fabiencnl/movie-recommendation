package com.movierecommendationback.controller;

import com.movierecommendationback.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
public class GenreController {

    @Autowired
    private GenreService genreService;

    @GetMapping("/names")
    public List<String> getAllGenreNames() {
        return genreService.getAllGenreNames();
    }
}
