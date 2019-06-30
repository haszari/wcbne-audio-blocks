import { registerBlockType } from '@wordpress/blocks';

import LooperEdit from './components/editor';
import LooperView from './components/save';

registerBlockType( 'audioblocks/loop', {
	title: 'Audio Loop',
	icon: 'format-audio',
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
	category: 'audioblocks',
	edit: LooperEdit,
	save: ( { attributes } ) => (
		<LooperView
			attributes={ attributes }
		/>
	),
} );

