const { Producto, Categoria, ProductoImagen } = require('../modelos');
const { borrarImagen } = require('../utils/fileHelper');

module.exports = {
  // Obtener todos los productos con su categoría e imágenes
  index: async (req, res) => {
    try {
      const productos = await Producto.findAll({
        include: [
          { model: ProductoImagen, as: 'imagenes', attributes: ['id', 'ruta_imagen'] },
          { model: Categoria, as: 'categoria' }
        ]
      });
      return res.status(200).json({
        success: true,
        message: 'Lista de productos obtenida correctamente',
        data: productos
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al consultar productos',
        data: error.message
      });
    }
  },

  // Obtener producto por ID
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Producto.findByPk(id, {
        include: [
          { model: ProductoImagen, as: 'imagenes', attributes: ['id', 'ruta_imagen'] },
          { model: Categoria, as: 'categoria' }
        ]
      });

      if (!producto) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado',
          data: null
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Producto encontrado',
        data: producto
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al consultar producto',
        data: error.message
      });
    }
  },

  // Crear producto
store: async (req, res) => {
  try {
    // 1. Crear producto con los datos del body (nombre, precio_base, categoria_id, etc.)
    const nuevoProducto = await Producto.create(req.body);

    // 2. Insertar las imágenes en la tabla relacional
    if (req.files && req.files.length > 0) {
      const registrosImagenes = req.files.map(file => ({
        ruta_imagen: `/uploads/productos/${file.filename}`,
        producto_id: nuevoProducto.id
      }));

      await ProductoImagen.bulkCreate(registrosImagenes);
    }

    // 3. Responder con el producto y su arreglo de imágenes
    const productoCompleto = await Producto.findByPk(nuevoProducto.id, {
      include: [{ model: ProductoImagen, as: 'imagenes', attributes: ['id', 'ruta_imagen'] }]
    });

    return res.status(201).json({
      success: true,
      message: 'Producto e imágenes guardados correctamente',
      data: productoCompleto
    });
  } catch (error) {
    if (req.files) {
      req.files.forEach(file => borrarImagen(`/uploads/productos/${file.filename}`));
    }
    return res.status(400).json({
      success: false,
      message: 'Error al registrar el producto',
      data: error.message
    });
  }
},

  // Actualizar producto
  update: async (req, res) => {
    try {
      const { id } = req.params;

      // 1. Obtener el producto junto con sus imágenes actuales ordenadas
      const producto = await Producto.findByPk(id, {
        include: [{ 
          model: ProductoImagen, 
          as: 'imagenes',
          order: [['id', 'ASC']] // Garantiza mantener el orden cronológico
        }]
      });

      if (!producto) {
        if (req.files && req.files.length > 0) {
          req.files.forEach(file => borrarImagen(`/uploads/productos/${file.filename}`));
        }
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado',
          data: null
        });
      }

      // 2. Actualizar los campos de texto del producto
      await producto.update(req.body);

      // 3. Reemplazar imágenes posicionalmente
      if (req.files && req.files.length > 0) {
        const imagenesExistentes = producto.imagenes || [];

        for (let i = 0; i < req.files.length; i++) {
          const nuevaRuta = `/uploads/productos/${req.files[i].filename}`;

          if (imagenesExistentes[i]) {
            // Reemplaza la imagen guardada en la posición 'i'
            borrarImagen(imagenesExistentes[i].ruta_imagen); // Elimina archivo antiguo
            await imagenesExistentes[i].update({ ruta_imagen: nuevaRuta });
          } else {
            // Si se envían más imágenes de las que existían previamente, se agrega un nuevo registro
            await ProductoImagen.create({
              ruta_imagen: nuevaRuta,
              producto_id: producto.id
            });
          }
        }
      }

      // 4. Consultar el producto actualizado con sus imágenes finales
      const productoActualizado = await Producto.findByPk(id, {
        include: [{ model: ProductoImagen, as: 'imagenes', attributes: ['id', 'ruta_imagen'] }]
      });

      return res.status(200).json({
        success: true,
        message: 'Producto e imágenes actualizados correctamente',
        data: productoActualizado
      });

    } catch (error) {
      if (req.files && req.files.length > 0) {
        req.files.forEach(file => borrarImagen(`/uploads/productos/${file.filename}`));
      }
      return res.status(400).json({
        success: false,
        message: 'Error al actualizar el producto',
        data: error.message
      });
    }
  },

  // Eliminar producto
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Producto.findByPk(id, {
        include: [{ model: ProductoImagen, as: 'imagenes' }]
      });

      if (!producto) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado',
          data: null
        });
      }

      // Eliminar archivos físicos de imagen antes de borrar el registro
      if (producto.imagenes && producto.imagenes.length > 0) {
        producto.imagenes.forEach(img => borrarImagen(img.ruta_imagen));
      }

      await producto.destroy();

      return res.status(200).json({
        success: true,
        message: 'Producto e imágenes eliminados correctamente',
        data: { id: parseInt(id) }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al eliminar producto',
        data: error.message
      });
    }
  }
};