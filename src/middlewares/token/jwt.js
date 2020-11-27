const jwt = require('jsonwebtoken');
const config = require('../../startup/config');
const {SECRET} = config;
//const secret = 'DELILAH-RESTO-sharac';

const generarToken = (payload) =>{
    const token = jwt.sign(payload, SECRET);
    return token;
}

const validarToken = (req, res, next) => {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, SECRET, function(err, decoded) {
            if (err) {
                res.status(401).json('token no válido');    
            } else {
                const payload = jwt.decode(token);
                req.id_rol = payload.rol;
                req.id_usuario = payload.id_usuario;
                next();
            }
        });
}

module.exports = {
    validarToken,
    generarToken
}