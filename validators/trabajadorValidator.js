const { body } = require('express-validator');
const { Op } = require('sequelize');
const { Trabajador } = require('../modelos');

const validarTrabajadorStore = [
  body('puesto_id')
    .notEmpty().withMessage('El campo puesto_id es obligatorio')
    .isInt({ min: 1 }).withMessage('El puesto_id debe ser un número entero positivo sin letras')
    .toInt(),

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
    .isEmail().withMessage('Debe ingresar un formato de correo electrónico válido')
    .isLength({ max: 150 }).withMessage('El correo no puede exceder los 150 caracteres')
    .normalizeEmail()
    .custom(async (correo) => {
      // En la creación (POST) verifica que el correo no exista en ningún registro
      const existe = await Trabajador.findOne({ where: { correo } });
      if (existe) {
        throw new Error('El correo electrónico ya se encuentra registrado');
      }
    }),

  body('contrasena')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6, max: 255 }).withMessage('La contraseña debe tener una longitud mínima de 6 caracteres'),

  body('telefono')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isNumeric().withMessage('El teléfono debe contener únicamente caracteres numéricos')
    .isLength({ min: 10, max: 10 }).withMessage('El teléfono debe contener 10 dígitos'),

  body('estado')
    .optional()
    .isIn(['ACTIVO', 'INACTIVO']).withMessage('El estado solo permite los valores: ACTIVO o INACTIVO')
];

const validarTrabajadorUpdate = [
  body('puesto_id')
    .optional()
    .isInt({ min: 1 }).withMessage('El puesto_id debe ser un número entero positivo')
    .toInt(),

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
    .isEmail().withMessage('Debe ingresar un formato de correo electrónico válido')
    .isLength({ max: 150 }).withMessage('El correo no puede exceder los 150 caracteres')
    .normalizeEmail()
    .custom(async (correo, { req }) => {
      // En la actualización (PUT) excluye el ID del trabajador actual
      const trabajadorExistente = await Trabajador.findOne({
        where: {
          correo,
          id: { [Op.ne]: req.params.id }
        }
      });

      if (trabajadorExistente) {
        throw new Error('El correo electrónico ya está en uso por otro trabajador');
      }
    }),

  body('contrasena')
    .optional()
    .isLength({ min: 6, max: 255 }).withMessage('La contraseña debe tener una longitud mínima de 6 caracteres'),

  body('telefono')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isNumeric().withMessage('El teléfono debe contener únicamente números')
    .isLength({ min: 8, max: 20 }).withMessage('El teléfono debe contener entre 8 y 20 dígitos'),

  body('estado')
    .optional()
    .isIn(['ACTIVO', 'INACTIVO']).withMessage('El estado solo permite los valores: ACTIVO o INACTIVO')
];

module.exports = {
  validarTrabajadorStore,
  validarTrabajadorUpdate
};