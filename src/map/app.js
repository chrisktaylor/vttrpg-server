import MapControl from './core/MapControl';

let mapControl = null;

export function createMap(container, socket, options) {
    mapControl = new MapControl(container, socket, options);
    mapControl.start();
}

export function start() {
    if (mapControl) mapControl.start();
}

export function stop() {
    if (mapControl) mapControl.stop();
}
