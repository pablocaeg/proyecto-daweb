import React, { useState } from "react";

import SearchBar from "../../components/SearchBar/SearchBar.js";
import RestaurantList from "../../components/RestaurantList/RestaurantList.js";

const Landing = ({ getSitiosProximos, loadingSitiosProximos, getRestaurant, restaurants, modifyRestaurant, deleteRestaurant, addPlato }) => {
  const [ratingFilter, setRatingFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [distance, setDistance] = useState("");
  const [city, setCity] = useState("");
  const [searchBarCount, setSearchBarCount] = useState(0);

  const handleRatingFilterChange = (e) => {
    setRatingFilter(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <>
      <SearchBar
        onRatingFilterChange={handleRatingFilterChange}
        onSearchQueryChange={handleSearchQueryChange}
        onLatitudeChange={handleLatitudeChange}
        onLongitudeChange={handleLongitudeChange}
        onDistanceChange={handleDistanceChange}
        onCityChange={handleCityChange}
        count={searchBarCount}
        searchQuery={searchQuery}
      />
      <RestaurantList
        getSitiosProximos={getSitiosProximos}
        loadingSitiosProximos={loadingSitiosProximos}
        modifyRestaurant={modifyRestaurant} 
        deleteRestaurant={deleteRestaurant}
        restaurants={restaurants}
        ratingFilter={ratingFilter}
        searchQuery={searchQuery}
        latitude={latitude}
        longitude={longitude}
        city={city}
        distance={distance}
        setSearchBarCount={setSearchBarCount}
        addPlato = {addPlato}
        getRestaurant = {getRestaurant}
      />
    </>
  );
};

export default Landing;
