import * as THREE from 'three';

export default class Renderer {
    _renderer = null;
    _container = null;
    _camera = null;
    _scene = null;
    _size = { width: 0, height: 0 };

    get Canvas() { return this._renderer.domElement; }
    get Aspect() { return this._size.width / this._size.height; }
    get Width() { return this._size.width; }
    get Height() { return this._size.height; }

    constructor(container) {
        this._renderer = new THREE.WebGLRenderer();
        this._container = container;
        this.setSize(container.clientWidth, container.clientHeight);
        this._container.appendChild(this._renderer.domElement);
    }

    setSize(width, height) {
        this._size.width = width;
        this._size.height = height;
        this._renderer.setSize(width, height);
    }

    onRender(scene, camera) {
        this._renderer.render(scene, camera);
    }
}
