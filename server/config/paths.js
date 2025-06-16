import { fileURLToPath } from 'url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = path.join(__dirname, '../../');
const serverPath = path.join(rootPath, 'server');
const publicPath = path.join(serverPath, 'public');
const staticPath = path.join(serverPath, 'static'); // Path from which to serve JSON files.

export default function getPaths() {
    return {
        Root: rootPath,
        Server: serverPath,
        Public: publicPath,
        Static: staticPath,
    };
}
