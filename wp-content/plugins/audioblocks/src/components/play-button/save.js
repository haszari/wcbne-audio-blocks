
import { Component } from '@wordpress/element';

class PlayButton extends Component {
	constructor( { attributes } ) {
		super( { attributes } );
	}

	render() {
		return (
			<div>
				<button>Play</button>
			</div>
		);
	}
};

export default PlayButton;

