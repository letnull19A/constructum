"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const logger_1 = require("@tsed/logger");
logger_1.$log.level = 'debug';
logger_1.$log.name = 'SOCKETS';
const io = new socket_io_1.Server({});
io.on('connection', (socket) => {
    logger_1.$log.info('successfull connection');
});
io.listen(process.env.PORT | 12245);
