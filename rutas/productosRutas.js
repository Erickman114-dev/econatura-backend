const express = require('express');
const router = express.Router();

// 1. IMPORTAR EL MIDDLEWARE DE AUTENTICACIÓN
const { verificarTokenAdmin } = require('../middlewares/authMiddleware');

const { handleUploadMultiple } = require('../middlewares/upload');
const productosCntrl = require('../controladores/productosControlador');
const { Producto } = require('../modelos');

const validarCampos = require('../middlewares/validarCampos');
const { validarIdParam, verificarExistencia } = require('../middlewares/validarIdExistente');
const { validarProductoStore, validarProductoUpdate } = require('../validators/productoValidator');

// RUTAS PÚBLICAS (Los clientes pueden ver el catálogo sin token)
router.get('/', productosCntrl.index);
router.get('/:id', validarIdParam, verificarExistencia(Producto), productosCntrl.show);

// RUTAS PRIVADAS / ADMINISTRATIVAS (Requieren Token)
router.post('/', 
  verificarTokenAdmin, // <-- Bloqueo con token aquí
  handleUploadMultiple('productos', 'imagenes', 3),
  validarProductoStore,
  validarCampos,
  productosCntrl.store
);

router.put('/:id',
  verificarTokenAdmin, // <-- Bloqueo con token aquí
  validarIdParam,
  handleUploadMultiple('productos', 'imagenes', 3),
  validarProductoUpdate,
  validarCampos,
  verificarExistencia(Producto),
  productosCntrl.update
);

//router.patch('/:id',productosCntrl.partialUpdate);

router.delete('/:id',
  verificarTokenAdmin, // <-- Bloqueo con token aquí
  validarIdParam, 
  verificarExistencia(Producto),
  productosCntrl.destroy
);

module.exports = router;