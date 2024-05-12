package com.movierentalback.domain;


import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@Table(name= "movie")
public class Movie {
    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false)
    private String id;
    private String title;
    private String genre;
    private Integer releaseYear;
    private String director;
    private String[] actors;
    private Integer duration;
    private Integer rating;
    private String photoUrl;
    private Integer availableCopies;


    public Movie save(Movie movie) {
        return null;
    }
}
