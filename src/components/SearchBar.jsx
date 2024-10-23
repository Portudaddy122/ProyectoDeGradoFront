import React from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange, onSearch }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        className='search-bar-input'
        value={value}
        onChange={onChange}
        placeholder='Buscar...'
      />
      <button className='search-bar-button' onClick={onSearch}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
