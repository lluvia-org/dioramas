import Mediator from './Mediator';

export default class Viewport {
	static instance = null;

	#mediator = new Mediator();

	width = window.innerWidth;
	height = window.innerHeight;

	constructor() {
		if (this.constructor.instance) {
			return this.constructor.instance;
		}

		this.constructor.instance = this;

		this.#watchViewport();
	}

	#watchViewport() {
		window.addEventListener('resize', () => {
			this.width = window.innerWidth;
			this.height = window.innerHeight;

			this.#mediator.trigger(
				'resize',
				this.width,
				this.height
			);
		});
	}
}