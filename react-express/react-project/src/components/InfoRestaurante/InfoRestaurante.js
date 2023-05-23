import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const InfoRestaurante = ({ restaurant }) => {
  const [lat, lon] = restaurant.coordinates.split(', ').map(Number);

  const renderRatingStars = (rating) => {
    const maxRating = 5; // Set the maximum rating value here
    const stars = [];
    const roundedRating = Math.floor(rating);
    const decimalPart = rating - roundedRating;

    const starPath =
      'M10 1.0001l2.247 6.954h7.303l-5.91 4.2999 2.247 6.954-5.887-4.2989-5.887 4.2989 2.247-6.954-5.91-4.2999h7.303z';

    for (let i = 1; i < maxRating; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className="star"
          fill={i <= roundedRating ? "#f5a623" : "#cccccc"}
          stroke="#f5a623"
          strokeWidth="1"
          width="20"
          height="20"
        >
          <path d={starPath}></path>
        </svg>
      );
    }

    if (decimalPart > 0) {
      stars.push(
        <svg
          key={maxRating + 1}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className="star"
          width="20"
          height="20"
        >
          <defs>
            <clipPath id="starClip">
              <rect x="0" y="0" width={decimalPart * 20} height="20" />
            </clipPath>
          </defs>
          <g clipPath="url(#starClip)">
            <path d={starPath} fill="#f5a623"></path>
          </g>
          <path d={starPath} fill="none" stroke="#f5a623" strokeWidth="1"></path>
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="info-restaurante-container">
      <h1>Dónde estamos</h1>
      <div className="map-container">
        <MapContainer center={[lat, lon]} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lon]}>
            <Popup>
              {restaurant.name}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <p>Coordenadas: {restaurant.coordinates} | Código Postal: {restaurant.postalCode}</p>
      <h3>Rating: <span className="rating-stars">{renderRatingStars(restaurant.rating)} </span><span id="rating">({restaurant.rating})</span></h3>
      <h1>Opiniones</h1>
    </div>
  );
};

export default InfoRestaurante;



