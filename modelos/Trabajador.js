const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs'); // 1. Importar bcryptjs aquí

const Trabajador = sequelize.define('Trabajador', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  puesto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'puestos', key: 'id' }
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(20)
  },
  imagen: {
    type: DataTypes.STRING(500)
  },
  estado: {
    type: DataTypes.ENUM('ACTIVO', 'INACTIVO'),
    defaultValue: 'ACTIVO'
  }
}, {
  tableName: 'trabajadores',
  timestamps: false,
  // 2. AGREGAR ESTOS HOOKS
  hooks: {
    // Se ejecuta antes de crear un nuevo trabajador
    beforeCreate: async (trabajador) => {
      if (trabajador.contrasena) {
        const salt = await bcrypt.genSalt(10);
        trabajador.contrasena = await bcrypt.hash(trabajador.contrasena, salt);
      }
    },
    // Se ejecuta antes de actualizar un trabajador (si cambia la contraseña)
    beforeUpdate: async (trabajador) => {
      if (trabajador.changed('contrasena')) {
        const salt = await bcrypt.genSalt(10);
        trabajador.contrasena = await bcrypt.hash(trabajador.contrasena, salt);
      }
    }
  }
});

module.exports = Trabajador;