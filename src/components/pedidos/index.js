const router = require('express').Router();
const { validarToken } = require('../../middlewares/token/jwt');
const { 
    listarPedidos,
    listarPedidoID,
    crearEncabezadoPedido,
    crearDetallePedido,
    actualizarPedido,
    eliminarPedido
} = require('./controller');

router.get('/', validarToken, listarPedidos);
router.get('/pedido/:id', validarToken, listarPedidoID);
router.post('/nuevo-pedido', validarToken, crearEncabezadoPedido, crearDetallePedido);
router.put('/pedido', validarToken, actualizarPedido);
router.delete('/pedido/:id/confirm-delete', validarToken, eliminarPedido);


module.exports = router;