import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Mediator from './Mediator';
import Viewport from './Viewport';
import Canvas from './Canvas';

export default class Camera {
	static cameras = [];

	#mediator = new Mediator();
	#viewport = new Viewport();
	#canvas = new Canvas().canvas;

	camera = null;
	controls = null;

	constructor() {
		this.#mountCamera();

		this.constructor.cameras.push(this);

		if (this.constructor.cameras.length === 1) {
			this.#mediator.on('resize', this.constructor.onResize.bind(this.constructor));
		}
	}

	#mountCamera() {
		this.camera = new THREE.PerspectiveCamera(
			75,
			this.#viewport.width / this.#viewport.height,
			0.1,
			100
		);

		this.camera.position.set(4, 1, - 4);

		this.controls = new OrbitControls(this.camera, this.#canvas);

		this.controls.enableDamping = true;
	}

	destory() {
		// Destory camera logic here...

		if (!this.constructor.cameras.length) {
			this.#mediator.off('resize', this.onResize);
		}
	}

	update() {
		this.controls.update();
	}

	resize(width, height) {
		this.camera.aspect = width / height;	
		this.camera.updateProjectionMatrix();
	}

	static onResize(width, height) {
		this.cameras.forEach((camera) => camera.resize(width, height));
	}

	static updateAll() {
		this.constructor.cameras.forEach(({ controls }) => controls.update());
	}
}