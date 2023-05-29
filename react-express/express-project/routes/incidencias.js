var express = require('express');
var router = express.Router();
var helper_mysql = require('../javascripts/helper-database');

/* POST incidencia . */
router.post('/register', async function(req, res, next) {
  let con;
  try {
   
    const { incidencia, mail, message, restaurante } = req.body;
    con = await helper_mysql.getConnection();
    const result = await helper_mysql.registerIncidencia(con, incidencia, mail, message, restaurante);
    
    if (result[0].affectedRows > 0) {
      res.render('incidencia_registrada', { 'title' : 'Respuesta registro incidencia', 'message' : 'Incidencia registrada' });
    } else {
      res.render('incidencia_registrada', { 'title' : 'Respuesta registro incidencia', 'message' : 'Error al registrar la incidencia' });
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
    console.log('Establecemos conexion');
    con = await helper_mysql.getConnection();
    console.log('Recuperamos incidencias');
    const data = await helper_mysql.getAllIncidencias(con);
    console.log("Incidencias recuperadas: " + data)
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
  console.log(req.query);
  const { incidencia, restaurante } = req.query;
  console.log("Incidencia:", incidencia, "Restaurante:", restaurante); // imprime: Paella LaBodeguita http://localhost:3000/incidencias?incidencia=Paella&restaurante=LaBodeguita
  res.render('formulario_incidencias', { title: 'formulario incidencias', incidencia: incidencia, restaurante:restaurante });
});
module.exports = router;



