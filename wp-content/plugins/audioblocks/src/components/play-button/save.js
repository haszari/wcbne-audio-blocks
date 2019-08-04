
import { Component } from '@wordpress/element';

import library from '../../library';

class PlayButton extends Component {
	constructor( { attributes } ) {
		super( { attributes } );
	}

	render() {
		return (
			<div>
				<button type='button'>Play</button>
			</div>
		);
	}
};

export default PlayButton;

