package com.movierecommendationback.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@Table(name = "genre")
public class Genre {
    @Id
    @Column(name = "id", unique = true, nullable = false, updatable = false)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String name;
}
