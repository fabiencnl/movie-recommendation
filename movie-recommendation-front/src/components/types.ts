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
    duration?: string;
    genreNames: string[],// Updated to use genres directly
    genres?:{id: Number, name: string}[]
  }

  export interface MoviePage {
    content: Movie[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
  }
  