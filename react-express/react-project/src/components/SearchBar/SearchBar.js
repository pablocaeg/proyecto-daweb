import React from 'react';

import Filters from "../Filters/Filters.js"

const SearchBar = () => {
  return (
    <>
    <Filters/>
    <div className="searchbar-container">
      <input
        className="search-input"
        type="search"
        placeholder="Search..."
      />
      <button className="search-button">Buscar restaurante</button>
    </div>
    </>
  );
};

export default SearchBar;