import React, { useState } from 'react';

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
}) => {
  const [showAll, setShowAll] = useState(false);

  const filteredRestaurants = restaurants
    .filter((restaurant) => restaurant.rating >= ratingFilter)
    .filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((restaurant) => {
      if (latitude && longitude && distance) {
        const [lat, lon] = restaurant.coordinates.split(', ').map(Number);
        return getDistance(lat, lon, latitude, longitude) <= distance;
      }
      return true;
    });

  const displayedRestaurants = showAll
    ? filteredRestaurants
    : filteredRestaurants.slice(0, 5);

  return (
    <div className="restaurant-list">
      {displayedRestaurants.map((restaurant) => (
        <div className="restaurant-item" key={restaurant.id}>
          <h3 className="restaurant-name">{restaurant.name}</h3>
          <p className="restaurant-info">
            Coordinates: {restaurant.coordinates}
          </p>
          <p className="restaurant-info">Postal Code: {restaurant.postalCode}</p>
          <p className="restaurant-info">Rating: {restaurant.rating}</p>
        </div>
      ))}
      {!showAll && filteredRestaurants.length > 5 && (
        <button
          className="show-more-button"
          onClick={() => setShowAll(true)}
        >
          Show More
        </button>
      )}
      {showAll && (
        <button
          className="show-less-button"
          onClick={() => setShowAll(false)}
        >
          Show Less
        </button>
      )}
    </div>
  );
};

export default RestaurantList;
