const express = require('express');
const helmet = require('helmet');
const userRouter = require('../user/user-router.js');
const cors = require('cors');

const server = express();


server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', userRouter);







module.exports = server;