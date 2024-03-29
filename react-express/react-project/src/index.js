import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "./components/Footer/Footer.css";
import "./components/RestaurantList/RestaurantList.css";
import "./components/InfoRestaurante/InfoRestaurante.css";
import "./components/Platos/Platos.css";
import "./components/ModifyPlatoPopup/ModifyPlatoPopup.css";
import "./components/Header/Header.css";
import "./components/Filters/Filters.css";
import "./components/SearchBar/SearchBar.css";
import "./pages/Restaurante/Restaurante.css";
import "./components/ModifyPopup/ModifyPopup.css";
import "./components/AddPopup/AddPopup.css";

import App from "./App";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
