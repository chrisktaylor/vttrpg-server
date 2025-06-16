import * as Config from '../config/config.js';
import { createServer } from 'node:http';
import createExpress from './api/createExpress.js';
import createSocket from './socket/createSocket.js';

const app = createExpress();
const server = createServer(app);
createSocket(server);

server.listen(Config.Server.Port, () => {
    console.log(`Server running at ${Config.Server.Url}`);
});

export default {
    close: function() {
        console.log('Stopping server.');
        server.closeAllConnections();
        server.close();
    }
}
