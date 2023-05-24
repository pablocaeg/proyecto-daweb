import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Contact from './pages/Contact/Contact.js';
import Landing from './pages/Landing/Landing.js';
import Restaurante from './pages/Restaurante/Restaurante.js';

const App = () => {
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurants = async () => {
    try {
      const response = await fetch('./data/restaurants.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants data:', error);
    }
  };

  const addRestaurant = async (restaurant) => {
    // your fetch code for POST method to add the restaurant
    // After adding the restaurant, call getRestaurants to update the state
    await getRestaurants();
  };

  const modifyRestaurant = async (restaurant) => {
    // your fetch code for POST method to add the restaurant
    // After adding the restaurant, call getRestaurants to update the state
    await getRestaurants();
  };

  const deleteRestaurant = async (restaurant) => {
    // your fetch code for POST method to add the restaurant
    // After adding the restaurant, call getRestaurants to update the state
    await getRestaurants();
  };

  
  const addPlato = async (restaurant) => {
    // your fetch code for POST method to add the restaurant
    // After adding the restaurant, call getRestaurants to update the state
    await getRestaurants();
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <>
      <Header addRestaurant={addRestaurant}/>
      <main>
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Landing addPlato={addPlato} modifyRestaurant={modifyRestaurant} deleteRestaurant={deleteRestaurant} restaurants={restaurants} />} />
          <Route path="/restaurante/:id" element={<Restaurante restaurants={restaurants} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
