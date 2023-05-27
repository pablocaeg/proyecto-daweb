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

async function registerIncidencia(connection, incidencia, mail, message) {
  try {
    const result = await connection.execute('INSERT INTO `Incidencias` SET `incidencia` = ?, `mail` = ?, `mensaje` = ?', [incidencia, mail, message]);
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
  } catch (error) {
    console.error('Error devolviendo las incidencias:', error);
    throw error;
  }
  return rows;
}

exports.getConnection = getConnection;
exports.registerIncidencia = registerIncidencia;
exports.getAllIncidencias = getAllIncidencias;
