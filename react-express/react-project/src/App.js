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
    const getRestaurantes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/restaurantes');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('Data received from server:', data);
        setRestaurants(data.restaurante);
      } catch (error) {
        console.error('Error fetching restaurants data:', error);
      }
    };
    

    getRestaurantes();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Landing restaurants={restaurants} />} />
          <Route path="/restaurante/:id" element={<Restaurante restaurants={restaurants} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
