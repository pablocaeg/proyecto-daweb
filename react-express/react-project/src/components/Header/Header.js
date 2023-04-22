import React from 'react';

const Header = () => {
  return (
    <header>
        <img id="app-logo" src="logo-mifoodie.png" alt=""></img>
        <a id="app-title" href="#">MiFoodie</a>
        <nav class="navbar">        
          {/*Icons*/}
          <ul class="navbar-nav navbar-nav ms-auto ">
            <li class="">
              <a href="#" tabindex="0" class="nav-link">Contacto</a>
            </li>
          </ul>
    </nav>
    </header>
  );
};

export default Header;