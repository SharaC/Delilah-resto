const Sequelize = require('sequelize');
const config = require('./config');
const {HOST_DATABASE, NAME_DATABASE, USER_DATABASE, PASSWORD_DATABASE } = config;

const conexion = new Sequelize(NAME_DATABASE, USER_DATABASE, PASSWORD_DATABASE,
{
    host: HOST_DATABASE,
    dialect: 'mysql'
});

conexion.authenticate().then(()=>{
    console.log('conexión a base de datos exitosa');
}).catch(err=>{
    console.log(err);
})

module.exports = conexion;
