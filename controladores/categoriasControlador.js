const { Categoria, Producto } = require('../modelos');

module.exports = {
  // Listar todas las categorías
  index: async (req, res) => {
    try {
      const categorias = await Categoria.findAll();
      return res.json(categorias);
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al obtener categorías', error: error.message });
    }
  },

  // Ver una categoría con sus productos asociados
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(id, {
        include: [{ model: Producto, as: 'productos' }]
      });

      if (!categoria) {
        return res.status(404).json({ mensaje: 'Categoría no encontrada' });
      }

      return res.json(categoria);
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al consultar categoría', error: error.message });
    }
  },

  // Crear categoría
  store: async (req, res) => {
    try {
      const nuevaCategoria = await Categoria.create(req.body);
      return res.status(201).json({ mensaje: 'Categoría creada con éxito', categoria: nuevaCategoria });
    } catch (error) {
      return res.status(400).json({ mensaje: 'Error al crear categoría', error: error.message });
    }
  },

  // Actualizar categoría
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(id);

      if (!categoria) {
        return res.status(404).json({ mensaje: 'Categoría no encontrada' });
      }

      await categoria.update(req.body);
      return res.json({ mensaje: 'Categoría actualizada con éxito', categoria });
    } catch (error) {
      return res.status(400).json({ mensaje: 'Error al actualizar categoría', error: error.message });
    }
  },

  // Eliminar categoría
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(id);

      if (!categoria) {
        return res.status(404).json({ mensaje: 'Categoría no encontrada' });
      }

      await categoria.destroy();
      return res.json({ mensaje: 'Categoría eliminada' });
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al eliminar categoría', error: error.message });
    }
  }
};