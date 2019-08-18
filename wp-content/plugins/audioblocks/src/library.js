
/**
 * External dependencies
 */
import {
	clamp,
} from 'lodash';

class Library {
	constructor() {
		// constants
		this.tempoMaximum = 180;
		this.tempoDefault = 120;
		this.tempoMinimum = 50;
	}

	getTempoValue( raw ) {
		return parseFloat( raw ) ? clamp( raw, this.tempoMinimum, this.tempoMaximum ) : this.tempoDefault;
	}
}

export default ( new Library() );

