
import LooperView from './components/frontend';

function getLoopElements() {
	return Array.from(
		document.querySelectorAll(
			'.audioblocks-audiolooper'
		)
	);
}

function initLoop( element ) {
	if ( ! element.dataset.audioUrl ||
		 ! element.dataset.tempoBpm ) {
		return;
	}

	wp.element.render(
		<LooperView
			attributes={ {
				audioUrl: element.dataset.audioUrl,
				tempoBpm: parseFloat( element.dataset.tempoBpm ),
				startOffsetSeconds: parseFloat( element.dataset.startOffsetSeconds ),
			} }
		/>
	, element );
}

function initLoops() {
	const allLoops = getLoopElements();

	allLoops.forEach( loopElement => {
		initLoop( loopElement );
	} );
}

if ( typeof window !== 'undefined' && typeof document !== 'undefined' ) {
	document.addEventListener( 'DOMContentLoaded', initLoops );
}
