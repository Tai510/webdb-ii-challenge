const express = require('express');
const helmet = require('helmet');
const zooRouter = require('./router/zoo-router')
const server = express();

server.use(express.json());
server.use(helmet());

module.exports = server;

// module.exports = server;