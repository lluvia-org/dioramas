import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Mediator from './Mediator';
import Timer from './Timer';
import Viewport from './Viewport';
import Camera from './Camera';
import Canvas from './Canvas';
import Renderer from './Renderer';
import SettingsGUI from './SettingsGUI';

export default class Engine {
	#canvas = null;
	#renderer = null;
	#mediator = new Mediator();
	#timer = new Timer();
	#scene = new THREE.Scene();
	#camera = new Camera();
	#viewport = new Viewport();
	
	#textureLoader = new THREE.TextureLoader();
	#gltfLoader = new GLTFLoader();
	#cubeTextureLoader = new THREE.CubeTextureLoader();

	#gui = new SettingsGUI();

	constructor(config = {}) {
		this.#canvas = new Canvas(config.canvas).canvas;
		this.#renderer = new Renderer().renderer;

		this.initScene();

		this.start();
	}

	start() {
		this.#timer.play();
		this.#mediator.on('tick', this.#update.bind(this));
	}

	initScene() {
		this.#scene.background = new THREE.Color( 0x000000 );

		// example
		const geometry = new THREE.BoxGeometry( 1, 1, 1 );
		const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
		const cube = new THREE.Mesh( geometry, material );
		this.#scene.add( cube );

		this.#scene.add(this.#camera.camera);
	}

	#update(deltaTime, elapsedTime) {
		// console.log('update', deltaTime, elapsedTime);

		this.#renderer.render(this.#scene, this.#camera.camera);
		this.#camera.update();
	}
}