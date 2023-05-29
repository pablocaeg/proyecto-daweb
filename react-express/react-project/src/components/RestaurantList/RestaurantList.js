import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModifyPopup from "../ModifyPopup/ModifyPopup.js";

const toRadians = (degrees) => {
  return (degrees * Math.PI) / 180;
};

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const RestaurantList = ({
  restaurants,
  ratingFilter,
  searchQuery,
  latitude,
  longitude,
  city,
  distance,
  setSearchBarCount,
  modifyRestaurant,
  deleteRestaurant,
  addPlato,
  getRestaurant,
  getSitiosProximos,
  loadingSitiosProximos,
  sitios,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const itemsPerPage = 5;

  const borrarRestaurante = (idrestaurante) => {
    deleteRestaurant(idrestaurante);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [ratingFilter, searchQuery, latitude, longitude, distance, city]);

  const filteredRestaurants = restaurants

    .filter((restaurant) =>
      restaurant.resumen.nombre
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .filter((restaurant) => {
      if (latitude && longitude && distance) {
        const [lat, lon] = restaurant.resumen.coordenadas
          .split(",")
          .map(Number);
        return getDistance(lat, lon, latitude, longitude) <= distance;
      }
      return true;
    })
    .filter(
      (restaurant) => restaurant.resumen.calificacionMedia >= ratingFilter
    )
    .filter((restaurant) =>
      city.trim() === ""
        ? true
        : restaurant.resumen.ciudad === null ||
          restaurant.resumen.ciudad.toLowerCase() === city.toLowerCase()
    );

  useEffect(() => {
    setSearchBarCount(filteredRestaurants.length);
  }, [filteredRestaurants, setSearchBarCount]);

  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);

  const displayedRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  const openModifyPopup = (restaurant) => {
    setCurrentRestaurant(restaurant);
    setShowPopup(true);
  };

  const closeModifyPopup = () => {
    setCurrentRestaurant(false);
    setShowPopup(false);
  };

  return (
    <div className="restaurant-list">
      {displayedRestaurants.map((restaurant) => (
        <Link
          key={restaurant.resumen.id}
          onClick={() => getRestaurant(restaurant.resumen.id)}
          to={`/restaurante/${restaurant.resumen.id}`}
          style={{ textDecoration: "none" }}
        >
          <div className="restaurant-item" key={restaurant.resumen.id}>
            <h3 className="restaurant-name">{restaurant.resumen.nombre}</h3>
            <p className="restaurant-info">
              Coordenadas: {restaurant.resumen.coordenadas}
            </p>
            <p className="restaurant-info">
              Código postal: {restaurant.resumen.codigoPostal}
            </p>
            <p className="restaurant-info">
              Ciudad: {restaurant.resumen.ciudad}
            </p>
            <p className="restaurant-info">
              Calificacion Media: {restaurant.resumen.calificacionMedia}
            </p>
            <div className="restaurant-button-container">
              <button
                className="modify-button"
                onClick={(event) => {
                  getSitiosProximos(restaurant.resumen.id);
                  event.preventDefault();
                  event.stopPropagation();
                  openModifyPopup(restaurant);
                }}
              >
                Modificar
              </button>
              <button
                className="delete-button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  borrarRestaurante(restaurant.resumen.id);
                }}
              >
                Borrar
              </button>
            </div>
          </div>
        </Link>
      ))}
      <div className="pagination-buttons">
        {currentPage > 1 && (
          <button
            className="pagination-button pagination-prev"
            onClick={() => changePage(-1)}
          >
            Anterior
          </button>
        )}
        {currentPage < totalPages && (
          <button
            className="pagination-button pagination-next"
            onClick={() => changePage(1)}
          >
            Siguiente
          </button>
        )}
        <div className="page-info">
          <h3>{currentPage}</h3>
          <span>/</span>
          <h3>{totalPages}</h3>
        </div>
      </div>
      {showPopup &&
        currentRestaurant &&
        (loadingSitiosProximos ? (
          <p>Loading...</p>
        ) : (
          <ModifyPopup
            sitios={sitios}
            addPlato={addPlato}
            modifyRestaurant={modifyRestaurant}
            restaurant={currentRestaurant}
            onClose={closeModifyPopup}
          />
        ))}
    </div>
  );
};

export default RestaurantList;
