import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const Y_AXIS = new THREE.Vector3(0, 1, 0);
const DEG_TO_RAD = Math.PI / 45;
const DRAG_BUTTON = 0;

const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 10;
const CAMERA_Z = 1;

var panOffset = new THREE.Vector3();
var minPan = new THREE.Vector3(-100, -2, CAMERA_Z);
var maxPan = new THREE.Vector3(100, 2, CAMERA_Z);

export default class CameraController {
    _camera = null;
    _controls = null;
    _handlers = {};

    get Camera() { return this._camera; }
    get Position() {
        return {
            x: Math.round(this._camera.position.x),
            y: Math.round(this._camera.position.y),
        };
    }

    constructor(canvas, container, hasControl) {
        this._camera = new THREE.OrthographicCamera(-1, 1, 1, -1, CAMERA_NEAR, CAMERA_FAR);
        this._camera.position.set(0, 0, CAMERA_Z);
        this._camera.up = new THREE.Vector3(0, 0, 1);
        this.onResize(container);

        if (hasControl) {
            this._controls = new OrbitControls(this._camera, canvas);
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

    moveTo(x, y) {
        this._camera.position.set(x, y, CAMERA_Z);
        this.onUpdate();
    }

    onUpdate() {
        if (this._controls) {
            this._controls.update();
            this._move();
        }
    }

    onResize(container) {
        this._camera.left = container.clientWidth / -2;
        this._camera.right = container.clientWidth / 2;
        this._camera.top = container.clientHeight / 2;
        this._camera.bottom = container.clientHeight / -2;
        this._camera.updateProjectionMatrix();
    }

    _move(e) {
        if (this._handlers['move'] && e?.type === 'change') {
            this._handlers['move'](this.Position);
        }
    }
}
