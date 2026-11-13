const express = require('express');
const router = express.Router();
const pedidosControlador = require('../controladores/pedidosControlador');
const { Pedido } = require('../modelos');

const validarCampos = require('../middlewares/validarCampos');
const { validarIdParam, verificarExistencia } = require('../middlewares/validarIdExistente');
const { validarPedidoStore, validarPedidoUpdate } = require('../validators/pedidoValidator');

router.get('/', pedidosControlador.index);

router.post('/',validarPedidoStore,
    validarCampos,
    pedidosControlador.store
);

router.put('/:id',
  validarIdParam,
  validarPedidoUpdate,
  validarCampos,
  verificarExistencia(Pedido),
  pedidosControlador.update
);

router.delete('/:id', validarIdParam, verificarExistencia(Pedido), pedidosControlador.destroy);
module.exports = router;