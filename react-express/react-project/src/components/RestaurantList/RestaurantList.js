import React, { useState, useEffect } from "react";

const toRadians = (degrees) => {
  return (degrees * Math.PI) / 180;
};

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const RestaurantList = ({
  restaurants,
  ratingFilter,
  searchQuery,
  latitude,
  longitude,
  distance,
  setSearchBarCount,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [ratingFilter, searchQuery, latitude, longitude, distance]);

  const filteredRestaurants = restaurants
    .filter((restaurant) => restaurant.rating >= ratingFilter)
    .filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((restaurant) => {
      if (latitude && longitude && distance) {
        const [lat, lon] = restaurant.coordinates.split(", ").map(Number);
        return getDistance(lat, lon, latitude, longitude) <= distance;
      }
      return true;
    });

  setSearchBarCount(filteredRestaurants.length);

  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);

  const displayedRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  return (
    <div className="restaurant-list">
      {displayedRestaurants.map((restaurant) => (
        <div className="restaurant-item" key={restaurant.id}>
          <h3 className="restaurant-name">{restaurant.name}</h3>
          <p className="restaurant-info">
            Coordinates: {restaurant.coordinates}
          </p>
          <p className="restaurant-info">
            Postal Code: {restaurant.postalCode}
          </p>
          <p className="restaurant-info">Rating: {restaurant.rating}</p>
        </div>
      ))}
      <div className="pagination-buttons">
        {currentPage > 1 && (
          <button
            className="pagination-button pagination-prev"
            onClick={() => changePage(-1)}
          >
            Anterior
          </button>
        )}
        {currentPage < totalPages && (
          <button
            className="pagination-button pagination-next"
            onClick={() => changePage(1)}
          >
            Siguiente
          </button>
        )}
        <div className="page-info">
          <h3>{currentPage}</h3>
          <span>/</span>
          <h3>{totalPages}</h3>
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
