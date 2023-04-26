import React from 'react';

import SearchBar from "../../components/SearchBar/SearchBar.js";
import RestaurantList from "../../components/RestaurantList/RestaurantList.js";
import restaurantsData from "../../data/restaurants.json";

const Landing = () => {
  return (
    <>
      <SearchBar />
      <RestaurantList restaurants={restaurantsData} />
    </>
  );
};

export default Landing;