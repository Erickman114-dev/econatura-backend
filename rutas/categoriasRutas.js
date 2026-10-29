const express = require('express');
const router = express.Router();

const categoriasCntrl = require('../controladores/categoriasControlador');

router.get('/',categoriasCntrl.index);

router.get('/:id',categoriasCntrl.show);

router.post('/',categoriasCntrl.store);


router.put('/:id',categoriasCntrl.update);


//router.patch('/:id',categoriasCntrl.partialUpdate);


router.delete('/:id',categoriasCntrl.destroy);


module.exports = router;