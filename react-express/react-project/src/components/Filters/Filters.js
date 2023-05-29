import React, { useState } from "react";

const Filters = ({
  onCityChange,
  onRatingFilterChange,
  onLatitudeChange,
  onLongitudeChange,
  onDistanceChange,
}) => {
  const [ratingFilterVisible, setRatingFilterVisible] = useState(false);
  const [
    coordinatesDistanceFilterVisible,
    setCoordinatesDistanceFilterVisible,
  ] = useState(false);

  return (
    <div className="filters-container">
      <div className="filters-group">
        <button
          className="toggle-button"
          onClick={() => setRatingFilterVisible(!ratingFilterVisible)}
        >
          {ratingFilterVisible
            ? "Esconder filtros por valoración y ciudad"
            : "Mostrar filtros por valoración y ciudad"}
        </button>
        {ratingFilterVisible && (
          <div className="city-rating-container">
            <label className="filter-label">Ciudad</label>
            <input className="filter-rating" onChange={onCityChange}></input>
            <label className="filter-label">Valoración</label>
            <input
              className="filter-rating"
              type="number"
              min="1"
              max="5"
              step="0.1"
              placeholder="1-5"
              onChange={onRatingFilterChange}
            />{" "}
          </div>
        )}
      </div>
      <div className="filter-group">
        <button
          className="toggle-button "
          onClick={() =>
            setCoordinatesDistanceFilterVisible(
              !coordinatesDistanceFilterVisible
            )
          }
        >
          {coordinatesDistanceFilterVisible
            ? "Esconder filtro por ubicación"
            : "Mostrar filtro por ubicación"}
        </button>
        {coordinatesDistanceFilterVisible && (
          <div className="coordinates-kilometers-container">
            <div className="coordinates-container">
              <label className="filter-label">Latitud</label>
              <input
                className="filter-coordinates"
                type="number"
                min="-90"
                max="90"
                step="0.000001"
                placeholder="Latitud"
                onChange={onLatitudeChange}
              />
              <label className="filter-label">Longitud</label>
              <input
                className="filter-coordinates"
                type="number"
                min="-180"
                max="180"
                step="0.000001"
                placeholder="Longitud"
                onChange={onLongitudeChange}
              />{" "}
            </div>
            <div className="kilometers-container">
              <label className="filter-label">Distancia</label>
              <input
                className="filter-kilometers"
                type="number"
                min="0"
                placeholder="km"
                onChange={onDistanceChange}
              />{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
