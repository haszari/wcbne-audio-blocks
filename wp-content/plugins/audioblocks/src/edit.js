import { registerBlockType } from '@wordpress/blocks';

import LooperEdit from './components/editor';
import LooperView from './components/frontend';

registerBlockType( 'audioblocks/loop', {
	title: 'Audio Loop',
	icon: 'format-audio',
	attributes: {
		audioUrl: {
			type: 'string',
		}
	},
	category: 'audioblocks',
	edit: LooperEdit,
	save: ( { attributes } ) => (
		<LooperView audioUrl={ attributes.audioUrl } />
	),
} );

