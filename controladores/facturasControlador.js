const { Factura, Pedido, Cliente } = require('../modelos');

module.exports = {
  // Listar todas las facturas emitidas
  index: async (req, res) => {
    try {
      const facturas = await Factura.findAll({
        include: [{
          model: Pedido,
          as: 'pedido',
          include: [{ model: Cliente, as: 'cliente', attributes: ['id', 'nombre', 'correo'] }]
        }]
      });
      return res.json(facturas);
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al obtener facturas', error: error.message });
    }
  },

  // Ver detalle de una factura por ID
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const factura = await Factura.findByPk(id, {
        include: [{ model: Pedido, as: 'pedido' }]
      });

      if (!factura) {
        return res.status(404).json({ mensaje: 'Factura no encontrada' });
      }

      return res.json(factura);
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al obtener factura', error: error.message });
    }
  },

  // Generar nueva factura para un pedido
  store: async (req, res) => {
    try {
      const nuevaFactura = await Factura.create(req.body);
      return res.status(201).json({ mensaje: 'Factura emitida con éxito', factura: nuevaFactura });
    } catch (error) {
      return res.status(400).json({ mensaje: 'Error al generar factura', error: error.message });
    }
  },

  // Actualizar estado de factura (Ej. 'Pagada' o 'Cancelada')
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const factura = await Factura.findByPk(id);

      if (!factura) {
        return res.status(404).json({ mensaje: 'Factura no encontrada' });
      }

      await factura.update(req.body);
      return res.json({ mensaje: 'Factura actualizada correctamente', factura });
    } catch (error) {
      return res.status(400).json({ mensaje: 'Error al actualizar factura', error: error.message });
    }
  }
};