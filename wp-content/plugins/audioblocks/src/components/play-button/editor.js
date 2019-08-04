import { __ } from '@wordpress/i18n';
import {
	PanelBody,
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
						title={ __( 'Playback Settings', 'cbr-pagesoundtrack' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Tempo (beats per minute)', 'cbr-pagesoundtrack' ) }
							help={ __( 'Set the playback tempo for all loops on the page.', 'cbr-pagesoundtrack' ) }
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

