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
    

  const addRestaurant = async (restaurant) => {
    try {
        const response = await fetch('http://localhost:3000/api/restaurantes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // El body de la petición es el restaurante que se quiere añadir
            body: JSON.stringify(restaurant)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Al modificar el restaurante, se vuelve a hacer la petición para obtener los restaurantes actualizados
        await getRestaurants();
    } catch (error) {
        console.error('Error adding restaurant:', error);
    }
};

const modifyRestaurant = async (restaurant) => {
    try {
        const response = await fetch(`http://localhost:3000/api/restaurantes/${restaurant.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(restaurant)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        await getRestaurants();
    } catch (error) {
        console.error('Error modifying restaurant:', error);
    }
};

const deleteRestaurant = async (restaurant) => {
    try {
        const response = await fetch(`http://localhost:3000/api/restaurantes/${restaurant.id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        await getRestaurants();
    } catch (error) {
        console.error('Error deleting restaurant:', error);
    }
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
