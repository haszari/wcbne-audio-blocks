import { registerBlockType } from '@wordpress/blocks';

import LooperEdit from './components/editor';
import LooperView from './components/frontend';

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
		tempoBpm: {
			type: 'number',
			default: 120,
		},
		loopLengthBeats: {
			type: 'number',
			default: 2,
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

