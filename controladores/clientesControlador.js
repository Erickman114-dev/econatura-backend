const { Cliente, Pedido } = require('../modelos');


module.exports = {
  // GET: Obtener todos los clientes
  index: async (req, res) => {
    try {
      const clientes = await Cliente.findAll({
        attributes: { exclude: ['contrasena'] } // Por seguridad no devolvemos la contraseña
      });

      return res.status(200).json({
        success: true,
        message: 'Lista de clientes obtenida correctamente',
        data: clientes
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al consultar clientes',
        data: error.message
      });
    }
  },

  // GET: Obtener cliente por ID
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id, {
        attributes: { exclude: ['contrasena'] }
      });

      if (!cliente) {
        return res.status(404).json({
          success: false,
          message: 'Cliente no encontrado',
          data: null
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Cliente obtenido correctamente',
        data: cliente
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener el cliente',
        data: error.message
      });
    }
  },

  // POST: Crear cliente
  store: async (req, res) => {
    try {
      const nuevoCliente = await Cliente.create(req.body);
      const clienteRespuesta = nuevoCliente.toJSON();
      delete clienteRespuesta.contrasena;

      return res.status(201).json({
        success: true,
        message: 'Cliente registrado con éxito',
        data: clienteRespuesta
      });
    } catch (error) {
      // Manejo específico de correo duplicado o errores de modelo Sequelize
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
          success: false,
          message: 'El correo electrónico ya se encuentra registrado',
          data: error.errors.map(e => ({ campo: e.path, mensaje: e.message }))
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Error al registrar el cliente',
        data: error.errors ? error.errors.map(e => e.message) : error.message
      });
    }
  },

  // PUT: Actualizar cliente
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id);

      if (!cliente) {
        return res.status(404).json({
          success: false,
          message: 'Cliente no encontrado',
          data: null
        });
      }

      await cliente.update(req.body);

      const clienteRespuesta = cliente.toJSON();
      delete clienteRespuesta.contrasena;

      return res.status(200).json({
        success: true,
        message: 'Cliente actualizado correctamente',
        data: clienteRespuesta
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
          success: false,
          message: 'El correo electrónico ya está en uso por otro cliente',
          data: error.errors.map(e => ({ campo: e.path, mensaje: e.message }))
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Error al actualizar el cliente',
        data: error.errors ? error.errors.map(e => e.message) : error.message
      });
    }
  },

  // DELETE: Eliminar cliente
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id);

      if (!cliente) {
        return res.status(404).json({
          success: false,
          message: 'Cliente no encontrado',
          data: null
        });
      }

      await cliente.destroy();

      return res.status(200).json({
        success: true,
        message: 'Cliente eliminado correctamente',
        data: { id: parseInt(id) }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al eliminar el cliente',
        data: error.message
      });
    }
  }
};