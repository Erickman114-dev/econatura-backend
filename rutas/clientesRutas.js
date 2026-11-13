const express = require('express');
const router = express.Router();
const categoriasCntrl = require('../controladores/clientesControlador');
const { Cliente } = require('../modelos');

const validarCampos = require('../middlewares/validarCampos');
const { validarIdParam, verificarExistencia } = require('../middlewares/validarIdExistente');
const { validarClienteStore, validarClienteUpdate } = require('../validators/clienteValidator');

router.get('/',categoriasCntrl.index);

router.get('/:id',validarIdParam, verificarExistencia(Cliente),categoriasCntrl.show);

router.post('/',validarClienteStore,
  validarCampos,
  categoriasCntrl.store
);


router.put('/:id',
    validarIdParam,
  validarClienteUpdate,
  validarCampos,
  verificarExistencia(Cliente),
  categoriasCntrl.update
);


//router.patch('/:id',categoriasCntrl.partialUpdate);


router.delete('/:id',validarIdParam, verificarExistencia(Cliente),categoriasCntrl.destroy);


module.exports = router;