const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta a tu conexión de Sequelize

const ProductoImagen = sequelize.define('ProductoImagen', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ruta_imagen: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'producto_imagenes',
  timestamps: true
});

module.exports = ProductoImagen;