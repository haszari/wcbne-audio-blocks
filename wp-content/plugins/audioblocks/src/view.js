
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

	// TODO set up the audio experience here
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
