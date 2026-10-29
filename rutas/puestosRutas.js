const express = require('express');
const router = express.Router();

const puestoCntrl = require('../controladores/puestoControlador');

router.get('/',puestoCntrl.index);

router.get('/:id',puestoCntrl.show);

router.post('/',puestoCntrl.store);


router.put('/:id',puestoCntrl.update);


//router.patch('/:id',puestoCntrl.partialUpdate);


router.delete('/:id',puestoCntrl.destroy);


module.exports = router;