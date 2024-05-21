package com.movierecommendationback.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@Table(name = "movie")
public class Movie {
    @Id
    @Column(name = "id", unique = true, nullable = false, updatable = false)
    private Integer id; // Use TMDB movie ID
    private String movieId; // Used to fetch movie specific information
    private String title; // Displayed on movie card
    private float voteAverage; // Rating will be displayed on each movie card
    private String releaseDate; // Used for latest movies or year filter
    private String posterPath; // Displayed on each movie card
    private float popularity; //Used for popular filter

    @ManyToMany
    @JoinTable(
            name = "movie_genre",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )

    private List<Genre> genres = new ArrayList<>();
}
