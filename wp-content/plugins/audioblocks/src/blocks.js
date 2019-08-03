import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

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
	edit: ( { attributes } ) => (
		<div>Play Button (TBC)</div>
	),
	save: ( { attributes } ) => (
		<div>Play Button (TBC)</div>
	),
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

