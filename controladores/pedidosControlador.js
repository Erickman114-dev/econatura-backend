const { sequelize, Pedido, DetallePedido, Producto, Cliente } = require('../modelos');

module.exports = {
  // Obtener historial de pedidos
  index: async (req, res) => {
    try {
      const pedidos = await Pedido.findAll({
        include: [
          { model: Cliente, as: 'cliente', attributes: ['id', 'nombre', 'apellido', 'correo'] },
          { 
            model: DetallePedido, 
            as: 'detalles',
            include: [{ model: Producto, as: 'producto', attributes: ['id', 'nombre', 'precio_base'] }]
          }
        ]
      });
      return res.json(pedidos);
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al consultar pedidos', error: error.message });
    }
  },

  // Crear un pedido completo (Orden + Detalles de productos)
  store: async (req, res) => {
    // Iniciar transacción de base de datos
    const t = await sequelize.transaction();

    try {
      const { cliente_id, total, direccion_envio, productos } = req.body;
      // 'productos' debe ser un arreglo: [{ producto_id: 1, cantidad: 2, precio_unitario: 450.00 }]

      // 1. Crear el Pedido
      const nuevoPedido = await Pedido.create({
        cliente_id,
        total,
        direccion_envio
      }, { transaction: t });

      // 2. Mapear y preparar los detalles con el pedido_id generado
      const detallesFormateados = productos.map(item => ({
        pedido_id: nuevoPedido.id,
        producto_id: item.producto_id,
        cantidad: item.cantidad,
        precio_unitario: item.precio_unitario,
        subtotal: item.cantidad * item.precio_unitario
      }));

      // 3. Insertar todos los detalles en lote (bulkCreate)
      await DetallePedido.bulkCreate(detallesFormateados, { transaction: t });

      // Si todo sale bien, se confirman los cambios
      await t.commit();

      return res.status(201).json({
        mensaje: 'Pedido registrado con éxito',
        pedido_id: nuevoPedido.id
      });

    } catch (error) {
      // Si ocurre un error, se revierten las inserciones
      await t.rollback();
      return res.status(400).json({ mensaje: 'Error al registrar el pedido', error: error.message });
    }
  }
};