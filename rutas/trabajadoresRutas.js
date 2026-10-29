const express = require('express');
const router = express.Router();
const { handleUploadSingle } = require('../middlewares/upload');
const trabajadoresCntrl = require('../controladores/trabajadoresControlador');

router.get('/',trabajadoresCntrl.index);

router.get('/:id',trabajadoresCntrl.show);

router.post('/', handleUploadSingle('trabajadores', 'imagen'), trabajadoresCntrl.store);


router.put('/:id', handleUploadSingle('trabajadores', 'imagen'), trabajadoresCntrl.update);


//router.patch('/:id',trabajadoresCntrl.partialUpdate);


router.delete('/:id',trabajadoresCntrl.destroy);


module.exports = router;