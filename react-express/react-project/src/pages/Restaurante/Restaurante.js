import React, { useState } from "react";
import InfoRestaurante from "../../components/InfoRestaurante/InfoRestaurante.js";
import Platos from "../../components/Platos/Platos.js";

const Restaurante = ({ opinion, restaurant, modifyPlato, deletePlato}) => {
  const [displayedComponent, setDisplayedComponent] = useState("info");

  if (!restaurant) {
    return <h1>Restaurante no encontrado</h1>;
  }

  const handleButtonClick = (component) => {
    setDisplayedComponent(component);
  };

  return (
    <div className="restaurante-container">
      <div className="container_img">
        <img
          className="img-full-width"
          src="../delivery_background.jpg"
          alt="Imagen del restaurante"
        />
      </div>

      <h1>{restaurant.nombre}</h1>

      <div className="restaurant-btn-container">
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
        <InfoRestaurante opinion={opinion} restaurant={restaurant} />      ) : (
        <Platos modifyPlato={modifyPlato} deletePlato={deletePlato} restaurant={restaurant} />
      )}
    </div>
  );
};

export default Restaurante;
