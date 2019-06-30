
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import {
	Button,
	ButtonGroup,
	RangeControl,
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

import LooperView from './save';

const ALLOWED_MEDIA_TYPES = [ 'audio' ];

function AudioMediaUpload( ) {
	// const media = attributes.audio;
	return ;
}

class LooperEdit extends Component {
	constructor( { attributes } ) {
		super( { attributes } );

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
		const { attributes, setAttributes, isSelected } = this.props;
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
						<Button isDefault onClick={ open }>
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
						icon: 'album',
						title: 'Show card on page',
						isActive: showCardOnPage,
						onClick: () => setAttributes( {
							showCardOnPage: ! showCardOnPage
						} )
					}
				]}>
				</Toolbar>
			</BlockControls>
		);

		const sidebarControls = (
			<InspectorControls>
			    <RangeControl
			        label="Tempo"
			        help="Set the tempo of your loop (in beats per minute)."
			        value={ tempoBpm }
			        onChange={
			        	( value ) => setAttributes( { tempoBpm: value } )
			        }
			        min={ 50 }
			        max={ 180 }
			    />
			    <ButtonGroup>
					{ loopSizes }
			    </ButtonGroup>
			    <TextControl
			        label="Start Offset"
			        help="Set the start time of the first beat of your loop (in seconds)."
			        value={ startOffsetSeconds }
			        onChange={
			        	( value ) => setAttributes( { startOffsetSeconds: value } )
			        }
			    />
			</InspectorControls>
		);

		return (
			<div>
				{ blockToolbar }
				{ sidebarControls }
				{ audioMediaUpload }
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

