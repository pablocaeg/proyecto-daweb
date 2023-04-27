import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Contact from './pages/Contact/Contact.js';
import Landing from './pages/Landing/Landing.js';
import Restaurante from './pages/Restaurante/Restaurante.js';

const App = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Landing restaurants={restaurants} />} />
          <Route path="/restaurante/*" element={<Restaurante />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
