import React from 'react';
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
        <img id="app-logo" src="logo-mifoodie.png" alt=""></img>
        <Link id="app-title" to="/">MiFoodie</Link>
        <nav class="navbar">        
          {/*Icons*/}
          <ul class="navbar-nav">
            <li class="navbar-button">
              <a class="nav-link" href="contacto.html">Contacto</a>
            </li>
          </ul>
      </nav>
    </header>
  );
};

export default Header;