import * as Config from '../../config/config.js';
import express from 'express';
import path from 'node:path';

let app = null;

function listen() {
    app.get(Config.Server.IndexPaths, (req, res) => {
        res.sendFile(path.join(Config.Paths.Public, Config.Server.IndexFile));
    });

    app.get('/api', (req, res) => {
        res.send('Hello world!');
    });
}

export default function createExpress() {
    app = express();

    app.use(express.static(Config.Paths.Public));
    app.use(express.static(Config.Paths.Static));

    listen();

    return app;
}
