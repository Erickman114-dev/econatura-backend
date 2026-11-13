const { validationResult } = require('express-validator');
const { borrarImagen } = require('../utils/fileHelper');

const validarCampos = (req, res, next) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    // Si se subió un archivo individual y la validación de texto falló, se elimina del servidor
    if (req.file) {
      borrarImagen(`/uploads/${req.file.destination.split('/').pop()}/${req.file.filename}`);
    }

    // Si se subieron múltiples archivos, se eliminan todos
    if (req.files && Array.isArray(req.files)) {
      req.files.forEach(file => {
        borrarImagen(`/uploads/${file.destination.split('/').pop()}/${file.filename}`);
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Error de validación en la petición',
      data: errores.array().map(err => ({
        campo: err.path,
        mensaje: err.msg
      }))
    });
  }

  next();
};

module.exports = validarCampos;