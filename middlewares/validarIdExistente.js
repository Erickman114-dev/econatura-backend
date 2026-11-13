const { param, validationResult } = require('express-validator');

// 1. Validar que el parámetro ID sea entero positivo
const validarIdParam = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo')
    .toInt(),
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'El parámetro ID ingresado no es válido',
        data: errores.array().map(err => ({ campo: err.path, mensaje: err.msg }))
      });
    }
    next();
  }
];

// 2. Middleware dinámico para verificar la existencia del registro en MySQL
const verificarExistencia = (Modelo) => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const registro = await Modelo.findByPk(id);

      if (!registro) {
        // Limpiar imágenes subidas si la entidad no existe
        if (req.file) {
          borrarImagen(`/uploads/${req.file.destination.split('/').pop()}/${req.file.filename}`);
        }
        if (req.files && Array.isArray(req.files)) {
          req.files.forEach(file => borrarImagen(`/uploads/${file.destination.split('/').pop()}/${file.filename}`));
        }

        return res.status(404).json({
          success: false,
          message: 'Registro no encontrado',
          data: null
        });
      }

      // Se adjunta el registro a req para reutilizarlo en el controlador si es necesario
      req.registroExistente = registro;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error de servidor al verificar la existencia del registro',
        data: error.message
      });
    }
  };
};

module.exports = {
  validarIdParam,
  verificarExistencia
};