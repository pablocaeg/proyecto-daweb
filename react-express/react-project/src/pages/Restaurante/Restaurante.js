import React from 'react';
import { Route, Routes} from "react-router-dom"
import { Link } from "react-router-dom"

import InfoRestaurante from "../../components/InfoRestaurante/InfoRestaurante.js";
import Platos from "../../components/Platos/Platos.js";

const Restaurante = () => {
    return (
      <div className="restaurante-container" >
        <h1>Restaurante</h1>
        <Link id="link-inforestaurante" to="/restaurante/inforestaurante">Informacion</Link>
        <h2>Platos</h2>
        <Link id="link-platos" to="/restaurante/platos">Platos</Link>

        <Routes>
            <Route path="inforestaurante" element={<InfoRestaurante/>}/>
            <Route path="platos" element={<Platos/>}/>
         </Routes>
      </div>
    );
  };
  
  export default Restaurante;