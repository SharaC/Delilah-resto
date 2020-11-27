const conexion = require('../../startup/conexion');
const { generarToken } = require("../../middlewares/token/jwt");

const autenticarUsuario = (req, res) => {
    const {user, password } = req.body;
    conexion.query("SELECT * FROM usuarios WHERE usuario=?", {
        replacements: [user],
        type:conexion.QueryTypes.SELECT
    }).then((result)=> {
        if (user === result[0].usuario && password === result[0].contrasena){
            const payload = {
                usuario: result[0].usuario,
                id_usuario : result[0].id,
                rol: result[0].id_rol
            };
            const token = generarToken(payload);
            res.status(200).json({ token });
        }else{
            res.status(401).json("Usuario o contraseña inválidos");
        }
    }).catch(err => {
        res.status(500).json(err);
    })
};

const registrarUsuario = (req, res) => {
    const {user, password, nombre_completo, email, direccion_envio, telefono} = req.body;
    const id_rol = 2;
    conexion.query("INSERT INTO `usuarios` (`usuario`,`nombre_completo`,`email`,`direccion_envio`,`telefono`, `contrasena`, `id_rol`) VALUES (?,?,?,?,?,?,?);",
    {
        replacements: [user,nombre_completo, email, direccion_envio, telefono, password, id_rol],
        type: conexion.QueryTypes.INSERT
    }).then(result => {
        res.status(200).json("usuario creado con éxito, id: " + result[0]);
    }).catch(err => {
        res.status(500).json(err);
    });
};

module.exports = {
    autenticarUsuario,
    registrarUsuario
}