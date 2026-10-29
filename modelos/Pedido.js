const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clientes',
      key: 'id'
    }
  },
  fecha_pedido: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estado_pedido: {
    type: DataTypes.ENUM('Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'),
    defaultValue: 'Pendiente'
  },
  direccion_envio: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'pedidos',
  timestamps: false
});

module.exports = Pedido;