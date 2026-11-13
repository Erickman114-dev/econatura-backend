const express = require('express');
const router = express.Router();
const { handleUploadSingle } = require('../middlewares/upload');
const trabajadoresCntrl = require('../controladores/trabajadoresControlador');
const { Trabajador } = require('../modelos');

const validarCampos = require('../middlewares/validarCampos');
const { validarIdParam, verificarExistencia } = require('../middlewares/validarIdExistente');
const { validarTrabajadorStore, validarTrabajadorUpdate } = require('../validators/trabajadorValidator');


router.get('/',trabajadoresCntrl.index);

router.get('/:id',validarIdParam,verificarExistencia(Trabajador),trabajadoresCntrl.show);

router.post('/', handleUploadSingle('trabajadores', 'imagen'),
  validarTrabajadorStore,
  validarCampos,
  trabajadoresCntrl.store
);


router.put('/:id',validarIdParam,
  handleUploadSingle('trabajadores', 'imagen'),
  validarTrabajadorUpdate,
  validarCampos,
  verificarExistencia(Trabajador),
  trabajadoresCntrl.update
);


//router.patch('/:id',trabajadoresCntrl.partialUpdate);


router.delete('/:id',validarIdParam, verificarExistencia(Trabajador),trabajadoresCntrl.destroy);


module.exports = router;