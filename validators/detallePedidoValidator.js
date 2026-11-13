const { body } = require('express-validator');

const validarDetallePedidoStore = [
  body('pedido_id')
    .notEmpty().withMessage('El pedido_id es obligatorio')
    .isInt({ min: 1 }).withMessage('El pedido_id debe ser un entero positivo')
    .toInt(),

  body('producto_id')
    .notEmpty().withMessage('El producto_id es obligatorio')
    .isInt({ min: 1 }).withMessage('El producto_id debe ser un entero positivo')
    .toInt(),

  body('cantidad')
    .notEmpty().withMessage('La cantidad es obligatoria')
    .isInt({ min: 1 }).withMessage('La cantidad debe ser un entero de al menos 1')
    .toInt(),

  body('precio_unitario')
    .notEmpty().withMessage('El precio unitario es obligatorio')
    .isFloat({ min: 0 }).withMessage('El precio unitario debe ser mayor o igual a 0')
    .toFloat(),

  body('subtotal')
    .notEmpty().withMessage('El subtotal es obligatorio')
    .isFloat({ min: 0 }).withMessage('El subtotal debe ser mayor o igual a 0')
    .toFloat()
];

const validarDetallePedidoUpdate = [
  body('pedido_id')
    .optional()
    .isInt({ min: 1 }).withMessage('El pedido_id debe ser un entero positivo')
    .toInt(),

  body('producto_id')
    .optional()
    .isInt({ min: 1 }).withMessage('El producto_id debe ser un entero positivo')
    .toInt(),

  body('cantidad')
    .optional()
    .isInt({ min: 1 }).withMessage('La cantidad debe ser un entero de al menos 1')
    .toInt(),

  body('precio_unitario')
    .optional()
    .isFloat({ min: 0 }).withMessage('El precio unitario debe ser mayor o igual a 0')
    .toFloat(),

  body('subtotal')
    .optional()
    .isFloat({ min: 0 }).withMessage('El subtotal debe ser mayor o igual a 0')
    .toFloat()
];

module.exports = {
  validarDetallePedidoStore,
  validarDetallePedidoUpdate
};