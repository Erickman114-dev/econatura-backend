const express = require('express');
const router = express.Router();
const pedidosControlador = require('../controladores/pedidosControlador');

router.get('/', pedidosControlador.index);
router.post('/', pedidosControlador.store);

module.exports = router;