import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import LooperEdit from './components/editor';
import LooperView from './components/save';

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

