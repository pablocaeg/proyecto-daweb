import React from 'react';

const RestaurantList = ({ restaurants }) => {
  return (
    <div className="restaurant-list">
      {restaurants.map((restaurant) => (
        <div className="restaurant-item" key={restaurant.id}>
          <h3 className="restaurant-name">{restaurant.name}</h3>
          <p className="restaurant-info">Coordinates: {restaurant.coordinates}</p>
          <p className="restaurant-info">Postal Code: {restaurant.postalCode}</p>
          <p className="restaurant-info">Rating: {restaurant.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
