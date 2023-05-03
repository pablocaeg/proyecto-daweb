import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const InfoRestaurante = ({ restaurant }) => {
  const [lat, lon] = restaurant.coordinates.split(', ').map(Number);

  return (
    <div className="Inforestaurante-container">
      <p>Coordinates: {restaurant.coordinates}</p>
      <p>Postal Code: {restaurant.postalCode}</p>
      <p>Rating: {restaurant.rating}</p>
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
    </div>
  );
};

export default InfoRestaurante;
