import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const InfoRestaurante = ({ restaurant }) => {
  console.log(restaurant)
  restaurant =
    {
      "id": "64665dd8cc4b7b25bbff08bd",
      "nombre": "Test3",
      "coordenadas": "1,1",
      "codigoPostal": "30003",
      "idGestor": "pablocarrascoegea@gmail.com",
      "platos": [
        {
          "nombre": "Paella Valenciana",
          "descripcion": "Authentic Spanish rice dish with rabbit, chicken, and a variety of beans and vegetables.",
          "precio": 15.5
        },
        {
          "nombre": "Tortilla Española",
          "descripcion": "Traditional Spanish omelette made with potatoes and onions.",
          "precio": 7.0
        }
      ],
      "sitios": [
        {
          "titulo": "Museo Arqueológico de Murcia",
          "resumen": "El Museo Arqueológico de Murcia se halla en la ciudad del mismo nombre, en la Región de Murcia (España). Tiene su origen en el antiguo Museo Provincial que fue creado por Real Orden del Ministerio de Fomento el 6 de julio de 1864 gracias a las aportaciones de la Comisión Provincial de Monumentos. Las primeras sedes del mismo fueron el Teatro de los Infantes (1864), el edificio del Contraste de la Seda (1866) y el actual Museo de Bellas Artes de Murcia (1910). En 1953, las colecciones arqueológicas del Museo Provincial se trasladaron al edificio actual, construido entre 1945 y 1953 por Luis Moya Blanco y José Luis de León para Casa de la Cultura, dando lugar al Museo Arqueológico de Murcia. En 1962, la colección de Arqueología y el edificio fueron declarados Monumentos Histórico-Artísticos.",
          "categorias": [
            "http://schema.org/Place",
            "http://dbpedia.org/ontology/Building",
            "http://dbpedia.org/ontology/ArchitecturalStructure",
            "http://dbpedia.org/ontology/Location",
            "http://www.wikidata.org/entity/Q41176",
            "http://www.wikidata.org/entity/Q33506",
            "http://dbpedia.org/ontology/Place",
            "http://dbpedia.org/ontology/Museum",
            "http://www.w3.org/2002/07/owl#Thing"
          ],
          "enlacesExternos": [
            "https://tools.wmflabs.org/panoviewer/%23Planta_2_MAM_-_Sal%C3%B3n_de_Actos.jpg",
            "https://tools.wmflabs.org/panoviewer/%23Planta_2_MAM_-_Taller_de_Restauraci%C3%B3n.jpg",
            "https://tools.wmflabs.org/panoviewer/%23Recepcion_e_informaci%C3%B3n_MAM.jpg",
            "https://tools.wmflabs.org/panoviewer/%23Taller_Did%C3%A1ctico_MAM.jpg",
            "https://tools.wmflabs.org/panoviewer/%23Vitrina_anular_-_Sector_4.jpg",
            "http://www.museosdemurcia.com/museos.inicio%3Fmuseo=museo-arqueol%F3gico-de-murcia-(mam)&id=1",
            "http://www.museosdemurcia.com/",
            "https://mvam.skeye2k.org/vs/",
            "https://tools.wmflabs.org/panoviewer/%23Acceso_al_MAM.jpg",
            "https://tools.wmflabs.org/panoviewer/%23MAM_y_Alfonso_X_el_Sabio.jpg",
            "https://tools.wmflabs.org/panoviewer/%23Sal%C3%B3n_de_Actos_-_Planta_2_MAM.jpg"
          ],
          "imagenes": [
            "http://www.museosdemurcia.com/museos_archivos/14/1400448312_37005092011_b4b6a6b3db_b.jpg",
            "http://www.museosdemurcia.com/museos_archivos/14/1400448416_37005114161_1ff42c96b9_b.jpg",
            "http://www.museosdemurcia.com/museos_archivos/14/1400448560_37005081181_144f76e15d_b.jpg",
            "http://www.museosdemurcia.com/museos_archivos/14/1400448705_37005078891_b09f9da487_b.jpg",
            "http://www.museosdemurcia.com/museos_archivos/14/1400448849_37005075101_5cfe367be5_b.jpg",
            "http://www.museosdemurcia.com/museos_archivos/14/1400448992_37005070021_5b6a1293e2_b.jpg",
            "http://www.museosdemurcia.com/museos_archivos/14/1400449125_37005064191_49a961db9f_b.jpg",
            "http://www.museosdemurcia.com/museos_archivos/14/1400449268_37005058801_fecb6c14dd_b.jpg",
            "http://www.museosdemurcia.com/museos_archivos/14/1400449410_37005054641_a78c9fb384_b.jpg",
            "http://www.museosdemurcia.com/museos_archivos/14/1400449549_37005051001_68696c2e42_b.jpg"
          ],
          "videos": [],
          "horarios": [
            "http://www.museosdemurcia.com/museos.inicio%3Fmuseo=museo-arqueol%F3gico-de-murcia-(mam)&id=1"
          ],
          "precios": [
            "http://www.museosdemurcia.com/museos.inicio%3Fmuseo=museo-arqueol%F3gico-de-murcia-(mam)&id=1"
          ]
        }
      ],
      "numValoraciones": 0
    }
  const [lat, lon] = restaurant.coordenadas.split(',').map(Number);

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
      <h1 className='info-restaurante-label'>Dónde estamos</h1>
      <div className="map-container">
        <MapContainer center={[lat, lon]} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lon]}>
            <Popup>
              {restaurant.nombre}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <p>Coordenadas: {restaurant.coordenadas} | Código Postal: {restaurant.codigoPostal}</p>
      <h3>Rating: <span className="rating-stars">{renderRatingStars(restaurant.calificacionMedia)} </span><span id="rating">({restaurant.calificacionMedia})</span></h3>
      <h1 className='info-restaurante-label'>Sitios</h1>
      {restaurant.sitios.map((sitio, index) => (
        <div key={index} className="sitio">
          <h2>{sitio.titulo}</h2>
          <p>{sitio.resumen}</p>
          <div className="enlacesExternos">
            {sitio.enlacesExternos.map((link, i) => <a key={i} href={link}>Link {i + 1}</a>)}
          </div>
          <div className="imagenes">
            {sitio.imagenes.map((img, i) => <img key={i} src={img} alt={sitio.titulo} />)}
          </div>
        </div>
      ))}
      <h1>Opiniones</h1>
    </div>
  );
};


export default InfoRestaurante;



