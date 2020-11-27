const router = require('express').Router();
const { 
    autenticarUsuario,
    registrarUsuario 
} = require('./controller');

router.post('/login', autenticarUsuario);
router.post('/registro', registrarUsuario);

module.exports = router;