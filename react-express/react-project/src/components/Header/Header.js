import React, { useState } from 'react';
import { Link } from "react-router-dom"
import AddPopup from "../AddPopup/AddPopup.js"

const Header = ({ addRestaurant }) => {
  const [showAddPopup, setShowAddPopup] = useState(false);  // State to control the AddPopup

  const handleAddRestaurant = () => {
    setShowAddPopup(true);  // Set the state to true when the button is clicked
  };

  const handleClose = () => {
    setShowAddPopup(false);  // Close the popup
  };
  
  return (
    <header>
      <img id="app-logo" src="logo-mifoodie.png" alt=""></img>
      <Link id="app-title" to="/">MiFoodie</Link>
      <nav className="navbar">        
        <ul className="navbar-nav">
          <li className="navbar-button">
            <a className="nav-link" onClick={() => alert('Acceso con JWT Github')}>Acceder</a>
          </li>
          <li className="navbar-button">
            <a className="nav-link" onClick={handleAddRestaurant}>Nuevo Restaurante</a>
          </li>
          <li className="navbar-button">
            <a className="nav-link" href="contacto.html">Contacto</a>
          </li>
        </ul>
      </nav>
      {showAddPopup && <AddPopup onClose={handleClose} addRestaurant={addRestaurant} />}
    </header>
  );
};

export default Header;