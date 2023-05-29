import React, { useState } from "react";
import ModifyPlatoPopup from "../ModifyPlatoPopup/ModifyPlatoPopup";

const Platos = ({ restaurant, modifyPlato, deletePlato }) => {
  const [showModifyPopup, setShowModifyPopup] = useState(false);
  const [selectedPlato, setSelectedPlato] = useState(null);

  const openModifyPopup = (plato) => {
    setSelectedPlato(plato);
    setShowModifyPopup(true);
  };

  const closeModifyPopup = () => {
    setSelectedPlato(null);
    setShowModifyPopup(false);
  };

  return (
    <div className="platos-container">
      {restaurant.platos.map((plato, index) => (
        <div className="plato-item" key={index}>
          <h2>{plato.nombre}</h2>
          <p>{plato.descripcion}</p>
          <p>Precio: {plato.precio}€</p>
          <div className="plato-button-container">
            <button
              className="plato-modify-button"
              onClick={() => openModifyPopup(plato)}
            >
              Modificar
            </button>
            <a
              id="incidencias-button"
              href={`http://localhost:3000/incidencias?incidencia=${plato.nombre}&restaurante=${restaurant.nombre}`}
              className="plato-incidencia-button"
            >
              Añadir Incidencia
            </a>
            <button
              className="plato-delete-button"
              onClick={() => deletePlato(restaurant.id, plato.nombre)}
            >
              Borrar
            </button>
          </div>
        </div>
      ))}
      {showModifyPopup && selectedPlato && (
        <ModifyPlatoPopup
          plato={selectedPlato}
          onClose={closeModifyPopup}
          modifyPlato={modifyPlato}
          restaurant={restaurant}
        />
      )}
    </div>
  );
};

export default Platos;
