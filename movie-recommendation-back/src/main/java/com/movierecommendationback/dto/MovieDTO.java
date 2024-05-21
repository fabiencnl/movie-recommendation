
package com.movierecommendationback.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MovieDTO {

    private Integer id;
    private String title;
    private String releaseDate;
    private String posterPath;
    private float voteAverage;
    private float popularity;
    private List<String> genreNames;
}
