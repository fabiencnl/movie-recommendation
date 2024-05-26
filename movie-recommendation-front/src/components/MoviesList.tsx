import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchMovies, fetchGenres } from './fetchFunctions';
import { Movie } from './types';
import MovieCard from './MovieCard';
import './MoviesList.css'; // Import your CSS here
import FilterButton from './FilterButton';
import Select from 'react-select';
import GenreSelect from './GenreSelect'; // Adjust the import path as necessary

type Props = {
  genres: string[];
  selectedGenres: string[];
  handleGenreToggle: (selectedGenres: string[]) => void;
};

const MoviesList: React.FC = () => {
  const sizeParam = 20;
  const [sortBy, setSortBy] = useState('releaseDate');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const filterContainerRef = useRef<HTMLDivElement>(null);
  const movieCardsContainerRef = useRef<HTMLDivElement>(null);
  //const [activeFilter, setActiveFilter] = useState<string>('');
  const [queryKey, setQueryKey] = useState(['movies']);
  const refetchRef = useRef<() => void>(() => {});
  const [genres, setGenres] = useState<string[]>([]);

// Define the type for the query parameters
interface QueryParams {
  sortBy: string;
  selectedGenres: string[];
}

  const filters = [
    { label: 'Adventure', value: 'Adventure' },
    { label: 'horror', value: 'horror' },
    { label: 'anime', value: 'anime' },
    {label:'Western', value:'Western'}
  ];

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

  const movies: Movie[] = data ? data.pages.flatMap(page => page.content) : [];

  const handleScroll = useCallback(() => {
    console.log('HANDLE SCROLL')
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 700; // Trigger prefetching 700px before reaching the bottom

    if (scrollPosition >= threshold && hasNextPage && !isFetchingNextPage) {
      console.log('va falllirlf etchayyy')

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
    console.log('handle fitler click')
    // Don't refetch if we click on the same filter again
    if (newSortBy != sortBy) {
      //window.scrollTo({ top: 0, behavior: 'smooth' });
      //event.preventDefault()
      //if (!movieCardsContainerRef.current) return;
      //movieCardsContainerRef.current.classList.add('test');
      //window.scrollTo(0, 0);

     // window.scrollTo(0, 0);
     console.log('new sort value: ', newSortBy)
      setSortBy(newSortBy);
      // resetAndRefetch();
      //movieCardsContainerRef.current.classList.remove('test');
    }
  };

  const resetAndRefetch = () => {
    console.log('prout')
    // Clear the existing data and reset the state
    remove();
    console.log('REFEeTch ///')
    refetch();
  };

  useEffect(() => {
    resetAndRefetch();
  }, [selectedGenres, sortBy]);

  // const handleGenreToggle2 = (genre: string) => {
  //   console.log(' HANDLE GENRE TOGGLE KEK')
  //   console.log('genre: ', genre)

  //   let updatedSlectedGenres = [];

  //   if (selectedGenres.includes(genre)) {
  //     // If the genre is included, remove it
  //     updatedSlectedGenres = selectedGenres.filter((g) => g !== genre);
  //   } else {
  //     // If the genre is not included, add it
  //     updatedSlectedGenres = [...selectedGenres, genre];
  //   }
  //   setSelectedGenres(updatedSlectedGenres)

  //   console.log('selected genres : ', updatedSlectedGenres);
  // };


  const handleGenreToggle = (selectedGenres: string[]) => {
    setSelectedGenres(selectedGenres);
  };

  // const handleSelectedGenresChange = (selectedOptions: any) => {
  //   const selectedGenresList = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
  //   handleGenreToggle(selectedGenresList);
  // };
  
  return (
    <div className="movies-list">
      {/* Filter section */}
      <div className="filter-container" ref={filterContainerRef}>
        <button className='filter-button' onClick={() => handleFilterClick('releaseDate')}>
          Newest Releases
        </button>
        <button className='filter-button' onClick={() => handleFilterClick('popularity')}>
          Most Popular
        </button>
        <button className='filter-button' onClick={() => handleFilterClick('voteAverage')}>
          Top Rated
        </button>
        
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
