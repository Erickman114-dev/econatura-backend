const express = require('express');
const router = express.Router();
const categoriasCntrl = require('../controladores/categoriasControlador');
const { Categoria } = require('../modelos');

const validarCampos = require('../middlewares/validarCampos');
const { validarIdParam, verificarExistencia } = require('../middlewares/validarIdExistente');
const { validarCategoriaStore, validarCategoriaUpdate } = require('../validators/categoriaValidator');

router.get('/',categoriasCntrl.index);

router.get('/:id',validarIdParam, verificarExistencia(Categoria),categoriasCntrl.show);

router.post('/',validarCategoriaStore,
  validarCampos,
  categoriasCntrl.store
);


router.put('/:id',validarIdParam,
  validarCategoriaUpdate,
  validarCampos,
  verificarExistencia(Categoria),
  categoriasCntrl.update
);


//router.patch('/:id',categoriasCntrl.partialUpdate);


router.delete('/:id',validarIdParam, verificarExistencia(Categoria), categoriasCntrl.destroy);


module.exports = router;