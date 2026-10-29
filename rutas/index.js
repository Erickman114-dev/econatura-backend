const express = require('express');
const router = express.Router();

router.use('/puestos', require('./puestosRutas'));
router.use('/trabajadores', require('./trabajadoresRutas'));
router.use('/categorias', require('./categoriasRutas'));
router.use('/productos', require('./productosRutas'));
router.use('/clientes', require('./clientesRutas'));
router.use('/pedidos', require('./pedidosRutas'));
router.use('/facturas', require('./facturasRutas'));

module.exports = router;