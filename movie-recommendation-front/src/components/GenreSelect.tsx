import React from 'react';
import Select from 'react-select';

type Props = {
  genres: string[];
  selectedGenres: string[];
  handleGenreToggle: (selectedGenres: string[]) => void;
};

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: '#333',
    color: '#fff',
    borderColor: '#444',
    fontFamily: 'Poppins, sans-serif',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#333',
    color: '#fff',
    fontFamily: 'Poppins, sans-serif',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#555' : state.isFocused ? '#444' : '#333',
    color: '#fff',
    fontFamily: 'Poppins, sans-serif',
    '&:hover': {
      backgroundColor: '#444',
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: '#555',
    color: '#fff',
    fontFamily: 'Poppins, sans-serif',
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: '#fff',
    fontFamily: 'Poppins, sans-serif',
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: '#fff',
    fontFamily: 'Poppins, sans-serif',
    '&:hover': {
      backgroundColor: '#444',
      color: '#fff',
    },
  }),
  menuList: (provided: any) => ({
    ...provided,
    maxHeight: '150px',
    overflowY: 'auto',
    fontFamily: 'Poppins, sans-serif',
  }),
};

const GenreSelect: React.FC<Props> = ({ genres, selectedGenres, handleGenreToggle }) => {
  const handleSelectedGenresChange = (selectedOptions: any) => {
    const selectedGenresList = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    handleGenreToggle(selectedGenresList);
  };

  return (
    <div style={{ maxWidth: '100%', minWidth: '200px' }}>
      <Select
        styles={customStyles}
        options={genres.map(genre => ({ value: genre, label: genre }))}
        isMulti
        value={selectedGenres.map(genre => ({ value: genre, label: genre }))}
        onChange={handleSelectedGenresChange}
      />
    </div>
  );
};

export default GenreSelect;
