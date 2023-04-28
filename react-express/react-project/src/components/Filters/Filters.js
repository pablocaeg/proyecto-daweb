import React from 'react';

const Filters = ({
  onRatingFilterChange,
  onLatitudeChange,
  onLongitudeChange,
  onDistanceChange,
}) => {
  return (
    <div className="filters-container">
      <div className="city-rating-container">
        <select className="filter-city">
          <option value="">Select City</option>
          <option value="murcia">Murcia</option>
          <option value="madrid">Madrid</option>
          <option value="madrid">Torreagüera</option>
        </select>
        <input
          className="filter-rating"
          type="number"
          min="1"
          max="5"
          step="0.1"
          placeholder="Rating (1-5)"
          onChange={onRatingFilterChange}
        />
      </div>
      <div className="coordinates-kilometers-container">
        <div className="coordinates-container">
          <input
            className="filter-coordinates"
            type="number"
            min="-90"
            max="90"
            step="0.000001"
            placeholder="Latitude"
            onChange={onLatitudeChange}
          />
          <input
            className="filter-coordinates"
            type="number"
            min="-180"
            max="180"
            step="0.000001"
            placeholder="Longitude"
            onChange={onLongitudeChange}
          />
        </div>
        <div className="kilometers-container">
          <input
            className="filter-kilometers"
            type="number"
            min="0"
            placeholder="Distance (km)"
            onChange={onDistanceChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;