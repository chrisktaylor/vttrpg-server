import * as THREE from 'three';
import CameraControl from './CameraControl';
import Renderer from '../graphics/Renderer';

const defaults = {
    hasControl: false,
};

export default class MapControl {
    _camera = null;
    _container = null;
    _renderer = null;
    _running = false;
    _sceneRoot = new THREE.Scene();
    _settings = null;
    _socket = null;
    _resizeObserver = new ResizeObserver(this.onResize.bind(this));

    constructor(container, socket, options) {
        this._container = container;
        this._renderer = new Renderer(container);
        this._settings = Object.assign(defaults, options);
        this._camera = new CameraControl(
            this._renderer.Canvas,
            this._container,
            this._settings.hasInput,
            this._settings.hasControl,
        );
        this._socket = socket;
        this._resizeObserver.observe(this._container);

        this._initMode();
        this._loadMap();
    }

    start() {
        if (this._running) return;

        this._running = true;
        window.requestAnimationFrame(this._onUpdate.bind(this));
    }

    stop() {
        this._running = false;
    }

    onResize() {
        this._renderer.onResize(this._container);
        this._camera.onResize(this._container);
    }

    _onRender() {
        this._renderer.onRender(this._sceneRoot, this._camera.Camera);
    }

    _onUpdate() {
        this._camera.onUpdate();

        this._onRender();

        if (this._running) {
            window.requestAnimationFrame(this._onUpdate.bind(this));
        }
    }

    _initMode() {
        if (this._settings.hasControl) {
            this._camera.setHandler('change', (event) => {
                this._socket.emit('map:change', event);
            });
        } else {
            this._socket.on('map:change', (event) => {
                this._camera.moveTo(event.x, event.y, event.zoom);
            });
        }
    }

    _loadMap() {
        const loader = new THREE.TextureLoader();
        const material = new THREE.MeshBasicMaterial();
        const geometry = new THREE.PlaneGeometry(2048, 1536, 1, 1);
        const mesh = new THREE.Mesh(geometry, material);
        loader.load('./maps/test_map.png', (texture) => {
            material.map = texture;
            material.needsUpdate = true;
            mesh.position.set(0, 0, 0);
        });
        this._sceneRoot.add(mesh);
    }
}
