const { Cliente, Pedido } = require('../modelos');

module.exports = {
  // Obtener todos los clientes (Panel Admin)
  index: async (req, res) => {
    try {
      const clientes = await Cliente.findAll({
        attributes: { exclude: ['contrasena'] }
      });
      return res.json(clientes);
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al consultar clientes', error: error.message });
    }
  },

  // Perfil / Obtener cliente por ID
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id, {
        attributes: { exclude: ['contrasena'] },
        include: [{ model: Pedido, as: 'pedidos' }]
      });

      if (!cliente) {
        return res.status(404).json({ mensaje: 'Cliente no encontrado' });
      }

      return res.json(cliente);
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al obtener cliente', error: error.message });
    }
  },

  // Registro de nuevo cliente
  store: async (req, res) => {
    try {
      const nuevoCliente = await Cliente.create(req.body);
      
      const respuesta = nuevoCliente.toJSON();
      delete respuesta.contrasena;

      return res.status(201).json({
        mensaje: 'Cliente registrado con éxito',
        cliente: respuesta
      });
    } catch (error) {
      return res.status(400).json({ mensaje: 'Error al registrar cliente', error: error.message });
    }
  },

  // Actualizar datos del cliente
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id);

      if (!cliente) {
        return res.status(404).json({ mensaje: 'Cliente no encontrado' });
      }

      await cliente.update(req.body);
      return res.json({ mensaje: 'Cliente actualizado correctamente', cliente });
    } catch (error) {
      return res.status(400).json({ mensaje: 'Error al actualizar cliente', error: error.message });
    }
  },

  // Dar de baja o eliminar cliente
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id);

      if (!cliente) {
        return res.status(404).json({ mensaje: 'Cliente no encontrado' });
      }

      await cliente.destroy();
      return res.json({ mensaje: 'Cliente eliminado correctamente' });
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al eliminar cliente', error: error.message });
    }
  }
};