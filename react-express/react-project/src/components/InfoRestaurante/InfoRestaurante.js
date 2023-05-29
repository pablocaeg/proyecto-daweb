import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const InfoRestaurante = ({ addValoracion, valoraciones, restaurant }) => {
  const [correo, setCorreo] = useState("");
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(1);

  const handleAddValoracionSubmit = (e) => {
    e.preventDefault();
    addValoracion(restaurant.idOpinion, correo, comentario, calificacion)
  };

  console.log(restaurant);
  
  const [lat, lon] = restaurant.coordenadas.split(",").map(Number);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [linkListOpen, setLinkListOpen] = useState(false);

  const nextImage = () => {
    setCarouselIndex(
      (carouselIndex + 1) % restaurant.sitios[0].imagenes.length
    );
  };

  const prevImage = () => {
    setCarouselIndex(
      (carouselIndex - 1 + restaurant.sitios[0].imagenes.length) %
        restaurant.sitios[0].imagenes.length
    );
  };
  
  const renderRatingStars = (rating) => {
    const maxRating = 5;
    const stars = [];
    const roundedRating = Math.floor(rating);
    const decimalPart = rating - roundedRating;

    const starPath =
      "M10 1.0001l2.247 6.954h7.303l-5.91 4.2999 2.247 6.954-5.887-4.2989-5.887 4.2989 2.247-6.954-5.91-4.2999h7.303z";

    for (let i = 1; i <= maxRating; i++) {
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
          <path
            d={starPath}
            fill="none"
            stroke="#f5a623"
            strokeWidth="1"
          ></path>
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="info-restaurante-container">
      <h1 className="info-restaurante-label">Dónde estamos</h1>
      <div className="map-container">
        <MapContainer
          center={[lat, lon]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lon]}>
            <Popup>{restaurant.nombre}</Popup>
          </Marker>
        </MapContainer>
      </div>
      <p>
        Coordenadas: {restaurant.coordenadas} | Código Postal:{" "}
        {restaurant.codigoPostal}
      </p>
      <h1 className="info-restaurante-label">Sitios</h1>
      {restaurant.sitios.map((sitio, index) => (
        <div key={index} className="sitio-info">
          <h2>{sitio.titulo}</h2>
          <p>{sitio.resumen}</p>
          <div className="sitio-enlaces-externos">
            <button
              className="enlaces-button"
              onClick={() => setLinkListOpen(!linkListOpen)}
            >
              {linkListOpen
                ? "Esconder enlaces externos"
                : "Mostrar enlaces externos"}
            </button>
            {sitio.enlacesExternos?.length > 0 ? (
              linkListOpen &&
              sitio.enlacesExternos.map((link, i) => (
                <a key={i} href={link}>
                  Enlace externo {i + 1}
                </a>
              ))
            ) : (
              <p>Este sitio no tiene enlaces externos asociados.</p>
            )}
          </div>

          <div className="sitio-imagenes">
            {sitio.imagenes?.length > 0 ? (
              <>
                <button className="imagenes-button" onClick={prevImage}>
                  Siguiente
                </button>
                <img
                  className="imagenes-display"
                  src={sitio.imagenes[carouselIndex]}
                  alt="Error al recuperar la imagen"
                />
                <button className="imagenes-button" onClick={nextImage}>
                  Anterior
                </button>
              </>
            ) : (
              <p>Este sitio no tiene imágenes asociadas</p>
            )}
          </div>
        </div>
      ))}
      <h1 className="info-restaurante-label">Opiniones</h1>
      <h3>
        Valoración media:{" "}
        <span className="rating-stars">
          {renderRatingStars(restaurant.calificacionMedia)}{" "}
        </span>
        <span id="rating">({restaurant.calificacionMedia})</span>
      </h3>
      <h4>Número de valoraciones: {restaurant.numValoraciones}</h4>
      <form onSubmit={handleAddValoracionSubmit} className="valoracion-form">
        <h2 className="valoracion-restaurante-label">Añadir valoración</h2>
        <label>
          Correo electrónico:
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </label>
        <label>
          Comentario:
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
          />
        </label>
        <label>
          Calificación:
          <input
            type="number"
            min="1"
            max="5"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
            required
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
      <div className="valoraciones-display">
        <h2 className="valoraciones-label">Valoraciones</h2>
        {valoraciones.map((valoracion, index) => (
          <div key={index} className="valoracion-item">
            <h3 className="valoracion-correo">
              {valoracion.correoElectronico}
            </h3>
            <div className="valoracion-calificacion">
              {renderRatingStars(valoracion.calificacion)}
            </div>
            <p className="valoracion-comentario">{valoracion.comentario}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoRestaurante;
