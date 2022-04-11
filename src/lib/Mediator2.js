export default class Mediator {
	
	static instance = null;

	#events = {};

	constructor () {
		if (this.constructor.instance) {
			return this.constructor.instance;
		}

		this.constructor.instance = this;
	}

	on(event, callback) {
		if (!event) {
			console.warn('Event id not defined');
			return;
		}

		if (!this.#events[event]) {
			this.#events[event] = [];
		}

		this.#events[event].push(callback);
	}

	off(event, callback) {
		if (!this.#events[event]) {
			console.warn(`Unable to remove callback for "${event}" event. Does not exist.`);
			return;
		}

		this.#events[event] = this.#events[event].filter(
			(eventCallback) => eventCallback !== callback
		);
	}

	trigger(event, ...eventArgs) {
		if (!this.#events[event]) {
			console.warn(`Unable to trigger callbacks for "${event}" event. Does not exist.`);
			return;
		}

		this.#events[event].forEach((callback) => callback(...eventArgs));
	}
}