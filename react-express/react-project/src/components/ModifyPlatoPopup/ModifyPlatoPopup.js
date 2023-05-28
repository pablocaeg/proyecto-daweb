// ModifyPlatoPopup.js
import React, { useState } from "react";

const ModifyPlatoPopup = ({plato, onClose, modifyPlato, restaurant}) => {
  const [nombre, setNombre] = useState(plato.nombre);
  const [descripcion, setDescripcion] = useState(plato.descripcion);
  const [precio, setPrecio] = useState(plato.precio);
  const [disponibilidad, setDisponibilidad] = useState(plato.disponibilidad);

  const handlePlatoSubmit = (e) => {
    e.preventDefault();
    modifyPlato(nombre, descripcion, precio, restaurant.id)
    console.log({ nombre, descripcion, precio, disponibilidad });

  };

  return (
    <div className="modify-plato-popup">
      <div className="modify-plato-popup-inner">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h3 className="plato-title">Modificando "{plato.nombre}"</h3>
        <hr className="form-separator"></hr>
        <form className="popup-form" onSubmit={handlePlatoSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </label>
          <label>
            Descripcion:
            <input
              type="text"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
            />
          </label>
          <label>
            Precio:
            <input
              type="text"
              value={precio}
              onChange={e => setPrecio(e.target.value)}
            />
          </label>
          <label>
            Disponibilidad:
            <input
              type="checkbox"
              checked={disponibilidad}
              onChange={e => setDisponibilidad(e.target.checked)}
            />
          </label>
          <button type="submit">Modificar Plato</button>
        </form>
      </div>
    </div>
  );
};

export default ModifyPlatoPopup;
