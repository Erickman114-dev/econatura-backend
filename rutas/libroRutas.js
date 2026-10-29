const express = require('express');
const router = express.Router();

const libroCntrl = require('../controladores/libroControlador');

router.get('/',libroCntrl.index);

router.get('/:id',libroCntrl.show);

router.post('/',libroCntrl.store);


router.put('/:id',libroCntrl.update);


//router.patch('/:id',libroCntrl.partialUpdate);


router.delete('/:id',libroCntrl.destroy);


module.exports = router;