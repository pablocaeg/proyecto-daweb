const mysql = require('mysql2/promise');

async function getConnection() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: 'db4free.net',
      user: 'retrovo',
      password: 'misintaxis',
      database: 'daweb_bbdd'
    });
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
    throw error;
  }
  return connection;
}
/*
async function registerIncidencia(connection, incidencia, mail, message, restaurante) {
  try {
    const result = await connection.execute('INSERT INTO `Incidencias` SET `incidencia` = ?, `mail` = ?, `mensaje` = ?, `restaurante` = ?', [incidencia, mail, message, restaurante]);
    return result;
  } catch (error) {
    console.error('Error registrando incidencia:', error);
    throw error;
  }
}
*/
async function registerIncidencia(connection, incidencia, mail, message, restaurante) {
  try {
    const result = await connection.execute('INSERT INTO `Incidencias` (`incidencia`, `mail`, `mensaje`, `restaurante`, `fecha_apertura`) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)', [incidencia, mail, message, restaurante]);
    return result;
  } catch (error) {
    console.error('Error registrando incidencia:', error);
    throw error;
  }
}

async function getAllIncidencias(connection) {
  let rows;
  try {
    const results = await connection.execute('SELECT * FROM `Incidencias`');
    rows = results[0];
    resultado =  JSON.stringify(rows, null, 2);
    console.log("Incidencias recuperadas: " + resultado);
  } catch (error) {
    console.error('Error devolviendo las incidencias:', error);
    throw error;
  }
  return rows;
}

async function getIncidenciasByRestaurant(connection, restaurantName) {
  let rows;
  try {
    const results = await connection.execute('SELECT * FROM `Incidencias` WHERE `restaurante` = ? ORDER BY `fecha_apertura` DESC', [restaurantName]);
    rows = results[0];
    resultado =  JSON.stringify(rows, null, 2);
    console.log("Incidencias recuperadas: " + resultado);
  } catch (error) {
    console.error('Error devolviendo las incidencias:', error);
    throw error;
  }
  return rows;
}

exports.getIncidenciasByRestaurant = getIncidenciasByRestaurant;
exports.getConnection = getConnection;
exports.registerIncidencia = registerIncidencia;
exports.getAllIncidencias = getAllIncidencias;
