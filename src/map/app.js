import * as THREE from 'three';
import CameraControl from './core/CameraControl';
import Renderer from './graphics/Renderer';

const map = {
    camera: null,
    container: null,
    renderer: null,
    sceneRoot: null,
    marker: null,
};

function onUpdate() {
    map.camera.onUpdate();

    map.marker.position.x = map.camera.Camera.position.x;
    map.marker.position.y = map.camera.Camera.position.y;

    onRender();
    window.requestAnimationFrame(onUpdate);
}

function onRender() {
    map.renderer.onRender(map.sceneRoot, map.camera.Camera);
}

function onResize() {
    map.camera.onResize(map.container);
}

function buildBackground(width, height, texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);

    const geometry = new THREE.PlaneGeometry(width * 3, height * 3, 4, 3);
    const material = new THREE.MeshBasicMaterial( { map: texture });
    const planeMesh = new THREE.Mesh(geometry, material);
    planeMesh.position.set(width * -1 + width, height * -1 + height, -1);
    map.sceneRoot.add(planeMesh);
}

function initSocket(socket) {
    map.camera.setHandler('move', position => {
        socket.emit('map:move', position);
    });
}

function initClientSocket(socket) {
    socket.on('map:move', event => {
        map.camera.moveTo(event.x, event.y);
    });
}

export function createMap(container, socket, hasControl) {
    map.container = container;
    map.renderer = new Renderer(container);

    map.camera = new CameraControl(
        map.renderer.Canvas,
        container,
        hasControl
    );

    map.sceneRoot = new THREE.Scene();

    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial();
    const geometry = new THREE.PlaneGeometry(2048, 1536, 1, 1);
    const mesh = new THREE.Mesh(geometry, material);
    loader.load('./maps/test_map.png', (texture) => {
        material.map = texture;
        material.needsUpdate = true;
        mesh.position.set(0, 0, 0);
    });
    map.sceneRoot.add(mesh);

    loader.load('./textures/worn_planks_diff_4k.jpg', (texture) => {
        buildBackground(2048, 1536, texture);
    });

    const cubeGeom = new THREE.BoxGeometry(1, 1, 1);
    const cubeMat = new THREE.MeshBasicMaterial( {color: 0x00ff00 });
    map.marker = new THREE.Mesh(cubeGeom, cubeMat);
    map.marker.position.set(0, 0, 0);
    map.sceneRoot.add(map.marker);

    const light = new THREE.AmbientLight(0xffffff, 0.2);
    light.position.z = 5;
    map.sceneRoot.add(light);

    if (hasControl) {
        initSocket(socket);
    } else {
        initClientSocket(socket);
    }

    window.addEventListener('resize', onResize);
    window.requestAnimationFrame(onUpdate);
}
