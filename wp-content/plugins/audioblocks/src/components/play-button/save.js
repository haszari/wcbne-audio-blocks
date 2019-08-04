
import { Component } from '@wordpress/element';

import library from '../../library';

import PlayButton from './save';

class PlayButtonEdit extends Component {
	constructor( { attributes } ) {
		super( { attributes } );
	}

	render() {
		return (
			<div>
				<button
					type='button'>Play</button>
			</div>
		);
	}
};

export default PlayButtonEdit;

