const { Puesto } = require('../modelos');

module.exports = {
  index: async (req, res) => {
    try {
      const puestos = await Puesto.findAll();
      return res.json(puestos);
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al consultar puestos', error: error.message });
    }
  },

  show: async (req, res) => {
    try {
      const { id } = req.params;
      const puesto = await Puesto.findByPk(id);

      if (!puesto) {
        return res.status(404).json({ mensaje: 'Puesto no encontrado' });
      }

      return res.json(puesto);
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al obtener puesto', error: error.message });
    }
  },

  store: async (req, res) => {
    try {
      const nuevoPuesto = await Puesto.create(req.body);
      return res.status(201).json({ mensaje: 'Puesto creado con éxito', puesto: nuevoPuesto });
    } catch (error) {
      return res.status(400).json({ mensaje: 'Error al registrar puesto', error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const puesto = await Puesto.findByPk(id);

      if (!puesto) {
        return res.status(404).json({ mensaje: 'Puesto no encontrado' });
      }

      await puesto.update(req.body);
      return res.json({ mensaje: 'Puesto actualizado correctamente', puesto });
    } catch (error) {
      return res.status(400).json({ mensaje: 'Error al actualizar puesto', error: error.message });
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const puesto = await Puesto.findByPk(id);

      if (!puesto) {
        return res.status(404).json({ mensaje: 'Puesto no encontrado' });
      }

      await puesto.destroy();
      return res.json({ mensaje: 'Puesto eliminado' });
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al eliminar puesto', error: error.message });
    }
  }
};