const express = require('express');
const helmet = require('helmet');
const userRouter = require('../user/user-router.js');
const cors = require('cors');
const session = require('express-session');
const sessionConfig = require('../data/session-config.js');

const server = express();

server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', userRouter);


module.exports = server;