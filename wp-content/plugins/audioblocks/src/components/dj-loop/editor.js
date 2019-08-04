import { __ } from '@wordpress/i18n';

import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import {
	Button,
	IconButton,
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	TextControl,
	Toolbar,
} from '@wordpress/components';
import {
	BlockControls,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { Component } from '@wordpress/element';

import library from '../../library';

import LooperView from './save';

const ALLOWED_MEDIA_TYPES = [ 'audio' ];

class LooperEdit extends Component {
	constructor( props ) {
		super( props );

		this.onSelectAudioFile = this.onSelectAudioFile.bind( this );
	}

	onSelectAudioFile( media ) {
		// console.log( `Selected audio id=${ media.id } url=${ media.url }` );

		if ( ! media || ! media.url ) {
			this.props.setAttributes( {
				audioId: undefined,
				audioUrl: undefined,
				audioTitle: undefined,
				audioArtist: undefined,
			} );
			return;
		}

		this.props.setAttributes( {
			audioId: media.id,
			audioUrl: media.url,
			audioTitle: media.title,
			audioArtist: media.artist,
		} );
	}

	hasAudio() {
		const { audioUrl } = this.props.attributes;
		return ( audioUrl );
	}

	render() {
		const {
			attributes,
			className,
			isSelected,
			setAttributes,
		} = this.props;
		const {
			audioId,
			audioTitle,
			audioUrl,
			tempoBpm,
			loopLengthBeats,
			showCardOnPage,
			startOffsetSeconds,
		} = attributes;

		const setAudioButtonLabel = this.hasAudio() ? 'Replace audio…' : 'Choose audio…';

		const audioMediaUpload = isSelected ? (
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ this.onSelectAudioFile }
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					render={ ( { open } ) => (
						<Button onClick={ open }>
							{ setAudioButtonLabel }
						</Button>
					) }
				/>
			</MediaUploadCheck>
		) : null;

		function loopSizeButton( beats ) {
			return (
				<Button
					isPrimary={ loopLengthBeats === beats }
					onClick={ ( value ) => setAttributes( { loopLengthBeats: beats } ) }>
					{ beats }
				</Button>
			);
		};
		const loopSizes = [ 1, 2, 4, 8 ].map( loopSizeButton );

		const blockToolbar = (
			<BlockControls>
				<Toolbar controls={[
					{
						icon: 'hidden',
						label: 'Hide card in frontend',
						isActive: ! showCardOnPage,
						onClick: () => setAttributes( {
							showCardOnPage: ! showCardOnPage
						} )
					}
				]}>
				  { audioMediaUpload }
				</Toolbar>
			</BlockControls>
		);

		const sidebarControls = (
			<InspectorControls>
				<PanelBody
					title="Loop Settings"
					initialOpen={ true }
				>
					<RangeControl
						label="Tempo (beats per minute)"
						help="Set the tempo of the audio file."
						value={ tempoBpm }
						onChange={
							( value ) => setAttributes( { tempoBpm: value } )
						}
						min={ library.tempoMinimum }
						max={ library.tempoMaximum }
						/>
					<SelectControl
						label={ __( 'Loop length', 'cbr-pagesoundtrack' ) }
						help={ __( 'Set the length of the loop.', 'cbr-pagesoundtrack' ) }
						value={ loopLengthBeats }
						onChange={
							( value ) => setAttributes( { loopLengthBeats: parseInt(value) } )
						}
						options={ [
							{ value: 1, label: '1 beat' },
							{ value: 4, label: '1 bar (4 beats)' },
							{ value: 8, label: '2 bars' },
							{ value: 16, label: '4 bars' },
							{ value: 32, label: '8 bars' },
						] }
					>
					</SelectControl>
				</PanelBody>
			</InspectorControls>
		);

		const placeholder = this.hasAudio() ? undefined : (
			<Placeholder
				icon='album'
				instructions='Click "Choose audio…" to select an audio file to loop.'
			/>
		);

		return (
			<div className={ className }>
				{ blockToolbar }
				{ sidebarControls }
				{ placeholder }
				<LooperView attributes={ attributes } />
			</div>
		);
	}
};

export default compose( [
	withSelect( ( select, props ) => {
		const { getMedia } = select( 'core' );
		const { audioMediaId } = props.attributes;

		return {
			audio: audioMediaId ? getMedia( audioMediaId ) : null,
		};
	} ),
] )( LooperEdit );

