const { body } = require('express-validator');
const { Op } = require('sequelize');
const { Cliente } = require('../modelos');

const validarClienteStore = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .escape(),

  body('apellido')
    .trim()
    .notEmpty().withMessage('El apellido es obligatorio')
    .isLength({ min: 2, max: 100 }).withMessage('El apellido debe tener entre 2 y 100 caracteres')
    .escape(),

  body('correo')
  .trim()
  .notEmpty().withMessage('El correo es obligatorio')
  .isEmail().withMessage('Formato de correo electrónico inválido')
  .normalizeEmail()
  .custom(async (correo) => {
    const existe = await Cliente.findOne({ where: { correo } });
    if (existe) {
      throw new Error('El correo electrónico ya está registrado');
    }
  }),

  body('contrasena')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

  body('telefono')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isNumeric().withMessage('El teléfono debe contener únicamente números')
    .isLength({ min: 10, max: 10 }).withMessage('El teléfono debe tener 10 caracteres'),

  body('direccion')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),

  body('estado')
    .optional()
    .isIn(['ACTIVO', 'INACTIVO']).withMessage('El estado debe ser ACTIVO o INACTIVO')
];

const validarClienteUpdate = [
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .escape(),

  body('apellido')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('El apellido debe tener entre 2 y 100 caracteres')
    .escape(),

  body('correo')
    .optional()
    .trim()
    .isEmail().withMessage('Formato de correo electrónico inválido')
    .isLength({ max: 150 }).withMessage('El correo no puede superar los 150 caracteres')
    .normalizeEmail()
    .custom(async (correo, { req }) => {
      // Busca si el correo ya pertenece a OTRO cliente (excluyendo el ID actual)
      const clienteExistente = await Cliente.findOne({
        where: {
          correo,
          id: { [Op.ne]: req.params.id } // Op.ne significa "Not Equal" (!=)
        }
      });

      if (clienteExistente) {
        throw new Error('El correo electrónico ya está en uso por otro cliente');
      }
    }),

  body('contrasena')
    .optional()
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

  body('telefono')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isNumeric().withMessage('El teléfono debe contener únicamente números')
    .isLength({ min: 10, max: 10 }).withMessage('El teléfono debe tener 10 caracteres'),

  body('direccion')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),

  body('estado')
    .optional()
    .isIn(['ACTIVO', 'INACTIVO']).withMessage('El estado debe ser ACTIVO o INACTIVO')
];

module.exports = {
  validarClienteStore,
  validarClienteUpdate
};