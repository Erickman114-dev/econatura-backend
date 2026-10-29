const { Producto, Categoria } = require('../modelos');

module.exports = {
  // Obtener todos los productos con su categoría
  index: async (req, res) => {
    try {
      const productos = await Producto.findAll({
        include: [{ model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] }]
      });
      return res.json(productos);
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al listar productos', error: error.message });
    }
  },

  // Obtener producto por ID
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Producto.findByPk(id, {
        include: [{ model: Categoria, as: 'categoria' }]
      });

      if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }

      return res.json(producto);
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al consultar producto', error: error.message });
    }
  },

  // Crear producto
  store: async (req, res) => {
    try {
      const nuevoProducto = await Producto.create(req.body);
      return res.status(201).json({ mensaje: 'Producto registrado correctamente', producto: nuevoProducto });
    } catch (error) {
      return res.status(400).json({ mensaje: 'Error al crear producto', error: error.message });
    }
  },

  // Actualizar producto
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Producto.findByPk(id);

      if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }

      await producto.update(req.body);
      return res.json({ mensaje: 'Producto actualizado', producto });
    } catch (error) {
      return res.status(400).json({ mensaje: 'Error al actualizar producto', error: error.message });
    }
  },

  // Eliminar producto
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Producto.findByPk(id);

      if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }

      await producto.destroy();
      return res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al eliminar producto', error: error.message });
    }
  }
};