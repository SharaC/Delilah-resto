const conexion = require('../../startup/conexion');

const listarPedidos = (req, res) => {
    let rol = req.id_rol;
    console.log(rol);
    let id_usuario = req.id_usuario;
    if (rol === 1){
        conexion.query(`SELECT EST.nombre AS Estado, DATE_FORMAT(PED.fecha, "%H:%I:%S" ) AS Hora, CONCAT('#',PED.id) AS Numero, 
        (SELECT  GROUP_CONCAT(DET.cantidad,CONCAT(' X ', PROD.nombre)) FROM detalles_pedidos DET 
        INNER JOIN productos PROD ON PROD.id= DET.id_producto
        WHERE DET.id_pedido = PED.id) AS Descripcion, 
        (SELECT SUM(cantidad*precio_unidad) FROM detalles_pedidos WHERE id_pedido = PED.id) AS Pago, 
        USU.usuario AS Usuario, USU.direccion_envio AS Dirección
        from pedidos PED
        INNER JOIN estados EST ON EST.id = PED.id_estado
        INNER JOIN usuarios USU ON USU.id = PED.id_usuario;`,
        {
            type: conexion.QueryTypes.SELECT
        }).then(result => {
            result.length === 0 ? res.status(404).json("no se encontró nigún pedido") : res.status(200).json(result);
        }).catch(err => {
            res.status(500).json(err);
        });
    } else {
        conexion.query(`SELECT EST.nombre AS Estado, DATE_FORMAT(PED.fecha, "%H:%I:%S" ) AS Hora, CONCAT('#',PED.id) AS Numero, 
        (SELECT  GROUP_CONCAT(DET.cantidad,CONCAT(' X ', PROD.nombre)) FROM detalles_pedidos DET 
        INNER JOIN productos PROD ON PROD.id= DET.id_producto
        WHERE DET.id_pedido = PED.id) AS Descripcion, 
        (SELECT SUM(cantidad*precio_unidad) FROM detalles_pedidos WHERE id_pedido = PED.id) AS Pago, 
        USU.usuario AS Usuario, USU.direccion_envio AS Dirección
        from pedidos PED
        INNER JOIN estados EST ON EST.id = PED.id_estado
        INNER JOIN usuarios USU ON USU.id = PED.id_usuario
        WHERE PED.id_usuario=?;`,
        {
            replacements: [id_usuario],
            type: conexion.QueryTypes.SELECT
        }).then(result => {
            result.length === 0 ? res.status(404).json("no se encontraron pedidos asociados al usuario") : res.status(200).json(result);
        }).catch(err => {
            res.status(500).json(err);
        });
    }
}

const listarPedidoID = (req, res) => {
    let id_pedido = req.params.id;
    let id_rol = req.id_rol;
    let id_usuario = req.id_usuario;
    if (id_rol === 1){
        conexion.query(`SELECT EST.nombre AS Estado, DATE_FORMAT(PED.fecha, "%H:%I:%S" ) AS Hora, CONCAT('#',PED.id) AS Numero, 
        (SELECT  GROUP_CONCAT(DET.cantidad,CONCAT(' X ', PROD.nombre, ' $ ', PROD.precio ,' : ', PROD.ruta)) FROM detalles_pedidos DET 
        INNER JOIN productos PROD ON PROD.id= DET.id_producto WHERE DET.id_pedido = PED.id) AS Descripcion, 
        (SELECT SUM(cantidad*precio_unidad) FROM detalles_pedidos WHERE id_pedido = PED.id) AS Pago, 
        USU.nombre_completo AS Nombre, USU.usuario, USU.email, USU.direccion_envio AS Dirección, USU.telefono,
        PAG.nombre AS Forma_pago
        FROM detalles_pedidos DET
        INNER JOIN pedidos PED on PED.id=?
        INNER JOIN estados EST ON EST.id = PED.id_estado
        INNER JOIN usuarios USU ON USU.id = PED.id_usuario
        INNER JOIN tipo_pagos PAG ON PAG.id = PED.id_tipopago 
        GROUP by EST.nombre;`,
        {
            replacements: [id_pedido],
            type: conexion.QueryTypes.SELECT
        }).then(result => {
            result.length === 0 ? res.status(404).json("no se encontró el pedido solicitado") : res.status(200).json(result);
        }).catch(err => {
            res.status(500).json(err);
        });
    } else {
        conexion.query(`SELECT EST.nombre AS Estado, DATE_FORMAT(PED.fecha, "%H:%I:%S" ) AS Hora, CONCAT('#',PED.id) AS Numero, 
        (SELECT  GROUP_CONCAT(DET.cantidad,CONCAT(' X ', PROD.nombre, ' $ ', PROD.precio ,' : ', PROD.ruta)) FROM detalles_pedidos DET 
        INNER JOIN productos PROD ON PROD.id= DET.id_producto WHERE DET.id_pedido = PED.id) AS Descripcion, 
        (SELECT SUM(cantidad*precio_unidad) FROM detalles_pedidos WHERE id_pedido = PED.id) AS Pago, 
        USU.nombre_completo AS Nombre, USU.usuario, USU.email, USU.direccion_envio AS Dirección, USU.telefono,
        PAG.nombre AS Forma_pago
        FROM detalles_pedidos DET
        INNER JOIN pedidos PED on PED.id=?
        INNER JOIN estados EST ON EST.id = PED.id_estado
        INNER JOIN usuarios USU ON USU.id = PED.id_usuario
        INNER JOIN tipo_pagos PAG ON PAG.id = PED.id_tipopago
        WHERE PED.id_usuario=?
        GROUP by EST.nombre;`,
        {
            replacements: [id_pedido, id_usuario],
            type: conexion.QueryTypes.SELECT
        }).then(result => {
            result.length === 0 ? res.status(404).json("no se encontró el pedido solicitado") : res.status(200).json(result);
        }).catch(err => {
            res.status(500).json(err);
        });
    }
}

