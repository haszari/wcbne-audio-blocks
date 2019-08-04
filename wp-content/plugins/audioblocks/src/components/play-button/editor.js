
import {
	RangeControl,
} from '@wordpress/components';
import {
	InspectorControls,
} from '@wordpress/block-editor';
import { Component } from '@wordpress/element';

import PlayButton from './save';

import library from '../../library';

class PlayButtonEdit extends Component {
	constructor( { attributes } ) {
		super( { attributes } );
	}

	render() {
		const { attributes, setAttributes } = this.props;
		const {
			playbackBpm,
		} = attributes;

		const sidebarControls = (
			<InspectorControls>
				<RangeControl
					label="Playback Tempo"
					help="Tempo for all loops on the page."
					value={ library.getTempoValue( playbackBpm ) }
					onChange={
						( value ) => setAttributes( { playbackBpm: library.getTempoValue( value ) } )
					}
					min={ library.tempoMinimum }
					max={ library.tempoMaximum }
				/>
			</InspectorControls>
		);

		return (
			<div>
				{ sidebarControls }
				<button type='button'>Play</button>
			</div>
		);
	}
};

export default PlayButtonEdit;

