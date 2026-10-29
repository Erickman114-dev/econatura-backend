const express = require('express');
const router = express.Router();
const facturasControlador = require('../controladores/facturasControlador');

router.get('/', facturasControlador.index);
router.get('/:id', facturasControlador.show);
router.post('/', facturasControlador.store);
router.put('/:id', facturasControlador.update);

module.exports = router;