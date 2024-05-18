package com.movierecommendationback.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@Table(name = "movie")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", unique = true, nullable = false, updatable = false)
    private UUID id;
    private String movieId; // Usef to fetch movie specific information
    private String title; // Displayed on movie card
    private float voteAverage; // Rating will be displayed on each movie card
    private String[] genreIds; // Used for genre filtering
    private String releaseDate; // Used for latest movies or year filter
    private String posterPath; // Displayed on each movie card
    private float popularity; //Used for popular filter

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MovieActor> movieActors;
}
