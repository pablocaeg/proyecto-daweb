import React from 'react';

import Filters from '../Filters/Filters.js';

const SearchBar = ({
  onRatingFilterChange,
  onSearchQueryChange,
  onLatitudeChange,
  onLongitudeChange,
  onDistanceChange,
  count,
  searchQuery
}) => {
  return (
    <>
      <div className="searchbar-container">
        <input
          className="search-input"
          type="search"
          placeholder="Buscar restaurante..."
          onChange={onSearchQueryChange}
        />
      </div>
      <div className="search-results-info">
        {searchQuery
          ? `${count} restaurantes que contienen "${searchQuery}" están siendo mostrados`
          : `${count} restaurantes están siendo mostrados`}
      </div>
      <Filters
        onRatingFilterChange={onRatingFilterChange}
        onLatitudeChange={onLatitudeChange}
        onLongitudeChange={onLongitudeChange}
        onDistanceChange={onDistanceChange}
      />

    </>
  );
};

export default SearchBar;
