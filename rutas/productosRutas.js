const express = require('express');
const router = express.Router();
const { handleUploadMultiple } = require('../middlewares/upload');
const productosCntrl = require('../controladores/productosControlador');
const { Producto } = require('../modelos');

const validarCampos = require('../middlewares/validarCampos');
const { validarIdParam, verificarExistencia } = require('../middlewares/validarIdExistente');
const { validarProductoStore, validarProductoUpdate } = require('../validators/productoValidator');

router.get('/',productosCntrl.index);

router.get('/:id',validarIdParam, verificarExistencia(Producto),productosCntrl.show);

router.post('/', 
    handleUploadMultiple('productos', 'imagenes', 3),
  validarProductoStore,
  validarCampos,
  productosCntrl.store
);


router.put('/:id',validarIdParam,
  handleUploadMultiple('productos', 'imagenes', 3),
  validarProductoUpdate,
  validarCampos,
  verificarExistencia(Producto),
  productosCntrl.update
);


//router.patch('/:id',productosCntrl.partialUpdate);


router.delete('/:id',validarIdParam, verificarExistencia(Producto),productosCntrl.destroy);


module.exports = router;