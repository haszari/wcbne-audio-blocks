
import {
	Panel,
	PanelBody,
	PanelRow,
	RangeControl,
} from '@wordpress/components';
import {
	InspectorControls,
} from '@wordpress/block-editor';
import { Component } from '@wordpress/element';

import PlayButton from './save';

import library from '../../library';

class PlayButtonEdit extends Component {
	constructor( props ) {
		super( props );
	}

	render() {
		const {
			attributes,
			setAttributes,
			className,
		} = this.props;
		const {
			playbackBpm,
		} = attributes;

		const sidebarControls = (
			<InspectorControls>
					<PanelBody
						title="Playback Settings"
						initialOpen={ true }
					>
						<RangeControl
							label="Tempo (beats per minute)"
							help="Set the playback tempo for all loops on the page."
							value={ library.getTempoValue( playbackBpm ) }
							onChange={
								( value ) => setAttributes( { playbackBpm: library.getTempoValue( value ) } )
							}
							min={ library.tempoMinimum }
							max={ library.tempoMaximum }
						/>
					</PanelBody>
			</InspectorControls>
		);

		return (
			<div className={ className }>
				{ sidebarControls }
				<PlayButton attributes={ attributes } />
			</div>
		);
	}
};

export default PlayButtonEdit;

