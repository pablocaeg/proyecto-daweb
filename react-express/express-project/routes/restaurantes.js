const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { data } = await axios.get('http://localhost:8080/api/restaurantes');
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error obteniendo los restaurantes' });
  }
});

// GET Restaurant
router.get('/:id', async (req, res) => {
  try {
    const { data } = await axios.get(`http://localhost:8080/api/restaurantes/${req.params.id}`);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error obteniendo los restaurantes' });
  }
});

// Handle POST request
router.post('/', async (req, res) => {
  try {
    const newRestaurant = req.body;
    const { data } = await axios.post('http://localhost:8080/api/restaurantes', newRestaurant);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: ' error añadiendo un restaurante' });
  }
});

// Handle PUT request
router.put('/:id', async (req, res) => {
  try {
    const updatedRestaurant = req.body;
    const { data } = await axios.put(`http://localhost:8080/api/restaurantes/${req.params.id}`, updatedRestaurant);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: ' Error actualizando un restaurante' });
  }
});

// Handle DELETE request
router.delete('/:id', async (req, res) => {
  try {
    const { data } = await axios.delete(`http://localhost:8080/api/restaurantes/${req.params.id}`);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: ' Error borrando un restaurante' });
  }
});

module.exports = router;
