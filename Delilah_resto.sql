-- -----------------------------------------------------
-- Schema delilah_resto
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `delilah_resto` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `delilah_resto` ;

-- -----------------------------------------------------
-- Table `delilah_resto`.`estados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah_resto`.`estados` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `delilah_resto`.`tipo_pagos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah_resto`.`tipo_pagos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table   `delilah_resto`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah_resto`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table   `delilah_resto`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS   `delilah_resto`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(45) NOT NULL,
  `nombre_completo` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `direccion_envio` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  `contrasena` VARCHAR(45) NOT NULL,
  `id_rol` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuario_rol_idx` (`id_rol` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_rol`
    FOREIGN KEY (`id_rol`)
    REFERENCES   `delilah_resto`.`roles` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table   `delilah_resto`.`pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS   `delilah_resto`.`pedidos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_estado` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  `id_tipopago` INT NOT NULL,
  `fecha` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_pedidos_usuarios_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `fk_pedidos_estados_idx` (`id_estado` ASC) VISIBLE,
  INDEX `fk_pedidos_tipopago_idx` (`id_tipopago` ASC) VISIBLE,
  CONSTRAINT `fk_pedidos_estados`
    FOREIGN KEY (`id_estado`)
    REFERENCES   `delilah_resto`.`estados` (`id`),
  CONSTRAINT `fk_pedidos_tipopago`
    FOREIGN KEY (`id_tipopago`)
    REFERENCES   `delilah_resto`.`tipo_pagos` (`id`),
  CONSTRAINT `fk_pedidos_usuarios`
    FOREIGN KEY (`id_usuario`)
    REFERENCES   `delilah_resto`.`usuarios` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table   `delilah_resto`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS   `delilah_resto`.`productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(80) NOT NULL,
  `precio` DECIMAL(10,0) NOT NULL,
  `nombre_corto` VARCHAR(15) NOT NULL,
  `ruta` VARCHAR(250) NOT NULL,
  `favorito` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table   `delilah_resto`.`detalles_pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS   `delilah_resto`.`detalles_pedidos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NOT NULL,
  `id_pedido` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `precio_unidad` FLOAT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_detalle_pedido_idx` (`id_pedido` ASC) VISIBLE,
  INDEX `fk_detalle_producto_idx` (`id_producto` ASC) VISIBLE,
  CONSTRAINT `fk_detalle_pedido`
    FOREIGN KEY (`id_pedido`)
    REFERENCES   `delilah_resto`.`pedidos` (`id`),
  CONSTRAINT `fk_detalle_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES   `delilah_resto`.`productos` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

*************************************************************************************
-- -----------------------------------------------------
-- Insercion de datos de prueba
-- -----------------------------------------------------

/*** Roles de usuario ***/
INSERT INTO `roles`
(`nombre`)
VALUES('admin'),('usuario');

/*** Usuario Administrador y otros usuarios de prueba  ***/
INSERT INTO `usuarios`
(`usuario`,`nombre_completo`,`email`,`telefono`,`direccion_envio`,`contrasena`,`id_rol`)
VALUES
("admin","Administrador Del Sistema","admin@mail.com","123445678","Calle 123","admin",1),
("usuario1","Usuario Uno","usuario1@mail.com","567890","Calle falsa 123","usuario1",2),
("usuario2","Usuario Dos","usuario2@mail.com","567890","Calle falsa 123","usuario2",2),
("usuario3","Usuario Tres","usuario3@mail.com","567890","Calle falsa 123","usuario2",2),
("usuario4","Usuario Cuatro","usuario4@mail.com","567890","Calle falsa 123","usuario2",2);


/*** Tipos de pago ***/
INSERT INTO `tipo_pagos`
(`nombre`) VALUES ('TARJETA CREDITO'),('EFECTIVO'),('TRANSFERENCIA'),('PSE');

/*** Estados de pedido ***/  
INSERT INTO `estados`
(`nombre`)
VALUES	("NUEVO"),("CONFIRMADO"),("PREPARANDO"),("EN CAMINO"),("CANCELADO"),("ENTREGADO");

/*** productos  ***/  
INSERT INTO `productos`
(`nombre`,`precio`,`nombre_corto`,`ruta`,`favorito`)
VALUES
("Pizza Vegetales Grande","32000","PizzaVeggGr","./assets/imagenes/productos/PizzaVeggGr",0),
("Pizza Ranchera Personal","10000","PizzaRanchPer","./assets/imagenes/productos/PizzaRanchVer",1),
("Hamburguesa tres carnes","11000","HambTresCar","./assets/imagenes/productos/HambTresCar",0),
("Malteada Grande","5500","MalteadaGr","./assets/imagenes/productos/MalteadaGr",0);


/*** Pedidos ***/
INSERT INTO `pedidos`
(`id_estado`,`id_usuario`,`id_tipopago`)
VALUES(1,1,1),(2,2,2),(1,3,3),(2,4,4);

/*** insert detalle_pedidos  ***/ 
INSERT INTO `detalles_pedidos`
(`id_producto`,`id_pedido`,`cantidad`,`precio_unidad`)
VALUES(2,1,1,10000),(4,1,1,5500),(4,2,5,5500),(1,2,1,32000),(3,3,2,11000),(4,3,2,5500);



