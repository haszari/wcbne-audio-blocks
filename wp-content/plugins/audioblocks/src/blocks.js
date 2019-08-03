import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import PlayButton from './components/play-button/save';

import LooperEdit from './components/dj-loop/editor';
import LooperView from './components/dj-loop/save';

registerBlockType( 'soundtrack/playbutton', {
	title: __( 'Play Button', 'cbr-pagesoundtrack' ),
	icon: 'controls-play',
	keywords: [
		__( 'music' ),
		__( 'audio' ),
		__( 'bpm' ),
	],
	attributes: {
	},
	category: 'soundtrack',
	edit: PlayButton,
	save: PlayButton,
} );

registerBlockType( 'soundtrack/loop', {
	title: __( 'DJ Loop', 'cbr-pagesoundtrack' ),
	icon: 'album',
	keywords: [
		__( 'music' ),
		__( 'audio' ),
		__( 'bpm' ),
	],
	attributes: {
		audioUrl: {
			type: 'string',
		},
		audioTitle: {
			type: 'string',
		},
		audioArtist: {
			type: 'string',
		},
		tempoBpm: {
			type: 'number',
			default: 120,
		},
		loopLengthBeats: {
			type: 'number',
			default: 2,
		},
		showCardOnPage: {
			type: 'boolean',
			default: true,
		},
		startOffsetSeconds: {
			type: 'number',
			default: 0,
		},
	},
	category: 'soundtrack',
	edit: LooperEdit,
	save: ( { attributes } ) => (
		<LooperView
			attributes={ attributes }
		/>
	),
} );
