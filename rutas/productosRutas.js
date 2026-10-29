const express = require('express');
const router = express.Router();

const productosCntrl = require('../controladores/productosControlador');

router.get('/',productosCntrl.index);

router.get('/:id',productosCntrl.show);

router.post('/',productosCntrl.store);


router.put('/:id',productosCntrl.update);


//router.patch('/:id',productosCntrl.partialUpdate);


router.delete('/:id',productosCntrl.destroy);


module.exports = router;