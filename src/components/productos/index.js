const router = require('express').Router();
const { validarToken } = require('../../middlewares/token/jwt');
const { 
    listarProductos,
    listarProductoID,
    crearProducto ,
    actualizarProducto,
    eliminarProducto
} = require('./controller');

router.get('/', validarToken, listarProductos);
router.get('/producto/:id', validarToken, listarProductoID);
router.post('/nuevo-producto', validarToken, crearProducto);
router.put('/producto', validarToken, actualizarProducto);
router.delete('/producto/:id/confirm-delete', validarToken, eliminarProducto);


module.exports = router;