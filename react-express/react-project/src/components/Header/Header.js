import React from 'react';
import { Link } from "react-router-dom"

const Header = ({ onAddRestaurant }) => {
  
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
            <a className="nav-link" onClick={console.log("añadir popup nuevo restaurante")}>Nuevo Restaurante</a>
          </li>
          <li className="navbar-button">
            <a className="nav-link" href="contacto.html">Contacto</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
