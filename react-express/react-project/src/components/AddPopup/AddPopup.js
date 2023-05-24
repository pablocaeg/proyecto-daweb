import React, { useState } from "react";

const AddPopup = ({ onClose, addRestaurant }) => {
  const [name, setName] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [city, setCity] = useState("");

  const handleAddRestauranteSubmit = (e) => {
    e.preventDefault();
    // VALORES QUE SE LE PASAN AL POST ADDRESTAURANT.
    addRestaurant({ name, coordinates, city });
    setName("");
    setCoordinates("");
    setCity("");
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
          <button type="submit">Añadir restaurante</button>
        </form>
      </div>
    </div>
  );
};

export default AddPopup;
