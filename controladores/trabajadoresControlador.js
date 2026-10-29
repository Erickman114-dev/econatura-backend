const { Trabajador, Puesto } = require('../modelos');

module.exports = {
  // Obtener todos los trabajadores con su puesto
  index: async (req, res) => {
    try {
      const trabajadores = await Trabajador.findAll({
        include: [{ model: Puesto, as: 'puesto', attributes: ['id', 'nombre'] }],
        attributes: { exclude: ['contrasena'] } // Omite la contraseña en la respuesta
      });
      return res.json(trabajadores);
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al obtener trabajadores', error: error.message });
    }
  },

  // Obtener un trabajador por ID
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const trabajador = await Trabajador.findByPk(id, {
        include: [{ model: Puesto, as: 'puesto' }],
        attributes: { exclude: ['contrasena'] }
      });

      if (!trabajador) {
        return res.status(404).json({ mensaje: 'Trabajador no encontrado' });
      }

      return res.json(trabajador);
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al obtener el trabajador', error: error.message });
    }
  },

  // Crear un nuevo trabajador
  store: async (req, res) => {
    try {
      const nuevoTrabajador = await Trabajador.create(req.body);
      
      // Convertimos a JSON y eliminamos la contraseña de la respuesta visual
      const respuesta = nuevoTrabajador.toJSON();
      delete respuesta.contrasena;

      return res.status(201).json({
        mensaje: 'Trabajador añadido con éxito',
        trabajador: respuesta
      });
    } catch (error) {
      return res.status(400).json({ mensaje: 'Error al crear trabajador', error: error.message });
    }
  },

  // Actualizar un trabajador
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const trabajador = await Trabajador.findByPk(id);

      if (!trabajador) {
        return res.status(404).json({ mensaje: 'Trabajador no encontrado' });
      }

      await trabajador.update(req.body);

      return res.json({ mensaje: 'Trabajador actualizado correctamente', trabajador });
    } catch (error) {
      return res.status(400).json({ mensaje: 'Error al actualizar trabajador', error: error.message });
    }
  },

  // Eliminar un trabajador
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const trabajador = await Trabajador.findByPk(id);

      if (!trabajador) {
        return res.status(404).json({ mensaje: 'Trabajador no encontrado' });
      }

      await trabajador.destroy();
      return res.json({ mensaje: 'Trabajador eliminado con éxito' });
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al eliminar trabajador', error: error.message });
    }
  }
};