package com.movierecommendationback.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
public class MovieDTO {
    private final Integer id;
    private String title;
    private float popularity;
    private String posterPath;
    private String releaseDate;
    private float voteAverage;
    private Set<String> genres;
}

