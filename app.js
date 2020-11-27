require('dotenv').config();
const Server = require('./src/startup/server');
const config = require('./src/startup/config');

const server = new Server(config);

server.runServer();