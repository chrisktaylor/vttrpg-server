import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 10;
const CAMERA_Z = 1;

const ZOOM_MIN = 0.25;
const ZOOM_MAX = 2.0;

export default class CameraControl {
    _camera = null;
    _controls = null;
    _handlers = {};
    _zoomLocked = false;
    _panLocked = false;

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

    constructor(canvas, container, hasInput, hasControl) {
        this._camera = new THREE.OrthographicCamera(-1, 1, 1, -1, CAMERA_NEAR, CAMERA_FAR);
        this._camera.position.set(0, 0, CAMERA_Z);
        this._camera.up = new THREE.Vector3(0, 0, 1);
        this.onResize(container);

        if (hasInput) {
            this._controls = new OrbitControls(this._camera, canvas);
            this._controls.mouseButtons = { MIDDLE: THREE.MOUSE.PAN };
            this._controls.zoom = 1;
            this._controls.minZoom = ZOOM_MIN;
            this._controls.maxZoom = ZOOM_MAX;
            this._controls.enableDamping = true;
            this._controls.enableRotate = false;
            this._controls.dampingFactor = 0.95;
        }
        if (hasControl) {
            this._controls.addEventListener('change', (event) => this._move(event));
        }

        this.onUpdate();
    }

    setHandler(id, handler) {
        this._handlers[id] = handler;
    }

    toggleZoom() {
        this._zoomLocked = !this._zoomLocked;
        this._controls.enableZoom = !this._zoomLocked;
    }

    togglePan() {
        this._panLocked = !this._panLocked;
        this._controls.enablePan = !this._panLocked;
    }

    moveTo(x, y, zoom = null) {
        this._camera.position.set(x, y, CAMERA_Z);
        if (zoom !== null) {
            this._camera.zoom = zoom;
        }
        this.onUpdate();
    }

    onUpdate() {
        this._camera.updateProjectionMatrix();
        if (this._controls) {
            this._camera.rotation.set(0, 0, 0);
        }
    }

    onResize(container) {
        this._camera.left = container.clientWidth / -2;
        this._camera.right = container.clientWidth / 2;
        this._camera.top = container.clientHeight / 2;
        this._camera.bottom = container.clientHeight / -2;
        this._camera.updateProjectionMatrix();
    }

    _move(event) {
        if (this._handlers['change'] && event?.type === 'change') {
            const values = {
                x: this.Position.x,
                y: this.Position.y,
            };

            if (!this._zoomLocked) {
                values.zoom = this.Zoom;
            }

            this._handlers['change'](values);
        }
    }
}
