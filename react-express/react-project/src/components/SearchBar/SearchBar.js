import React from 'react';

import Filters from '../Filters/Filters.js';

const SearchBar = ({
  onRatingFilterChange,
  onSearchQueryChange,
  onLatitudeChange,
  onLongitudeChange,
  onDistanceChange,
}) => {
  return (
    <>
      <Filters
        onRatingFilterChange={onRatingFilterChange}
        onLatitudeChange={onLatitudeChange}
        onLongitudeChange={onLongitudeChange}
        onDistanceChange={onDistanceChange}
      />
      <div className="searchbar-container">
        <input
          className="search-input"
          type="search"
          placeholder="Search..."
          onChange={onSearchQueryChange}
        />
      </div>
    </>
  );
};

export default SearchBar;
