import os from 'os';
import process from 'node:process';

// Adapted from https://stackoverflow.com/a/15075395
const getLocalIp = () => {
    const networkInterfaces = os.networkInterfaces();
    const interfaces = Object.values(networkInterfaces);
    for (const net of interfaces) {
        for (const addr of net) {
            if (!addr) continue;
            if (addr.family === 'IPv4' && !addr.internal) {
                return addr.address;
            }
        }
    }
    return 'localhost';
};

export default function getServer() {
    const serverProtocol = process.env.SERVER_PROTOCOL ?? 'http';
    const serverPort = process.env.SERVER_PORT ?? 3000;
    const serverAddress = getLocalIp();
    const serverIndex = process.env.SERVER_INDEX ?? 'index.html';
    const serverUrl = `${serverProtocol}://${serverAddress}:${serverPort}`;
    return {
        Port: serverPort,
        Url: serverUrl,
        IndexPaths: ['/', '/display', '/dm', '/editor', '/initiative', '/player', '/server'],
        IndexFile: serverIndex,
    };
}
