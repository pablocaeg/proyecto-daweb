const express = require('express');
const axios = require('axios');
const router = express.Router();

//GET restaurantes y guarda el token en una cookie segura
router.get('/', async (req, res) => {    
    if (!req.cookies || !req.cookies.jwt) {
      try {
        const { data } = await axios.get('http://localhost:8090/restaurantes');
        if (data && data.token) {
          // Guarda el token en una cookie segura
          res.cookie('jwt', data.token, { httpOnly: true});  
          res.send('Token recibido y almacenado en una cookie segura');
        } else {
          res.send('No se encontró el token');
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'error obteniendo el token' });
      }
    }  
      try {
        const { data } = await axios.get('http://localhost:8090/restaurantes');
        res.json(data);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'error obteniendo los restaurantes' });
      }
});

// GET Restaurante por id
router.get('/:id', async (req, res) => {
  try {
    const { data } = await axios.get(`http://localhost:8090/restaurantes/${req.params.id}`);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error obteniendo los restaurantes' });
  }
});

// Handle POST request
router.post('/', async (req, res) => {
  try {
    // Verifica si el token existe
    if (!req.cookies || !req.cookies.jwt) {
      // Si el token no existe, envía un error
      return res.status(401).json({ error: 'Token no disponible' });
    }
    const newRestaurant = req.body;
    const { data } = await axios.post('http://localhost:8080/api/restaurantes', newRestaurant, {
      headers: { 'Authorization': 'Bearer ' + req.cookies.jwt }
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error añadiendo un restaurante' });
  }
});



// Actualiza un restaurante
router.put('/:id', async (req, res) => {
  try {
    if (!req.cookies || !req.cookies.jwt) {
      return res.status(401).json({ error: 'Token no disponible' });
    }
    const updatedRestaurant = req.body;
    const { data } = await axios({
      method: 'put',
      url: `http://localhost:8090/restaurantes/${req.params.id}`,
      data: updatedRestaurant,
      headers: { 'Authorization': 'Bearer ' + req.cookies.jwt }
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: ' Error actualizando un restaurante' });
  }
});

// Borra un restaurante
router.delete('/:id', async (req, res) => {
  try {
    if (!req.cookies || !req.cookies.jwt) {
      return res.status(401).json({ error: 'Token no disponible' });
    }
    const { data } = await axios({
      method: 'delete',
      url: `http://localhost:8090/restaurantes/${req.params.id}`,
      headers: { 'Authorization': 'Bearer ' + req.cookies.jwt }
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: ' Error borrando un restaurante' });
  }
});


module.exports = router;
