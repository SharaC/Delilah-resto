const Sequelize = require('sequelize');
const config = require('./config');
const {HOST, DATABASE, USER_DATABASE, PASSWORD_DATABASE } = config;
console.log(USER_DATABASE);

const conexion = new Sequelize(DATABASE, USER_DATABASE, PASSWORD_DATABASE,
{
    host: HOST,
    dialect: 'mysql'
});

conexion.authenticate().then(()=>{
    console.log('conexión a base de datos exitosa');
}).catch(err=>{
    console.log(err);
})

module.exports = conexion;