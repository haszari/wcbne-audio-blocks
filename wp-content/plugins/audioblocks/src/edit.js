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
		tempoBpm: {
			type: 'number',
			default: 120,
		}
	},
	category: 'audioblocks',
	edit: LooperEdit,
	save: ( { attributes } ) => (
		<LooperView
			audioUrl={ attributes.audioUrl }
			tempoBpm={ attributes.tempoBpm }
		/>
	),
} );

