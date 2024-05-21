import React, { useEffect, useCallback, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { fetchMovies } from './fetchFunctions';
import { Movie, MoviePage } from './types';

const MoviesList: React.FC = () => {
  const [sortBy, setSortBy] = useState('voteAverage');
  const [sortDirection, setSortDirection] = useState('DESC');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<MoviePage>(
    ['movies', sortBy, sortDirection],
    ({ pageParam = 0 }) => fetchMovies({ pageParam, sortBy, sortDirection }),
    {
      getNextPageParam: (lastPage) => lastPage.number + 1 < lastPage.totalPages ? lastPage.number + 1 : undefined,
    }
  );

  const movies: Movie[] = data ? data.pages.flatMap(page => page.content) : [];

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortBy, newSortDirection] = event.target.value.split(',');
    setSortBy(newSortBy);
    setSortDirection(newSortDirection);
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="movies-list">
      <h2>Latest Movies</h2>
      <select onChange={handleSortChange}>
        <option value="voteAverage,DESC">Highest Rating</option>
        <option value="popularity,DESC">Most Popular</option>
        <option value="releaseDate,DESC">Newest Releases</option>
      </select>
      {movies.map((movie) => (
        <div key={movie.id}>
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          <p>Genres: {movie.genreNames.map(mg => mg).join(', ')}</p>
        </div>
      ))}
      {isFetchingNextPage && <p>Loading more movies...</p>}
    </div>
  );
};

export default MoviesList;
