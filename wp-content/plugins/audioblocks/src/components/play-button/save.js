
import { Component } from '@wordpress/element';

import library from '../../library';

import PlayButton from './save';

class PlayButtonEdit extends Component {
	constructor( { attributes } ) {
		super( { attributes } );
	}

	render() {
		const { attributes } = this.props;
		const {
			playbackBpm,
		} = attributes;

		return (
			<div>
				<button
					data-page-tempo={ library.getTempoValue( playbackBpm ) }
					type='button'>Play</button>
			</div>
		);
	}
};

export default PlayButtonEdit;

