import React, { useState } from "react";

import { Route, Routes} from "react-router-dom"
import { Link } from "react-router-dom"

import InfoRestaurante from "../../components/InfoRestaurante/InfoRestaurante.js";
import Platos from "../../components/Platos/Platos.js";

const Restaurante = () => {
  const [activeButton, setActiveButton] = useState("info");
  
// La función actualiza el estado activeButton utilizando setActiveButton con el valor del argumento button.
  const handleClick = (button) => {
    setActiveButton(button);
  };
    return (
      <div className="restaurante-container" >
        <div class="container_img">
          <img class="img-full-width" src="https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-simple-food-delivery-meal-fashion-poster-background-yellow-back-image_158378.jpg" alt="Imagen del restaurante" />
        </div>

        <h1>Restaurante</h1>
        
        <div class="restaurant-btn-container">
          <div
          // Agrega una clase condicional al div de "Información". Si activeButton es igual a "info",
          // entonces se agrega la clase "active", de lo contrario, no se agrega ninguna clase adicional.
            class={`restaurant-btn-info ${activeButton === "info" ? "active" : ""}`}
            // Esta línea asigna un controlador de eventos onClick al div de "Información".
            // Cuando se hace clic en el div, se llama a la función handleClick con el argumento "info".
            onClick={() => handleClick("info")}
          >
            <Link id="link-inforestaurante" to="/restaurante/inforestaurante">
              Información
            </Link>
          </div>
          <div
            class={`restaurant-btn-platos ${
              activeButton === "platos" ? "active" : ""
            }`}
            onClick={() => handleClick("platos")}
          >
            <Link id="link-platos" to="/restaurante/platos">
              Platos
            </Link>
          </div>
        </div>
        <Routes>
            <Route path="inforestaurante" element={<InfoRestaurante/>}/>
            <Route path="platos" element={<Platos/>}/>
         </Routes>
      </div>
    );
  };
  
  export default Restaurante;