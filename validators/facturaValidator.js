const { body } = require('express-validator');

const validarFacturaStore = [
  body('pedido_id')
    .notEmpty().withMessage('El pedido_id es obligatorio')
    .isInt({ min: 1 }).withMessage('El pedido_id debe ser un número entero positivo')
    .toInt(),

  body('monto_total')
    .notEmpty().withMessage('El monto total es obligatorio')
    .isFloat({ min: 0 }).withMessage('El monto total debe ser mayor o igual a 0')
    .toFloat(),

  body('rfc_cliente')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 20 }).withMessage('El RFC no debe superar los 20 caracteres')
    .toUpperCase(),

  body('razon_social')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 200 }).withMessage('La razón social no debe superar los 200 caracteres')
    .escape(),

  body('estado_factura')
    .optional()
    .isIn(['Emitida', 'Pagada', 'Cancelada']).withMessage('Estado de factura inválido')
];

const validarFacturaUpdate = [
  body('pedido_id')
    .optional()
    .isInt({ min: 1 }).withMessage('El pedido_id debe ser un número entero positivo')
    .toInt(),

  body('monto_total')
    .optional()
    .isFloat({ min: 0 }).withMessage('El monto total debe ser mayor o igual a 0')
    .toFloat(),

  body('rfc_cliente')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 20 }).withMessage('El RFC no debe superar los 20 caracteres')
    .toUpperCase(),

  body('razon_social')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 200 }).withMessage('La razón social no debe superar los 200 caracteres')
    .escape(),

  body('estado_factura')
    .optional()
    .isIn(['Emitida', 'Pagada', 'Cancelada']).withMessage('Estado de factura inválido')
];

module.exports = {
  validarFacturaStore,
  validarFacturaUpdate
};