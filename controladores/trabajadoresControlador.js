const { Trabajador } = require('../modelos'); // Ajusta según tu archivo de importación
const { borrarImagen } = require('../utils/fileHelper');

module.exports = {
  // GET: Obtener todos los trabajadores
  index: async (req, res) => {
    try {
      const trabajadores = await Trabajador.findAll();
      return res.status(200).json({
        success: true,
        message: 'Lista de trabajadores obtenida correctamente',
        data: trabajadores
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al consultar trabajadores',
        data: error.message
      });
    }
  },

  // GET: Obtener trabajador por ID
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const trabajador = await Trabajador.findByPk(id);

      if (!trabajador) {
        return res.status(404).json({
          success: false,
          message: 'Trabajador no encontrado',
          data: null
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Trabajador encontrado',
        data: trabajador
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al consultar trabajador',
        data: error.message
      });
    }
  },

  // POST: Crear trabajador
  store: async (req, res) => {
    try {
      const datos = { ...req.body };

      if (req.file) {
        datos.imagen = `/uploads/trabajadores/${req.file.filename}`;
      }

      const nuevoTrabajador = await Trabajador.create(datos);

      return res.status(201).json({
        success: true,
        message: 'Trabajador registrado correctamente',
        data: nuevoTrabajador
      });
    } catch (error) {
      if (req.file) {
        borrarImagen(`/uploads/trabajadores/${req.file.filename}`);
      }
      return res.status(400).json({
        success: false,
        message: 'Error al registrar trabajador',
        data: error.message
      });
    }
  },

  // PUT: Actualizar trabajador
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const trabajador = await Trabajador.findByPk(id);

      if (!trabajador) {
        if (req.file) {
          borrarImagen(`/uploads/trabajadores/${req.file.filename}`);
        }
        return res.status(404).json({
          success: false,
          message: 'Trabajador no encontrado',
          data: null
        });
      }

      const datosActualizar = { ...req.body };

      if (req.file) {
        if (trabajador.imagen) {
          borrarImagen(trabajador.imagen);
        }
        datosActualizar.imagen = `/uploads/trabajadores/${req.file.filename}`;
      }

      await trabajador.update(datosActualizar);

      return res.status(200).json({
        success: true,
        message: 'Trabajador actualizado correctamente',
        data: trabajador
      });
    } catch (error) {
      if (req.file) {
        borrarImagen(`/uploads/trabajadores/${req.file.filename}`);
      }
      return res.status(400).json({
        success: false,
        message: 'Error al actualizar trabajador',
        data: error.message
      });
    }
  },

  // DELETE: Eliminar trabajador e imagen
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const trabajador = await Trabajador.findByPk(id);

      if (!trabajador) {
        return res.status(404).json({
          success: false,
          message: 'Trabajador no encontrado',
          data: null
        });
      }

      if (trabajador.imagen) {
        borrarImagen(trabajador.imagen);
      }

      await trabajador.destroy();

      return res.status(200).json({
        success: true,
        message: 'Trabajador e imagen eliminados correctamente',
        data: { id: parseInt(id) }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al eliminar trabajador',
        data: error.message
      });
    }
  }
};