
import LooperView from './components/frontend';

function getLoopElements() {
	return Array.from(
		document.querySelectorAll(
			'.audioblocks-audiolooper'
		)
	);
}

function initLoop( element ) {
	if ( ! element.dataset.audioUrl ) {
		return;
	}

	wp.element.render(
		<LooperView
			audioUrl={ element.dataset.audioUrl }
			tempoBpm={ element.dataset.tempoBpm }
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
