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

    private String title;
    //private String genre; taper sur genre de l'api
    private String releaseDate;
    private String overview;
    //private Integer duration; taper sur details de l'api
    private float voteAverage;
    private String posterPath;

    @ManyToMany(mappedBy = "movies")
    private List<Actor> actors;
}
