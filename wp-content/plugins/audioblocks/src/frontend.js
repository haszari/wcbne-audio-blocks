
import Looper from './components/dj-loop/frontend-looper';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();


function getLoopElements() {
	return Array.from(
		document.querySelectorAll(
			'.wp-block-soundtrack-loop div[data-audio-url]'
		)
	);
}

function getPlayButtonElements() {
	return Array.from(
		document.querySelectorAll(
			'.wp-block-soundtrack-playbutton button'
		)
	);
}

const pageState = {
	loopers: [],
	playButtons: [],
	isPlaying: false,
	playbackTempo: 0,
}

function onScrollChange() {
	const scrollPosition = window.pageYOffset / ( document.body.scrollHeight - window.innerHeight);

	const numLoops = pageState.loopers.length;

	if ( 1 === numLoops ) {
		// constant level
		pageState.loopers[0]?.setPlaybackLevel( 1.0 );
	}
	if ( 2 === numLoops ) {
		const faderPosition = scrollPosition;
		// crossfade, top of page = loop 1, end of page = loop 2
		pageState.loopers[ 0 ]?.setPlaybackLevel( 1.0 - faderPosition );
		pageState.loopers[ 1 ]?.setPlaybackLevel( faderPosition );
	}
	else if ( 2 <= numLoops ) {
		// many loops, split up page evenly
		const perLoop = 1.0 / ( numLoops - 1 );
		const loopPosition = scrollPosition / perLoop;
		const leftLoop = Math.floor( loopPosition );
		const faderPosition = loopPosition - leftLoop;
		if ( pageState.loopers[ leftLoop ] ) {
			pageState.loopers[ leftLoop ]?.setPlaybackLevel( 1.0 - faderPosition );
		}
		if ( leftLoop < ( numLoops - 1 ) ) {
			pageState.loopers[ leftLoop + 1 ]?.setPlaybackLevel( faderPosition );
		}
	}
}

function togglePlayback() {
	audioContext.resume().then( function() {
		pageState.isPlaying = ! pageState.isPlaying;

		// initialise volume of each loop
		onScrollChange();

		// toggle playback of all loops
		pageState.loopers.forEach( looper => {
			looper.setPlaybackTempo( pageState.playbackTempo );
			looper.setPlaying( pageState.isPlaying );
		} );

		// show play state in button label
		const label = pageState.isPlaying ? 'Stop' : 'Play';
		pageState.playButtons.forEach( playButton => {
			playButton.textContent = label;
		} );
	} );
}

function disablePlayButtons( label, tooltip ) {
	pageState.playButtons = getPlayButtonElements();

	pageState.playButtons.forEach( playButton => {
		playButton.disabled = true;
		playButton.textContent = label;
		playButton.title = tooltip;
	} );
}

function setupPlayButtons() {
	pageState.playButtons = getPlayButtonElements();

	pageState.playButtons.forEach( playButton => {
		playButton.disabled = false;
		playButton.textContent = 'Play'
		playButton.addEventListener( 'click', togglePlayback );
	} );
}

function getPageTempo() {
	let tempo = 0;

	const pageTempoMetaElement = document.querySelector( '#page-soundtrack-tempo' );
	if ( ! pageTempoMetaElement ) {
		return tempo;
	}

	if ( ! pageTempoMetaElement.dataset.pageSoundtrackTempo ) {
		return tempo;
	}

	return pageTempoMetaElement.dataset.pageSoundtrackTempo;
}

function setupPageSoundtrack() {
	disablePlayButtons( 'Soundtrack disabled', 'Page soundtrack is disabled on multi-post pages. View full post to play soundtrack.' );

	const allLoops = getLoopElements();

	pageState.playbackTempo = getPageTempo();

	// Leave everything disabled if tempo is not available.
	// This is used to disable soundtrack on archive / multi post pages.
	if ( pageState.playbackTempo < 1 ) {
		return;
	}

	disablePlayButtons( 'Loading', 'Loading audio files for page soundtrack…' );

	const loopersProps = allLoops.map( element => {
		return {
			audioContext: audioContext,
			audioUrl: element.dataset.audioUrl,
			tempoBpm: parseFloat( element.dataset.tempoBpm ),
			loopLengthBeats: parseFloat( element.dataset.loopLengthBeats ),
			loopStartBeats: parseFloat( element.dataset.loopStartBeats ),
			startOffsetSeconds: parseFloat( element.dataset.startOffsetSeconds ),
		};
	} );

	const loaders = [];
	loopersProps.forEach( props => {
		if ( ! props.audioUrl ||
			 ! props.tempoBpm ) {
			return;
		}
		const looper = new Looper( props );
		pageState.loopers.push( looper );
		loaders.push( looper.loadAudioPromise() );
	} );

	Promise.all( loaders ).then( () => {
		setupPlayButtons();
	} );
}


if ( typeof window !== 'undefined' && typeof document !== 'undefined' ) {
	document.addEventListener( 'DOMContentLoaded', setupPageSoundtrack );
	window.addEventListener( 'scroll', onScrollChange );
}
