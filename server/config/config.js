import dotenv from 'dotenv';
import path from 'node:path';

import getPaths from './paths.js';
import getServer from './server.js';

const Paths = getPaths();
dotenv.config({ path: path.join(Paths.Root, '.env')});

const Server = getServer();

export {
    Paths,
    Server,
}
