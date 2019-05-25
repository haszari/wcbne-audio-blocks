
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';

import LooperView from './frontend';

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
		console.log( `Selected audio id=${ media.id } url=${ media.url }` );

		if ( ! media || ! media.url ) {
			this.props.setAttributes( {
				audioId: undefined,
				audioUrl: undefined,
			} );
			return;
		}

		this.props.setAttributes( {
			audioId: media.id,
			audioUrl: media.url,
		} );
	}

	render() {
		const { attributes, setAttributes } = this.props;
		const { audioId, audioUrl } = attributes;

		const audioMediaUpload = (
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ this.onSelectAudioFile }
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					// value={ 0 }
					render={ ( { open } ) => (
						<Button onClick={ open }>
							Choose audio…
						</Button>
					) }
				/>
			</MediaUploadCheck>
		);

		// const frontend = looperView( attributes );

		return (
			<div>
				{ audioMediaUpload }
				<LooperView audioUrl={ audioUrl } />
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

