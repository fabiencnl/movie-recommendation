export interface Genre {
  id: number;
  name: string;
}

export interface MovieGenre {
  genre: Genre;
}

export interface Movie {
    id: string;
    title: string;
    overview?: string;
    voteAverage: number;
    popularity?: number,
    actors?: string[];
    posterPath: string;
    backdropPath?: string;
    releaseDate: string;
    genreNames: string[]; // Optional because it will be added later
    duration?: string;
    genres: {id: number, name: string}[]// Updated to use genres directly
  }

  export interface MoviePage {
    content: Movie[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
  }
  