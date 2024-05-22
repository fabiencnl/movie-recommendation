import React, { useEffect, useCallback, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchMovies, fetchGenres } from './fetchFunctions';
import { Movie } from './types';
import MovieCard from './MovieCard';
import './MoviesList.css'; // Import your CSS here

const MoviesList: React.FC = () => {
  const [sortBy, setSortBy] = useState('releaseDate');
  const [sortDirection, setSortDirection] = useState('DESC');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genres, setGenres] = useState<{ id: number, name: string }[]>([]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery(
    ['movies', sortBy, sortDirection, selectedGenres],
    ({ pageParam = 0 }) => fetchMovies({ pageParam, sortBy, sortDirection, selectedGenres: []}),
    {
      getNextPageParam: (lastPage) => lastPage.number + 1 < lastPage.totalPages ? lastPage.number + 1 : undefined,
    }
  );

  const movies: Movie[] = data ? data.pages.flatMap(page => page.content) : [];

  const handleScroll = useCallback(() => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 600; // Trigger prefetching 600px before reaching the bottom

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

  
  // useEffect(() => {
  //   refetch();
  // }, [filter, selectedGenre, refetch]);

  // useEffect(() => {
  //   fetchGenres();
  // }, []);

  // const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const [newSortBy, newSortDirection] = event.target.value.split(',');
  //   setSortBy(newSortBy);
  //   setSortDirection(newSortDirection);
  // };


  const handleFilterClick = (newSortBy: string) => {
    // Don't refetch if we click on the same fitler again
    if (newSortBy != sortBy) {
      setSortBy(newSortBy);
      refetch(); // This will trigger a refetch
    }
  };

  // const fetchGenres = async () => {
  //   try {
  //     const response = await axios.get('https://movie-recommendation-n2i7.onrender.com/api/genres');
  //     setGenres(response.data);
  //   } catch (error) {
  //     console.error('Error fetching genres:', error);
  //   }
  // };


  //if (!data) return <p>Loading...</p>;

  return (
    <div className="movies-list">
      <div className="filter-container">
        <button onClick={() => handleFilterClick('releaseDate')}>
          Newest Releases
        </button>
        <button onClick={() => handleFilterClick('popularity')}>
          Most Popular
        </button>
        <button onClick={() => handleFilterClick('voteAverage')}>
          Top Rated
        </button>
      </div>
      {/* <div className="genre-filter">
        <button className={selectedGenre === null ? 'active' : ''} onClick={() => setSelectedGenre(null)}>
          All Genres
        </button>
        {genres.map((genre: { id: number, name: string }) => (
          <button
            key={genre.id}
            className={selectedGenre === genre.id ? 'active' : ''}
            onClick={() => setSelectedGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div> */}
      <div className="movie-cards-container">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="load-more">
        {isFetchingNextPage ? (
          <button disabled>Loading more...</button>
        ) : (
          hasNextPage && <button onClick={() => fetchNextPage()}>Load More</button>
        )}
      </div>
    </div>
  );
};
export default MoviesList;
