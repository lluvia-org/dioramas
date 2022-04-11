export default class Canvas {
	static instance = null;

	canvas = null;

	constructor (canvas) {
		if (this.constructor.instance) {
			return this.constructor.instance;
		}

		this.constructor.instance = this;

		this.canvas = canvas ?? document.querySelector('canvas.webgl');
	}
}