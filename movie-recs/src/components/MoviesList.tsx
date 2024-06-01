import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchMovies, fetchGenres } from './fetchFunctions';
import { MovieLight, sortByFilters } from './types';
import MovieCard from './MovieCard';
import FilterButton from './FilterButton';
import GenreSelect from './GenreSelect'; // Adjust the import path as necessary
import './MoviesList.css'; 

const MoviesList: React.FC = () => {
  const [sortBy, setSortBy] = useState('releaseDate');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  const queryKey = useState(['movies']);
  const filterContainerRef = useRef<HTMLDivElement>(null);
  const movieCardsContainerRef = useRef<HTMLDivElement>(null);
  const sizeParam = 20; // Amount of movies displayed per page

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    remove
  } = useInfiniteQuery(
    queryKey,
    ({ pageParam = 0 }) => fetchMovies({ pageParam, sizeParam, sortBy, selectedGenres }),
    {
      getNextPageParam: (lastPage) => lastPage.number + 1 < lastPage.totalPages ? lastPage.number + 1 : undefined,
      refetchOnWindowFocus: false, // Prevent refetching on window focus
    }
  );
  
  useEffect(() => {
    const getGenres = async () => {
      const response = await fetchGenres();
      setGenres(response);
    };

    getGenres();
  }, []); // Empty dependency array ensures this effect runs once on mount

  const movies: MovieLight[] = data ? data.pages.flatMap(page => page.content) : [];

  const handleScroll = useCallback(() => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 700; // Trigger prefetching 700px before reaching the bottom

    if (scrollPosition >= threshold && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }

    // Make the filtering container follow through when scrolling down
    if (!filterContainerRef.current) return;
    const offset = window.scrollY;
    const containerTop = filterContainerRef.current.getBoundingClientRect().top;
    const offsetThreshold = 250; // Adjust this value to control when the fixed class is added
    const buffer = 50; // Buffer value to prevent class toggling around the threshold
    
    if (offset > containerTop + offsetThreshold + buffer) {
      filterContainerRef.current.classList.add('fixed');
    } else if (offset < containerTop + offsetThreshold - buffer) {
      filterContainerRef.current.classList.remove('fixed');
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);


  const handleFilterClick = (newSortBy: string) => {
    // Don't refetch if we click on the same filter again
    if (newSortBy !== sortBy) {
      setSortBy(newSortBy);
    }
  };


  const resetAndRefetch = useCallback(() => {
    // Clear the existing data and reset the state
    remove();  // Assuming remove is defined elsewhere
    refetch(); // Assuming refetch is defined elsewhere
    console.log('pipi')
  }, [remove, refetch]); // Dependencies for the useCallback

  useEffect(() => {
    console.log('caca')
    resetAndRefetch();
  }, [selectedGenres, sortBy, resetAndRefetch]);

  const handleGenreToggle = (selectedGenres: string[]) => {
    setSelectedGenres(selectedGenres);
  }
  
  return (
    <div className="movies-list">
      {/* Filter section */}
      <div className="filter-container" ref={filterContainerRef}>
      {sortByFilters.map((filter) => (
        <FilterButton
          key={filter.value}
          label={filter.label}
          isActive={sortBy === filter.value}
          onClick={() => {
            handleFilterClick(filter.value);
          }}
        />
      ))}
        
        <div className='genre-select-container'>
          <GenreSelect
          genres={genres}
          selectedGenres={selectedGenres}
          handleGenreToggle={handleGenreToggle}
        />
        </div>
      </div>
  
      {/* Movies section */}
      <div className="movie-cards-container" ref={movieCardsContainerRef}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
export default MoviesList;