const crearEncabezadoPedido = (req, res, next) => {
    let {id_usuario, id_tipopago} = req.body;
    conexion.query("INSERT INTO `pedidos` (`id_estado`,`id_usuario`,`id_tipopago`) VALUES ('1',?,?);",
    {
        replacements: [id_usuario,id_tipopago],
        type: conexion.QueryTypes.INSERT
    }).then(result => {
        console.log(result[0]);
        req.id_pedido = result[0];
        next();
    }).catch(err => {
        res.status(500).json(err);
    });
}

const crearDetallePedido = (req, res) => {
    let { detalle_pedido } = req.body;
    let id_pedido = req.id_pedido;
    console.log (req.id_pedido);
    console.log(detalle_pedido);
    detalle_pedido.forEach(pedidoDetallado => {
        let { id_producto, cantidad, precio_unidad } = pedidoDetallado;
        conexion.query("INSERT INTO `detalles_pedidos` (`id_producto`,`id_pedido`,`cantidad`,`precio_unidad`) VALUES (?,?,?,?);",
        {
            replacements: [id_producto,id_pedido,cantidad,precio_unidad],
            type: conexion.QueryTypes.INSERT
        }).catch(err => {
            res.status(500).json(err);
        });
    });
    res.status(200).json("Se ha creado exitosamente el pedido con id: "+ id_pedido);
};

const actualizarPedido = (req, res) => {
    let {id, id_estado} = req.body;
    let id_rol = req.id_rol;
    if (id_rol === 1){
        conexion.query(`UPDATE pedidos SET id_estado=? WHERE id=?;`,
        {
            replacements: [id_estado,id],
            type: conexion.QueryTypes.UPDATE
        }).then((result) => {
            result[1] === 0 ? res.status(400).json("los parametros enviados para actualizar no son correctos, ningún pedido se actualizó") : 
            res.status(200).json("Pedido con id: "+id+" fue actualizado correctamente");
        }).catch(err => {
            res.status(500).json(err);
        });
    } else {
        res.status(403).json("el usuario no tiene permisos para editar pedidos");
    }
}

const eliminarPedido = (req, res) => {
    let id = req.params.id;
    let id_rol = req.id_rol;
    if (id_rol === 1){
        conexion.query(`DELETE DET FROM detalles_pedidos as DET INNER JOIN pedidos PED ON PED.id = DET.id_pedido WHERE DET.id_pedido=${id}`,
        {
            type: conexion.QueryTypes.DELETE
        }).then(() => {
            conexion.query(` DELETE from pedidos where id=${id};`,
            {
                type: conexion.QueryTypes.DELETE
            }).then(() => {
                result[1] === 0 ? res.status(400).json("los parametros enviados para eliminar no son correctos, ningún pedido se eliminó") :
                res.status(200).json("Pedido con id: "+id+" fue ELIMINADO correctamente");
            }).catch(err => {
                res.status(500).json(err);
            });
        }).catch(err => {
            res.status(500).json(err);
        });
    } else {
        res.status(403).json("el usuario no tiene permisos para eliminar pedidos");
    }
    
}

module.exports = {
    listarPedidos,
    listarPedidoID,
    crearEncabezadoPedido,
    crearDetallePedido,
    actualizarPedido,
    eliminarPedido
}