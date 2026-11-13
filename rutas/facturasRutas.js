const express = require('express');
const router = express.Router();
const facturasControlador = require('../controladores/facturasControlador');
const { Factura } = require('../modelos');

const validarCampos = require('../middlewares/validarCampos');
const { validarIdParam, verificarExistencia } = require('../middlewares/validarIdExistente');
const { validarFacturaStore, validarFacturaUpdate } = require('../validators/facturaValidator');

router.get('/', facturasControlador.index);
router.get('/:id', validarIdParam, verificarExistencia(Factura), facturasControlador.show);

router.post('/', validarFacturaStore,
  validarCampos,
  facturasControlador.store
);

router.put('/:id', validarIdParam,
  validarFacturaUpdate,
  validarCampos,
  verificarExistencia(Factura),
  facturasControlador.update
);

module.exports = router;