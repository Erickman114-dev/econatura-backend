/*import mysql2 from 'mysql2/promise';
const mysql2 = require('mysql2/promise');

const pooldb = mysql2.createPool ({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'econatura_db',
  waitForConnection: true,
  connectionLimit: 1,
  queueLimit: 0
});


module.exports= pooldb;*/

// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'econatura_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Cambia a console.log para ver las consultas SQL generadas en consola
    define: {
      timestamps: false // Desactiva las columnas predeterminadas createdAt / updatedAt de Sequelize
    }
  }
);

module.exports = sequelize;