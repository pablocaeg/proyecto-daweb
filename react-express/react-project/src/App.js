import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Contact from './pages/Contact/Contact.js';
import Landing from './pages/Landing/Landing.js';
import Restaurante from './pages/Restaurante/Restaurante.js';

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(false);

  function getCookie(name) {
    // Inicialmente, se toma la cadena de cookies completa de document.cookie y se le añade un ; al principio.
    // Esto se hace para que podamos buscar de manera consistente el nombre de la cookie precedido por un ; 
    // garantizando así que no encontraremos nombres de cookies que sean parte de los valores de otras cookies.
    const value = `; ${document.cookie}`;
  
    // A continuación, dividimos la cadena de cookies en el nombre de la cookie que estamos buscando.
    // Si la cookie existe, terminaremos con una matriz de dos partes: todo antes de la cookie que estamos buscando
    // y todo después de ella.
    const parts = value.split(`; ${name}=`);
  
    // Si tenemos dos partes, entonces la cookie fue encontrada. En este caso, queremos devolver el valor de la cookie.
    if (parts.length === 2) {
      // Tomamos la segunda parte (todo después de la cookie que estamos buscando) y la dividimos por ; 
      // Esto nos da una matriz de todo después de la cookie que estamos buscando, dividida en diferentes cookies.
      // Como la cookie que estamos buscando es la primera en esta matriz, usamos shift() para obtenerla y devolverla.
      return parts.pop().split(';').shift();
    }
  }
  

  const getRestaurants = async () => {
    try {
      const jwt = getCookie('jwt');
      console.log('Cookie jwt: ', jwt);
      if(!jwt) {
        window.location.href = 'http://localhost:8090/restaurantes';
      }else{
        const response = await fetch('http://localhost:8090/restaurantes');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }       
        console.log('Response: ', response.data);
        const data = await response.json();
          console.log('Data received from server:', data.restaurante);
        setRestaurants(data.restaurante);

      }
    } catch (error) {
      console.error('Error fetching restaurants data:', error);
    }
  };
  
  const getRestaurant = async (idrestaurante) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/restaurantes/${idrestaurante}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      const data = await response.json();
      console.log(data)
      setRestaurant(data)
      setLoading(false);
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

  
  const deletePlato = async (restaurant) => {

    await getRestaurants();
  };

    
  const modifyPlato = async (restaurant) => {


    await getRestaurants();
  };

  
  const addPlato = async (restaurant) => {


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
          <Route path="/" element={<Landing getRestaurant={getRestaurant} addPlato={addPlato} modifyRestaurant={modifyRestaurant} deleteRestaurant={deleteRestaurant} restaurants={restaurants} />} />
          <Route 
            path="/restaurante/:id" 
            element={
              loading 
                ? <p>Loading...</p> 
                : <Restaurante modifyPlato={modifyPlato} deletePlato={deletePlato} restaurant={restaurant} />
            } 
          />        
          </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
