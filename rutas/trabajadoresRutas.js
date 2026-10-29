const express = require('express');
const router = express.Router();

const trabajadoresCntrl = require('../controladores/trabajadoresControlador');

router.get('/',trabajadoresCntrl.index);

router.get('/:id',trabajadoresCntrl.show);

router.post('/',trabajadoresCntrl.store);


router.put('/:id',trabajadoresCntrl.update);


//router.patch('/:id',trabajadoresCntrl.partialUpdate);


router.delete('/:id',trabajadoresCntrl.destroy);


module.exports = router;