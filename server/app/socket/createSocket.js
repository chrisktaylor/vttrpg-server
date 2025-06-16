
import * as Config from '../../config/config.js'
import { Server } from 'socket.io';

let io = null;

function connect() {
    io.on('connection', () => {
        console.log(`Connection at ${Config.Server.Url}`);
    });
}

export default function createSocket(server) {
    io = new Server(server);
    connect();

    return io;
}

