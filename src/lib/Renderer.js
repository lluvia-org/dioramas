import * as THREE from 'three';
import Canvas from './Canvas';
import Viewport from './Viewport';
import Mediator from './Mediator';

export default class SettingsGUI {
	static instance = null;

	#canvas = new Canvas().canvas;
	#viewport = new Viewport();
	#mediator = new Mediator();
	
	renderer = null;

	constructor () {
		if (this.constructor.instance) {
			return this.constructor.instance;
		}

		this.constructor.instance = this;

		this.#mountRenderer();
	}

	#mountRenderer() {
		const renderer = new THREE.WebGLRenderer({
			canvas: this.#canvas,
			antialias: false,
		});
		
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFShadowMap;
		renderer.physicallyCorrectLights = true;
		renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1;
		renderer.setSize(this.#viewport.width, this.#viewport.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		
		this.#mediator.on('resize', renderer.setSize.bind(renderer));
		
		this.renderer = renderer;
	}
}