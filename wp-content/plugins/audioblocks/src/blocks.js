import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import PlayButton from './components/play-button/save';
import PlayButtonEdit from './components/play-button/editor';

import LooperEdit from './components/dj-loop/editor';
import LooperView from './components/dj-loop/save';

registerBlockType( 'soundtrack/playbutton', {
	title: __( 'Play Button', 'cbr-pagesoundtrack' ),
	icon: 'controls-play',
	description: __( 'Allows users to start and stop the page audio soundtrack.', 'cbr-pagesoundtrack' ),
	keywords: [
		__( 'music' ),
		__( 'audio' ),
		__( 'bpm' ),
	],
	attributes: {
		playbackBpm: {
			type: 'number',
			source: 'meta',
			meta: 'pagesoundtrack_playbackbpm',
		},
	},
	category: 'soundtrack',
	edit: PlayButtonEdit,
	save: PlayButton,
} );

registerBlockType( 'soundtrack/loop', {
	title: __( 'DJ Loop', 'cbr-pagesoundtrack' ),
	icon: 'album',
	description: __( 'Add a beat-synched loop to the page soundtrack.', 'cbr-pagesoundtrack' ),
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
			default: 4,
		},
		showCardOnPage: {
			type: 'boolean',
			default: true,
		},
		startOffsetSeconds: {
			type: 'string',
			default: 0,
		},
	},
	category: 'soundtrack',
	edit: LooperEdit,
	save: LooperView,
} );

