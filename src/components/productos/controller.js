const conexion = require('../../startup/conexion');

const listarProductos = (req, res) => {
    conexion.query(`SELECT * FROM productos;`,
    {
        type: conexion.QueryTypes.SELECT
    }).then(result => {
        result.length === 0 ? res.status(404).json("no se encontró ningún producto") : res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
}

const listarProductoID = (req, res) => {
    let id = req.params.id;
    conexion.query(`SELECT * FROM productos WHERE id= ?`,
    {
        replacements: [id],
        type: conexion.QueryTypes.SELECT
    }).then(result => {
        result.length === 0 ? res.status(404).json("no se encontró el producto solicitado") : res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
}

const crearProducto = (req, res) => {
    let id_rol = req.id_rol;
    if (id_rol === 1){
        let {nombre,precio,nombre_corto,ruta,favorito} = req.body;
        conexion.query("INSERT INTO `productos` (`nombre`,`precio`,`nombre_corto`,`ruta`,`favorito`) VALUES (?,?,?,?,?);",
        {
            replacements: [nombre,precio,nombre_corto,ruta,favorito],
            type: conexion.QueryTypes.INSERT
        }).then(result => {
            res.status(200).json("Producto creado con id: " + result[0]);
        }).catch(err => {
            res.status(500).json(err);
        });
    } else {
        res.status(403).json("el usuario no tiene permisos para crear nuevos productos")
    }
}

const actualizarProducto = (req, res) => {
    let id_rol = req.id_rol;
    if (id_rol === 1){
        let {id, nombre,precio,nombre_corto,ruta,favorito} = req.body;
        console.log(id);
        conexion.query(`UPDATE productos SET nombre=?, precio=?, nombre_corto=?, ruta=?, favorito=? WHERE id=?;`,
        {
            replacements: [nombre,precio,nombre_corto,ruta,favorito, id],
            type: conexion.QueryTypes.UPDATE
        }).then(result => {
            result[1] === 0 ? res.status(400).json("los parametros enviados para actualizar no son correctos, ningún producto se actualizó") : 
            res.status(200).json("Producto con id: "+id+" fue actualizado correctamente");
        }).catch(err => {
            res.status(500).json(err);
        });
    } else {
        res.status(403).json("el usuario no tiene permisos para editar productos")
    }
}

const eliminarProducto = (req, res) => {
    let id = req.params.id;
    let id_rol = req.id_rol;
    if (id_rol === 1){
        conexion.query(`DELETE from productos WHERE id=${id};`,
        {
            type: conexion.QueryTypes.UPDATE
        }).then(result => {
            result[1] === 0 ? res.status(400).json("los parametros enviados para eliminar no son correctos, ningún producto se eliminó") :
            res.status(200).json("Producto con id: "+id+" fue ELIMINADO correctamente");
        }).catch(err => {
            if (err.parent.errno === 1451) {
                res.status(409).json("El producto no puede ser eliminado por que está relacionado con un pedido en la tabla detalles_pedidos");
            }else{
              res.status(500).json(err);
            }
        });
    } else {
        res.status(403).json("el usuario no tiene permisos para eliminar productos")
    }
    
}

module.exports = {
    listarProductos,
    listarProductoID,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}