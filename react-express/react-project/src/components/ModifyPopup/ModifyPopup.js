// ModifyPopup.js
import React, { useState } from "react";

const ModifyPopup = ({ sitios, restaurant, onClose, modifyRestaurant, addPlato }) => {
  const [name, setName] = useState(restaurant.resumen.nombre);
  const [coordinates, setCoordinates] = useState(restaurant.resumen.coordenadas);
  const [postalcode, setPostalCode] = useState(restaurant.resumen.codigoPostal);
  const [city, setCity] = useState(restaurant.resumen.ciudad);
  const [selectedSitios, setSelectedSitios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(false);


  const handleSitioChange = (sitio) => {
    if (selectedSitios.includes(sitio)) {
      setSelectedSitios(selectedSitios.filter((sitio) => sitio !== sitio));
    } else {
      setSelectedSitios([...selectedSitios, sitio]);
    }
  };

  const handlePlatoSubmit = (e) => {
    e.preventDefault();
    addPlato(restaurant.resumen.id, nombre, descripcion, precio, disponibilidad)
    console.log({ nombre, descripcion, precio, disponibilidad });
    onClose()
  };

  const handleUpdateRestauranteSubmit = (e) => {
    e.preventDefault();
    console.log(selectedSitios)
    modifyRestaurant(restaurant.resumen.id, name, coordinates, postalcode, selectedSitios, city)
    onClose()
  };

  return (
    <div className="modify-popup">
      <div className="modify-popup-inner">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h3 className="restaurant-title">Modificando "{restaurant.resumen.nombre}"</h3>
        <hr className="form-separator"></hr>
        <form className="popup-form" onSubmit={handleUpdateRestauranteSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Coordenadas:
            <input
              type="text"
              value={coordinates}
              onChange={(e) => setCoordinates(e.target.value)}
            />
          </label>
          <label>
            Ciudad:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label>
            Código Postal:
            <input
              type="text"
              value={postalcode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </label>
          <fieldset>
            <legend>Elegir sitios destacados:</legend>
            {sitios.map((sitio, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  name="sitios"
                  value={sitio.titulo}
                  checked={selectedSitios.includes(sitio)}
                  onChange={() => handleSitioChange(sitio)}
                />
                {sitio.titulo}
              </label>
            ))}
          </fieldset>
          <button type="submit">Actualizar restaurante</button>
        </form>
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
              type="text"
              checked={disponibilidad}
              onChange={e => setDisponibilidad(e.target.checked)}
            />
          </label>
          <button type="submit">Agregar Plato</button>
        </form>
      </div>
    </div>
  );
};

export default ModifyPopup;
