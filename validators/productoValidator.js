const { body } = require('express-validator');

const validarProductoStore = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre del producto es obligatorio')
    .isLength({ min: 2, max: 150 }).withMessage('El nombre debe tener entre 2 y 150 caracteres')
    .escape(),

  body('descripcion')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),

  body('precio_base')
    .notEmpty().withMessage('El precio base es obligatorio')
    .isFloat({ min: 1 }).withMessage('El precio base debe ser un número decimal mayor a 0')
    .toFloat(),

  body('stock')
    .optional()
    .isInt({ min: 1 }).withMessage('El stock debe ser un número entero mayor a 0')
    .toInt(),

  body('categoria_id')
    .notEmpty().withMessage('El ID de la categoría es obligatorio')
    .isInt({ min: 1 }).withMessage('La categoría debe ser un número entero positivo')
    .toInt(),
  body('estado')
    .optional()
    .isIn(['ACTIVO', 'INACTIVO']).withMessage('El estado debe ser ACTIVO o INACTIVO'),

    body('imagenes')
    .custom((value, { req }) => {
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        throw new Error('Debe subir al menos una imagen para registrar el producto');
      }
      if (req.files.length > 3) {
        throw new Error('No se permite subir más de 3 imágenes por producto');
      }
      return true;
    })
];

const validarProductoUpdate = [
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2, max: 150 }).withMessage('El nombre debe tener entre 2 y 150 caracteres')
    .escape(),

  body('descripcion')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),

  body('precio_base')
    .optional()
    .isFloat({ min: 1 }).withMessage('El precio base debe ser un número decimal mayor a 0')
    .toFloat(),

  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0')
    .toInt(),

  body('categoria_id')
    .optional()
    .isInt({ min: 1 }).withMessage('La categoría debe ser un número entero positivo')
    .toInt(),
  body('estado')
    .optional()
    .isIn(['ACTIVO', 'INACTIVO']).withMessage('El estado debe ser ACTIVO o INACTIVO'),
    
    body('imagenes')
    .custom((value, { req }) => {
      if (req.files && Array.isArray(req.files) && req.files.length > 3) {
        throw new Error('No se permite subir más de 3 imágenes por producto');
      }
      return true;
    })
];

module.exports = {
  validarProductoStore,
  validarProductoUpdate
};