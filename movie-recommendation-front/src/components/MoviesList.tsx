import React, { useEffect, useCallback, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchMovies } from './fetchFunctions';
import { Movie } from './types';
import MovieCard from './MovieCard';

const MoviesList: React.FC = () => {
  const [sortBy, setSortBy] = useState('voteAverage');
  const [sortDirection, setSortDirection] = useState('DESC');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['movies', sortBy, sortDirection],
    ({ pageParam = 0 }) => fetchMovies({ pageParam, sortBy, sortDirection }),
    {
      getNextPageParam: (lastPage) => lastPage.number + 1 < lastPage.totalPages ? lastPage.number + 1 : undefined,
    }
  );

  const movies: Movie[] = data ? data.pages.flatMap(page => page.content) : [];

  const handleScroll = useCallback(() => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 500; // Trigger prefetching 500px before reaching the bottom

    if (scrollPosition >= threshold && hasNextPage && !isFetchingNextPage) {
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
    <div className="movies-list-container">
      <div className="filter-container">
        <h2>Latest Movies</h2>
        <select onChange={handleSortChange}>
          <option value="voteAverage,DESC">Highest Rating</option>
          <option value="popularity,DESC">Most Popular</option>
          <option value="releaseDate,DESC">Newest Releases</option>
        </select>
      </div>
      <div className="movies-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {isFetchingNextPage && <p>Loading more movies...</p>}
      </div>
    </div>
  );
};

export default MoviesList;
