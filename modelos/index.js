const sequelize = require('../config/database');

const Puesto = require('./Puesto');
const Trabajador = require('./Trabajador');
const Categoria = require('./Categoria');
const Producto = require('./Producto');
const Cliente = require('./Cliente');
const Pedido = require('./Pedido');
const DetallePedido = require('./DetallePedido');
const Factura = require('./Factura');
const ProductoImagen = require('./ProductoImagen');

// Relación Puestos <-> Trabajadores
Puesto.hasMany(Trabajador, { foreignKey: 'puesto_id', as: 'trabajadores' });
Trabajador.belongsTo(Puesto, { foreignKey: 'puesto_id', as: 'puesto' });

// Relación Categorias <-> Productos
Categoria.hasMany(Producto, { foreignKey: 'categoria_id', as: 'productos' });
Producto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });

// Relación Clientes <-> Pedidos
Cliente.hasMany(Pedido, { foreignKey: 'cliente_id', as: 'pedidos' });
Pedido.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });

// Relación Pedidos <-> Detalles
Pedido.hasMany(DetallePedido, { foreignKey: 'pedido_id', as: 'detalles' });
DetallePedido.belongsTo(Pedido, { foreignKey: 'pedido_id', as: 'pedido' });

// Relación Productos <-> Detalles
Producto.hasMany(DetallePedido, { foreignKey: 'producto_id', as: 'detalles' });
DetallePedido.belongsTo(Producto, { foreignKey: 'producto_id', as: 'producto' });

// Relación Pedidos <-> Factura
Pedido.hasOne(Factura, { foreignKey: 'pedido_id', as: 'factura' });
Factura.belongsTo(Pedido, { foreignKey: 'pedido_id', as: 'pedido' });

Producto.hasMany(ProductoImagen, {
  foreignKey: 'producto_id',
  as: 'imagenes',
  onDelete: 'CASCADE'
});

// Una imagen pertenece a un solo Producto
ProductoImagen.belongsTo(Producto, {
  foreignKey: 'producto_id',
  as: 'producto'
});

module.exports = {
  sequelize,
  Puesto,
  Trabajador,
  Categoria,
  Producto,
  Cliente,
  Pedido,
  DetallePedido,
  Factura,
  ProductoImagen
};