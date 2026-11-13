const { sequelize, Pedido, DetallePedido, Producto, Cliente } = require('../modelos');

module.exports = {
  // GET: Obtener historial de todos los pedidos
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

      return res.status(200).json({
        success: true,
        message: 'Lista de pedidos obtenida correctamente',
        data: pedidos
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al consultar pedidos',
        data: error.message
      });
    }
  },

  // GET: Obtener un pedido específico por ID
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id, {
        include: [
          { model: Cliente, as: 'cliente', attributes: ['id', 'nombre', 'apellido', 'correo'] },
          { 
            model: DetallePedido, 
            as: 'detalles',
            include: [{ model: Producto, as: 'producto', attributes: ['id', 'nombre', 'precio_base'] }]
          }
        ]
      });

      if (!pedido) {
        return res.status(404).json({
          success: false,
          message: 'Pedido no encontrado',
          data: null
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Pedido obtenido correctamente',
        data: pedido
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al consultar el pedido',
        data: error.message
      });
    }
  },

  // POST: Crear un pedido completo con sus detalles mediante transacción
  store: async (req, res) => {
    const t = await sequelize.transaction();

    try {
      const { cliente_id, total, direccion_envio, estado_pedido, productos } = req.body;

      // 1. Crear la cabecera del Pedido
      const nuevoPedido = await Pedido.create({
        cliente_id,
        total,
        direccion_envio,
        estado_pedido: estado_pedido || 'Pendiente'
      }, { transaction: t });

      // 2. Mapear e insertar detalles si vienen en el body
      if (productos && Array.isArray(productos) && productos.length > 0) {
        const detallesFormateados = productos.map(item => ({
          pedido_id: nuevoPedido.id,
          producto_id: item.producto_id,
          cantidad: item.cantidad,
          precio_unitario: item.precio_unitario,
          subtotal: item.cantidad * item.precio_unitario
        }));

        await DetallePedido.bulkCreate(detallesFormateados, { transaction: t });
      }

      await t.commit();

      // Consultar el pedido recién generado con sus asociaciones para responder
      const pedidoRegistrado = await Pedido.findByPk(nuevoPedido.id, {
        include: [
          { model: Cliente, as: 'cliente', attributes: ['id', 'nombre', 'apellido', 'correo'] },
          { model: DetallePedido, as: 'detalles' }
        ]
      });

      return res.status(201).json({
        success: true,
        message: 'Pedido registrado con éxito',
        data: pedidoRegistrado
      });

    } catch (error) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'Error al registrar el pedido',
        data: error.message
      });
    }
  },

  // PUT: Actualizar un pedido (ej. estado o dirección)
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id);

      if (!pedido) {
        return res.status(404).json({
          success: false,
          message: 'Pedido no encontrado',
          data: null
        });
      }

      await pedido.update(req.body);

      return res.status(200).json({
        success: true,
        message: 'Pedido actualizado correctamente',
        data: pedido
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error al actualizar el pedido',
        data: error.message
      });
    }
  },

  // DELETE: Eliminar un pedido
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id);

      if (!pedido) {
        return res.status(404).json({
          success: false,
          message: 'Pedido no encontrado',
          data: null
        });
      }

      await pedido.destroy();

      return res.status(200).json({
        success: true,
        message: 'Pedido eliminado correctamente',
        data: { id: parseInt(id) }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al eliminar el pedido',
        data: error.message
      });
    }
  }
};