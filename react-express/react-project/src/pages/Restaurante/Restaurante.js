import React from 'react';
import { Route, Routes} from "react-router-dom"
import { Link } from "react-router-dom"

import InfoRestaurante from "../../components/InfoRestaurante/InfoRestaurante.js";
import Platos from "../../components/Platos/Platos.js";

const Restaurante = () => {
    return (
      <div className="restaurante-container" >
        <h1>Restaurante</h1>
        
        <h2>Platos</h2>
        <div class = "restaurant-btn-container">
          <div>
          <Link id="link-inforestaurante" to="/restaurante/inforestaurante">Informacion</Link>

          </div>
          <div>
          <Link id="link-platos" to="/restaurante/platos">Platos</Link>

          </div>
        </div>
        <Routes>
            <Route path="inforestaurante" element={<InfoRestaurante/>}/>
            <Route path="platos" element={<Platos/>}/>
         </Routes>
      </div>
    );
  };
  
  export default Restaurante;