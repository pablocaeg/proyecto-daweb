import React from 'react';

const Header = () => {
  return (
    <header>
        <img id="app-logo" src="logo-mifoodie.png" alt=""></img>
        <a id="app-title" href="#">MiFoodie</a>
        <nav class="navbar navbar-expand-lg bg-info navbar-dark">
       {/*Container wrapper*/}
        
          {/*Icons*/}
        <ul class="navbar-nav navbar-nav ms-auto ">
          <li class="">
            <a href="#" tabindex="0" class="nav-link">Contacto</a>
          </li>
        </ul>
      

      {/*Container wrapper*/}
    </nav>
    </header>
  );
};

export default Header;