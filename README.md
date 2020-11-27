# Delilah Resto v1.0
API Restfull para un sistema de pedidos de comida online, ofreciendo opciones para el registo de usuarios, consulta, creación y actualización de productos y pedidos dependiendo de los permisos de usuario.

## Requisitos:
1. Instalar motor de **MySQL**
2. En su motor de base de datos, ejecute el script de creación e inicialización de la base de datos que se encuentra en el archivo: **delilah-resto.sql**
		**NOTA**: En este archivo se insertan algunos datos de prueba para poblar la base de 		  datos, por lo que antes de ejecutar el script, debería revisar y realizar modificaciones en algunas o todas las entradas, entre ellas el **usuario con rol de administrador** y su contraseña en la tabla de usuarios.
3. Instalar **Node.js**
4. Clonar este repositorio e instalar las dependencias ejecutando el comando: 
		```npm install``` (en el directorio raíz del proyecto)
## Definición de parámetros:
En el directorio **./src/startup** se encuentra el archivo de parámetros a configurar: **config.js**, es necesario editar los siguientes parámetros deacuerdo su configuración actual de la base de datos y servidor de Node y Express.
```
- HOST: 'localhost'
- appPort: < puerto_express >
- DATABASE: 'delilah_resto'
- USER_DATABASE: < usuario >
- PASSWORD_DATABASE: < password >
- SECRET: < palabra de secreto para generar los tokens JWT >
```

* Omita los caracteres: < > y reemplace por los valores de su preferencia

## Ejecución:

En el directorio raiz del proyecto ejecute el comando: 
```node app.js``` para iniciar la aplicación.
Para probar que se inició exitosamente, visite en el navegador de preferencia, de acuerdo a sus parámetros: ```http://HOST:appPort/api-ping``` (por ejemplo http://localhost:3030/api-ping ) y verifique que la respuesta recibida sea: **Delilah-Resto: it works fine ;)**

## Uso de la API:

En la raíz del proyecto se encuentra un archivo swagger:  **spec.yaml** donde se especifica la documentación de todos los endopoints, request y responses correspondientes.
Para ejecutar las pruebas directamente en la web, se puede apoyar de este mismo archivo al importarlo en https://editor.swagger.io/ mediante sus opciones de ejecución de peticiones directamente desde la herramienta.
O, si prefiere, también puede probar los diferentes endopoints desde Postman, deacuerdo a la documentación de swagger entregada.