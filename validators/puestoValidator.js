const { body } = require('express-validator');

const validarPuestoStore = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre del puesto es obligatorio')
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

const validarPuestoUpdate = [
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
  validarPuestoStore,
  validarPuestoUpdate
};