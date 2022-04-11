import * as dat from 'lil-gui';

export default class SettingsGUI {
	static instance = null;

	constructor () {
		if (this.constructor.instance) {
			return this.constructor.instance;
		}

		this.constructor.instance = this;

		this.gui = new dat.GUI();
	}
}