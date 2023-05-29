import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Contact from './pages/Contact/Contact.js';
import Landing from './pages/Landing/Landing.js';
import Restaurante from './pages/Restaurante/Restaurante.js';

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [valoraciones, setValoraciones] = useState([]);
  const [restaurant, setRestaurant] = useState([]);

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
  
  const [loadingRestaurant, setLoadingRestaurant] = useState(false);
  const [loadingSitiosProximos, setLoadingSitiosProximos] = useState(false);

  // IMPORTANTE
  //! EL GET VALORACIONES SE HARÁ DENTRO DEL GETRESTAURANT. PRIMERO SE COMPRUEBA SI EXISTE OPINION PARA ESE RESTAURANTE, SI NO EXISTE SE CREA, SI EXISTE SE ASIGNA EL SETVALORACIONES.

  const getSitiosProximos = async (idrestaurante) => {
    //? ADD GET SITIOS PROXIMOS GET REQUEST
    // EN ESTA FUNCION SE MODIFICA LA FUNCION LOADINGSITIOSPROXIMOS.
  };

  const addValoracion = async (idopinion) => {
    try {
      const jwt = getCookie('jwt');
      console.log('Cookie jwt: ', jwt);
      if(!jwt) {
        window.location.href = 'http://localhost:8090/oauth2/authorization/github';
      }else{
        console.log("Añadiendo restaurantes")
          const response = await fetch(`http://localhost:8090/opiniones/${idopinion}/valoraciones`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              // El body de la petición es el restaurante que se quiere añadir
              body: JSON.stringify({
                "correoElectronico":nombre,
                "fechaRegistro": new Date().toISOString(),
                "comentario":coordenadas,
                "calificacion":ciudad
            })
          });
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          // Al modificar el restaurante, se vuelve a hacer la petición para obtener los restaurantes actualizados
          await getRestaurants();
      }
    } catch (error) {
        console.error('Error adding valoracion:', error);
    }
  };

// En nuestra lógica del backend para poder usar la plataforma tienes que estar loggeado, independientemente de se eres o no gestor
// Lo que te permitiriría crear restaurantes y modificarlos si eres su gestor
const getRestaurants = async () => {
    try {
      const jwt = getCookie('jwt');
      console.log('Cookie jwt: ', jwt);
      if(!jwt) {
        console.log('LOGGEATE')
        window.location.href = 'http://localhost:8090/oauth2/authorization/github';
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
      const jwt = getCookie('jwt');
      console.log('Cookie jwt: ', jwt);
      if(!jwt) {
        window.location.href = 'http://localhost:8090/oauth2/authorization/github';
      }else{
        setLoadingRestaurant(true);
        const response = await fetch(`http://localhost:8090/restaurantes/${idrestaurante}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const data = await response.json();
        console.log(data)
        setRestaurant(data)
        setLoadingRestaurant(false);
      }
    } catch (error) {
      console.error('Error fetching restaurants data:', error);
    }
  };

  const addRestaurant = async (nombre, coordenadas, ciudad) => {
    try {
      const jwt = getCookie('jwt');
      console.log('Cookie jwt: ', jwt);
      if(!jwt) {
        window.location.href = 'http://localhost:8090/oauth2/authorization/github';
      }else{
        console.log("Añadiendo restaurantes")
          const response = await fetch('http://localhost:8090/restaurantes', {
              method: 'POST',
              
              headers: {
                  'Content-Type': 'application/json'
              },
              // El body de la petición es el restaurante que se quiere añadir
              body: JSON.stringify({
                "nombre":nombre,
                "coordenadas":coordenadas,
                "ciudad":ciudad
            })
          });
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          // Al modificar el restaurante, se vuelve a hacer la petición para obtener los restaurantes actualizados
          await getRestaurants();
      }
    } catch (error) {
        console.error('Error adding restaurant:', error);
    }
};
/*************** HASTA AQUI *******************/
const modifyRestaurant = async (restaurant) => {
    try {
      const jwt = getCookie('jwt');
      console.log('Cookie jwt: ', jwt);
      if(!jwt) {
        window.location.href = 'http://localhost:8090/oauth2/authorization/github';
      }else{
          const response = await fetch(`http://localhost:8090/restaurantes/${restaurant.id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + jwt
              },
              body: JSON.stringify(restaurant)
          });
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          await getRestaurants();
        }
    } catch (error) {
        console.error('Error modifying restaurant:', error);
    }
};

const deleteRestaurant = async (restaurant) => {
    try {
      const jwt = getCookie('jwt');
      console.log('Cookie jwt: ', jwt);
      if(!jwt) {
        window.location.href = 'http://localhost:8090/oauth2/authorization/github';
      }else{
          const response = await fetch(`http://localhost:8090/restaurantes/${restaurant.id}`, {
              method: 'DELETE',
              headers: { 'Authorization': 'Bearer ' + jwt }
          });
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          await getRestaurants();
        }
    } catch (error) {
        console.error('Error deleting restaurant:', error);
    }
};

  
  const deletePlato = async (idRestaurante,nombrePlato) => {
    try {
      const jwt = getCookie('jwt');
      console.log('Cookie jwt: ', jwt);
      if(!jwt) {
        window.location.href = 'http://localhost:8090/oauth2/authorization/github';
      }else{
          const response = await fetch(`http://localhost:8090/restaurantes/${idRestaurante}/platos/${nombrePlato}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + jwt
              },
          });
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          await getRestaurants();
        }
    } catch (error) {
        console.error('Error modifying restaurant:', error);
    }
  };

    
  const modifyPlato = async (nombre, descripcion, precio, idRestaurante) => {
    try {
      const jwt = getCookie('jwt');
      console.log('Cookie jwt: ', jwt);
      if(!jwt) {
        window.location.href = 'http://localhost:8090/oauth2/authorization/github';
      }else{
          const response = await fetch(`http://localhost:8090/restaurantes/${idRestaurante}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + jwt
              },
              body: JSON.stringify({
                "nombre":nombre,
                "descripcion":descripcion,
                "precio":precio
            })
          });
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          await getRestaurants();
        }
    } catch (error) {
        console.error('Error modifying restaurant:', error);
    }
  };

  
  const addPlato = async (idRestaurante, nombre, descripcion, precio) => {
    try {
      const jwt = getCookie('jwt');
      console.log('Cookie jwt: ', jwt);
      if(!jwt) {
        window.location.href = 'http://localhost:8090/oauth2/authorization/github';
      }else{
          const response = await fetch(`http://localhost:8090/restaurantes/${idRestaurante}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + jwt
              },
              body: JSON.stringify({
                "nombre":nombre,
                "descripcion":descripcion,
                "precio":precio
            })
          });
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          await getRestaurants();
        }
    } catch (error) {
        console.error('Error modifying restaurant:', error);
    }
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
          <Route path="/" element={<Landing getSitiosProximos={getSitiosProximos} loadingSitiosProximos={loadingSitiosProximos} getRestaurant={getRestaurant} addPlato={addPlato} modifyRestaurant={modifyRestaurant} deleteRestaurant={deleteRestaurant} restaurants={restaurants} />} />
          <Route 
            path="/restaurante/:id" 
            element={
              loadingRestaurant 
                ? <p>Loading...</p> 
                : <Restaurante modifyPlato={modifyPlato} deletePlato={deletePlato} addValoracion={addValoracion} valoraciones={valoraciones} restaurant={restaurant} />
            } 
          />        
          </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
