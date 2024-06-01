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
    genreNames?: string[],// Updated to use genres directly
    genres?:{id: Number, name: string}[]
  }

  export interface MovieLight {
    id: string;
    title: string;
    voteAverage: number;
    popularity: number
    genres: string[]
    posterPath: string;
    releaseDate: string;
  }

  export interface MoviePage {
    content: MovieLight[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
  }
  export interface FetchMoviesParams {
    pageParam?: number;
    sizeParam?: number;
    sortBy?: string;
    selectedGenres?: string[];
  }

  export const sortByFilters = [
  { value: 'releaseDate', label: 'Newest Releases' },
  { value: 'voteAverage', label: 'Top Rated' },
  { value: 'popularity', label: 'Most Popular' }
];