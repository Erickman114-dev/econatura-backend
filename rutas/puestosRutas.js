const express = require('express');
const router = express.Router();
const puestoCntrl = require('../controladores/puestoControlador');
const { Puesto } = require('../modelos');

const validarCampos = require('../middlewares/validarCampos');
const { validarIdParam, verificarExistencia } = require('../middlewares/validarIdExistente');
const { validarPuestoStore, validarPuestoUpdate } = require('../validators/puestoValidator');

router.get('/',puestoCntrl.index);

router.get('/:id',validarIdParam, verificarExistencia(Puesto),puestoCntrl.show);

router.post('/',validarPuestoStore,
  validarCampos,
  puestoCntrl.store
);


router.put('/:id',validarIdParam,
  validarPuestoUpdate,
  validarCampos,
  verificarExistencia(Puesto),
  puestoCntrl.update
);


//router.patch('/:id',puestoCntrl.partialUpdate);


router.delete('/:id',validarIdParam, verificarExistencia(Puesto),puestoCntrl.destroy);


module.exports = router;