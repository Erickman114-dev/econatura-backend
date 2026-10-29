const express = require('express');
const router = express.Router();
const { handleUploadMultiple } = require('../middlewares/upload');
const productosCntrl = require('../controladores/productosControlador');

router.get('/',productosCntrl.index);

router.get('/:id',productosCntrl.show);

router.post('/', handleUploadMultiple('productos', 'imagenes'), productosCntrl.store);


router.put('/:id',handleUploadMultiple('productos', 'imagenes'),productosCntrl.update);


//router.patch('/:id',productosCntrl.partialUpdate);


router.delete('/:id',productosCntrl.destroy);


module.exports = router;