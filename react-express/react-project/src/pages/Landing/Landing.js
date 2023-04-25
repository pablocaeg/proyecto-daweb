import React from 'react';

import SearchBar from "../../components/SearchBar/SearchBar.js";
import RestaurantList from "../../components/RestaurantList/RestaurantList.js";

const Landing = () => {
  return (
    <>
      <SearchBar />
      <RestaurantList />
    </>
  );
};

export default Landing;