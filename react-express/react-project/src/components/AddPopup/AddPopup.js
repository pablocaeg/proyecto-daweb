import React, { useState } from "react";

const AddPopup = ({ onClose, addRestaurant }) => {
  const [nombre, setName] = useState("");
  const [coordenadas, setCoordinates] = useState("");
  const [ciudad, setCity] = useState("");
  const [postalcode, setPostalCode] = useState("");

  const handleAddRestauranteSubmit = (e) => {
    e.preventDefault();
    addRestaurant(nombre, coordenadas, ciudad, postalcode);
    setName("");
    setCoordinates("");
    setCity("");
    setPostalCode("")
    onClose();
  };

  return (
    <div className="add-popup">
      <div className="add-popup-inner">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h3 className="restaurant-title">Añadir nuevo restaurante</h3>
        <hr className="form-separator"></hr>
        <form className="popup-form" onSubmit={handleAddRestauranteSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Coordenadas:
            <input
              type="text"
              value={coordenadas}
              onChange={(e) => setCoordinates(e.target.value)}
            />
          </label>
          <label>
            Ciudad:
            <input
              type="text"
              value={ciudad}
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
          <button type="submit">Añadir restaurante</button>
        </form>
      </div>
    </div>
  );
};

export default AddPopup;
