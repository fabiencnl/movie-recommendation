import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchMovies, fetchGenres } from './fetchFunctions';
import { Movie } from './types';
import MovieCard from './MovieCard';
import './MoviesList.css'; // Import your CSS here

const MoviesList: React.FC = () => {
  const [sortBy, setSortBy] = useState('releaseDate');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genres, setGenres] = useState<{ id: number, name: string }[]>([]);
  const filterContainerRef = useRef<HTMLDivElement>(null);
  const movieCardsContainerRef = useRef<HTMLDivElement>(null);


  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    remove
  } = useInfiniteQuery(
    ['movies', sortBy, selectedGenres],
    ({ pageParam = 0 }) => fetchMovies({ pageParam, sortBy, selectedGenres: []}),
    {
      getNextPageParam: (lastPage) => lastPage.number + 1 < lastPage.totalPages ? lastPage.number + 1 : undefined,
    }
  );

  const movies: Movie[] = data ? data.pages.flatMap(page => page.content) : [];

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

  
  // useEffect(() => {
  //   refetch();
  // }, [filter, selectedGenre, refetch]);

  // useEffect(() => {
  //   fetchGenres();
  // }, []);


  const handleFilterClick = (newSortBy: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Don't refetch if we click on the same filter again
    if (newSortBy != sortBy) {
      //window.scrollTo({ top: 0, behavior: 'smooth' });
      //event.preventDefault()
      //if (!movieCardsContainerRef.current) return;
      //movieCardsContainerRef.current.classList.add('test');
      //window.scrollTo(0, 0);

     // window.scrollTo(0, 0);
      setSortBy(newSortBy);
      resetAndRefetch();
      //movieCardsContainerRef.current.classList.remove('test');
    }
  };
  const resetAndRefetch = () => {
    // Clear the existing data and reset the state
    remove();
    refetch();
  };

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.includes(genre)
        ? prevSelectedGenres.filter((g) => g !== genre)
        : [...prevSelectedGenres, genre]
    );
    refetch();
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
      <div className="filter-container" ref={filterContainerRef}>
        <button className ='filter-button' onClick={(event) => handleFilterClick('releaseDate', event)}>
          Newest Releases
        </button>
        <button className ='filter-button' onClick={(event) => handleFilterClick('popularity', event)}>
          Most Popular
        </button>
        <button className ='filter-button' onClick={(event) => handleFilterClick('voteAverage', event)}>
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
      <div className="movie-cards-container" ref={movieCardsContainerRef}>
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
