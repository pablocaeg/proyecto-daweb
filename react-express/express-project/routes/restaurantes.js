const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { data } = await axios.get('http://localhost:8080/api/restaurantes');
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching restaurant data' });
  }
});

module.exports = router;
