const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Factura = sequelize.define('Factura', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pedido_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'pedidos',
      key: 'id'
    }
  },
  fecha_emision: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  monto_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  rfc_cliente: {
    type: DataTypes.STRING(20)
  },
  razon_social: {
    type: DataTypes.STRING(200)
  },
  estado_factura: {
    type: DataTypes.ENUM('Emitida', 'Pagada', 'Cancelada'),
    defaultValue: 'Emitida'
  }
}, {
  tableName: 'facturas',
  timestamps: false
});

module.exports = Factura;