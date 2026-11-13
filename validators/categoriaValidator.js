const { body } = require('express-validator');

const validarCategoriaStore = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre de la categoría es obligatorio')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .escape(),

  body('descripcion')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),

  body('estado')
    .optional()
    .isIn(['ACTIVO', 'INACTIVO']).withMessage('El estado debe ser ACTIVO o INACTIVO')
];

const validarCategoriaUpdate = [
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .escape(),

  body('descripcion')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),

  body('estado')
    .optional()
    .isIn(['ACTIVO', 'INACTIVO']).withMessage('El estado debe ser ACTIVO o INACTIVO')
];

module.exports = {
  validarCategoriaStore,
  validarCategoriaUpdate
};