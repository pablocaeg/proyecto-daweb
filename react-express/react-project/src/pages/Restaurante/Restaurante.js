import React, { useState } from "react";
import { useParams } from "react-router-dom";
import InfoRestaurante from "../../components/InfoRestaurante/InfoRestaurante.js";
import Platos from "../../components/Platos/Platos.js";

const Restaurante = ({ restaurants }) => {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === parseInt(id, 10));
  const [displayedComponent, setDisplayedComponent] = useState("info");

  if (!restaurant) {
    return <h1>Restaurant not found</h1>;
  }

  const handleButtonClick = (component) => {
    setDisplayedComponent(component);
  };

  return (
    <div className="restaurante-container">
      <div class="container_img">
        <img
          class="img-full-width"
          src="../delivery_background.jpg"
          alt="Imagen del restaurante"
        />
      </div>

      <h1>{restaurant.name}</h1>

      <div class="restaurant-btn-container">
        <button id="link-inforestaurante"
          className={`restaurant-btn-info ${
            displayedComponent === "info" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("info")}
        >
          Información
        </button>
        <button id="link-platos"
          className={`restaurant-btn-platos ${
            displayedComponent === "platos" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("platos")}
        >
          Platos
        </button>
      </div>

      {displayedComponent === "info" ? (
        <InfoRestaurante restaurant={restaurant} />      ) : (
        <Platos />
      )}
    </div>
  );
};

export default Restaurante;
