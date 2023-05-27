var express = require('express');
var router = express.Router();
var helper_mysql = require('../javascripts/helper-database');

/* POST incidencia . */
router.post('/register', async function(req, res, next) {
  let con;
  try {
    const { incidencia, mail, message } = req.body;
    con = await helper_mysql.getConnection();
    const result = await helper_mysql.registerIncidencia(con, incidencia, mail, message);
    
    if (result[0].affectedRows > 0) {
      res.send('Incidencia registrada');
    } else {
      res.send('Error al registrar la incidencia');
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al registrar la incidencia');
  } finally {
    if (con) {
      con.end();
    }
  }
});

/* GET incidencias */
router.get('/all', async function(req, res, next) {
  let con;
  try {
    con = await helper_mysql.getConnection();
    const data = await helper_mysql.getAllIncidencias(con);

    res.render('incidencias', { 'title' : 'Lista de incidencias', 'incidencias' : data });

  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener las incidencias');
  } finally {
    if (con) {
      con.end();
    }
  }
});
/* GET formulario-incidencias */
router.get('/', function(req, res, next) {
  res.render('formulario_incidencias', { title: 'formulario incidencias'});
});
module.exports = router;


