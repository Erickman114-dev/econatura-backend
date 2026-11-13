const { body } = require('express-validator');

const validarPedidoStore = [
  body('cliente_id')
    .notEmpty().withMessage('El id del cliente es obligatorio')
    .isInt({ min: 1 }).withMessage('El cliente_id debe ser un entero positivo')
    .toInt(),

  body('total')
    .notEmpty().withMessage('El total del pedido es obligatorio')
    .isFloat({ min: 0 }).withMessage('El total debe ser un número decimal mayor o igual a 0')
    .toFloat(),

  body('estado_pedido')
    .optional()
    .isIn(['Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'])
    .withMessage('Estado de pedido inválido'),

  body('direccion_envio')
    .trim()
    .notEmpty().withMessage('La dirección de envío es obligatoria')
    .escape()
];

const validarPedidoUpdate = [
  body('cliente_id')
    .optional()
    .isInt({ min: 1 }).withMessage('El cliente_id debe ser un entero positivo')
    .toInt(),

  body('total')
    .optional()
    .isFloat({ min: 0 }).withMessage('El total debe ser un número decimal mayor o igual a 0')
    .toFloat(),

  body('estado_pedido')
    .optional()
    .isIn(['Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'])
    .withMessage('Estado de pedido inválido'),

  body('direccion_envio')
    .optional()
    .trim()
    .escape()
];

module.exports = {
  validarPedidoStore,
  validarPedidoUpdate
};