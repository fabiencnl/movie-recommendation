// src/genres.ts

export enum Genre {
  Action = 'Action',
  Adventure = 'Adventure',
  Animation = 'Animation',
  Comedy = 'Comedy',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Drama = 'Drama',
  Family = 'Family',
  Fantasy = 'Fantasy',
  History = 'History',
  Horror = 'Horror',
  Music = 'Music',
  Mystery = 'Mystery',
  Romance = 'Romance',
  ScienceFiction = 'Science Fiction',
  TVMovie = 'TV Movie',
  Thriller = 'Thriller',
  War = 'War',
  Western = 'Western',
}

export const genreNames: { [key: number]: string } = {
  28: Genre.Action,
  12: Genre.Adventure,
  16: Genre.Animation,
  35: Genre.Comedy,
  80: Genre.Crime,
  99: Genre.Documentary,
  18: Genre.Drama,
  10751: Genre.Family,
  14: Genre.Fantasy,
  36: Genre.History,
  27: Genre.Horror,
  10402: Genre.Music,
  9648: Genre.Mystery,
  10749: Genre.Romance,
  878: Genre.ScienceFiction,
  10770: Genre.TVMovie,
  53: Genre.Thriller,
  10752: Genre.War,
  37: Genre.Western,
};


export const getGenreNameById = (id: number): string | undefined => {
  return genreNames[id];
};
