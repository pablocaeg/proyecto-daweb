// ModifyPopup.js
import React, { useState, useEffect } from "react";

const ModifyPopup = ({ restaurant, onClose, modifyRestaurant }) => {
  const [name, setName] = useState(restaurant.name);
  const [coordinates, setCoordinates] = useState(restaurant.coordinates);
  const [city, setCity] = useState(restaurant.postalCode);
  const [sitios, setSitios] = useState([]);
  const [selectedSitios, setSelectedSitios] = useState([]);

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(false);

  useEffect(() => {
    // PETICION GET PARA OBTENER LOS SITIOS TURISTICOS A PARTIR DE LA ID DE UN RESTAURANTE.
    // SE HARDCODEA PARA VER COMO QUEDA LA INTERFAZ
    setSitios([
      {
        titulo: "Estatua de la Libertad",
        resumen:
          "La Estatua de la Libertad es un símbolo de libertad en Nueva York, EE.UU.",
        categorias: ["Historia", "Arquitectura"],
        enlacesExternos: ["https://www.nps.gov/stli/index.htm"],
        imagenes: ["estatua_libertad_1.jpg", "estatua_libertad_2.jpg"],
      },
      {
        titulo: "Central Park",
        resumen: "Central Park es un gran parque urbano en Nueva York, EE.UU.",
        categorias: ["Naturaleza", "Recreación"],
        enlacesExternos: ["https://www.centralparknyc.org/"],
        imagenes: ["central_park_1.jpg", "central_park_2.jpg"],
      },
      {
        titulo: "Museo Guggenheim",
        resumen: "El Museo Guggenheim es un museo de arte moderno en Nueva York, EE.UU.",
        categorias: ["Arte", "Cultura"],
        enlacesExternos: ["https://www.guggenheim.org/"],
        imagenes: ["guggenheim_1.jpg", "guggenheim_2.jpg"]
      }
    ]);
  }, [restaurant]);

  const handleSitioChange = (sitio) => {
    if (selectedSitios.includes(sitio)) {
      setSelectedSitios(selectedSitios.filter((sitio) => sitio !== sitio));
    } else {
      setSelectedSitios([...selectedSitios, sitio]);
    }
  };

  const handlePlatoSubmit = (e) => {
    e.preventDefault();
    // PETICION POST ADDPLATO A LA API
    console.log({ nombre, descripcion, precio, disponibilidad });
  };

  const handleUpdateRestauranteSubmit = (e) => {
    e.preventDefault();
    // PETICION PUT UPDATERESTAURANT A LA API
    console.log({ name, coordinates, city, selectedSitios });
  };

  return (
    <div className="modify-popup">
      <div className="modify-popup-inner">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h3 className="restaurant-title">Modificando "{restaurant.name}"</h3>
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
          <fieldset>
            <legend>Elegir sitios destacados:</legend>
            {sitios.map((sitio, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  name="sitios"
                  value={sitio.titulo}
                  checked={selectedSitios.includes(sitio.titulo)}
                  onChange={() => handleSitioChange(sitio.titulo)}
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
