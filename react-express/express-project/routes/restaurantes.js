const express = require('express');
const axios = require('axios');
const router = express.Router();
/*
router.get('/', async (req, res) => {    
  try {
    // Verifica si el token existe
    if (!req.cookies || !req.cookies.jwt) {   
        const { data } = await axios.get('http://localhost:8090/restaurantes');
        if (data && data.token) {
          // Guarda el token en una cookie segura
          res.cookie('jwt', data.token, { httpOnly: true});
          console.log('Cookie jwt: ', req.cookies.jwt);
          try {
            // Utiliza el token directamente en la segunda llamada get
            const { data } = await axios.get('http://localhost:8090/restaurantes');
            return res.json(data);
          } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'error obteniendo los restaurantes' });
          } 
        } else {
          return res.send('No se encontró el token');
        } 
    }else{
      console.log('Cookie jwt: ', req.cookies.jwt);
      const { data } = await axios.get('http://localhost:8090/restaurantes');
      return res.json(data);
    }
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'error obteniendo los restaurantes' });
  }
});

*/
/*
router.get('/', async (req, res) => {    
  try {
    let response = await axios.get('http://localhost:8080/api/restaurantes');
    //let response = await axios.get('http://localhost:8090/restaurantes');
    // Verificar el tipo de respuesta
    const contentType = response.headers['content-type'];
    console.log('Content-Type: ', contentType);

    if (contentType.includes('application/json')) {
      console.log('La respuesta es JSON');
      if (response.data && response.data.token) {
        console.log('Token: ', response.data.token);
        // Si la respuesta contiene un token, lo guarda en una cookie y realiza otra llamada GET
        res.cookie('jwt', response.data.token, { httpOnly: true });
        response = await axios.get('http://localhost:8090/restaurantes');
      }
      console.log('Cookie jwt: ', req.cookies.jwt);
      console.log('Response: ', response.data);
      res.json(response.data);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo los restaurantes' });
  }
});

*/
router.get('/', async (req, res) => {    
  try {
    let response = await axios.get('http://localhost:8080/api/restaurantes', { withCredentials: true });
    console.log('Cookie jwt: ', req.cookies.jwt);
    console.log('Response: ', response.data);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo los restaurantes' });
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
