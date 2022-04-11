import Mediator from './Mediator';

export default class Timer {
	static instance = null;

	#start = new Date();
	#currentTime = this.#start;
	#playing = false;
	#mediator = new Mediator();

	constructor () {
		if (this.constructor.instance) {
			return this.constructor.instance;
		}

		this.constructor.instance = this;
	}

	#tick() {
		if (!this.#playing) {
			return;
		}

		const newTime = new Date();
		const elapsedTime = newTime - this.#start;
		const deltaTime = newTime - this.#currentTime;
		this.#currentTime = newTime;
		this.#mediator.trigger('tick', deltaTime, elapsedTime);

		window.requestAnimationFrame(this.#tick.bind(this));
	}

	play() {
		if (this.#playing) {
			return;
		}

		this.#playing = true;
		this.#start = new Date();

		window.requestAnimationFrame(this.#tick.bind(this));
	}

	pause() {
		this.#playing = false;
	}
}