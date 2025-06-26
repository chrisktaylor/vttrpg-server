import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 10;
const CAMERA_Z = 1;

const ZOOM_MIN = 0.1;
const ZOOM_MAX = 2.0;

export default class CameraControl {
    _camera = null;
    _controls = null;
    _handlers = {};

    get Camera() {
        return this._camera;
    }
    get Position() {
        return {
            x: Math.round(this._camera.position.x),
            y: Math.round(this._camera.position.y),
        };
    }
    get Zoom() {
        return this._camera.zoom;
    }

    set Zoom(value) {
        if (value >= ZOOM_MIN && value <= ZOOM_MAX) {
            this._camera.zoom = value;
            this._updateCamera();
        }
    }

    constructor(canvas, container, hasControl) {
        this._camera = new THREE.OrthographicCamera(-1, 1, 1, -1, CAMERA_NEAR, CAMERA_FAR);
        this._camera.position.set(0, 0, CAMERA_Z);
        this._camera.up = new THREE.Vector3(0, 0, 1);
        this.onResize(container);

        if (hasControl) {
            this._controls = new OrbitControls(this._camera, canvas);
            this._controls.mouseButtons = { MIDDLE: THREE.MOUSE.PAN };
            this._controls.zoom = 1;
            this._controls.enableDamping = true;
            this._controls.enableRotate = false;
            this._controls.dampingFactor = 0.95;

            this._controls.addEventListener('change', (e) => this._move(e));
        }

        this.onUpdate();
    }

    setHandler(id, handler) {
        this._handlers[id] = handler;
    }

    moveTo(x, y, zoom = null) {
        this._camera.position.set(x, y, CAMERA_Z);
        if (zoom !== null) {
            this.Zoom = zoom;
        }
        this.onUpdate();
    }

    onUpdate() {
        if (this._controls) {
            this._controls.update();
            this._camera.rotation.set(0, 0, 0);
            this._move();
        }
    }

    onResize(container) {
        this._camera.left = container.clientWidth / -2;
        this._camera.right = container.clientWidth / 2;
        this._camera.top = container.clientHeight / 2;
        this._camera.bottom = container.clientHeight / -2;
        this._updateCamera();
    }

    _move(e) {
        if (this._handlers['change'] && e?.type === 'change') {
            this._handlers['change']({
                x: this.Position.x,
                y: this.Position.y,
                zoom: this.Zoom,
            });
        }
    }

    _updateCamera() {
        this._camera.updateProjectionMatrix();
    }
}
