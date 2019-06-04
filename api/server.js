const express = require('express');
const helmet = require('helmet');
const zooRouter = require('../router/zoo-router.js')
const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/zoos', zooRouter);

module.exports = server;

// module.exports = server;