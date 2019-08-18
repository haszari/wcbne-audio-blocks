
import loadSample from './lib/preload-audio-sample';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

function getSecondsPerBeat( tempoBpm ) {
	return 60.0 / tempoBpm;
}

class Looper {
	constructor( attributes ) {
		this.props = attributes;
		const { audioUrl, tempoBpm } = this.props;

		this.secondsPerBeat = getSecondsPerBeat( tempoBpm );
		this.player = null;
		this.fader = null;
		this.isPlaying = false;
		this.buffer = null;

		this.playbackBpm = tempoBpm;
		this.playbackLevel = 0;

		if ( audioUrl ) {
			loadSample( audioUrl, audioContext, ( buffer ) => {
				this.buffer = buffer;
			} );
		}
	}

	setPlaybackTempo( bpm ) {
		this.playbackBpm = bpm;
	}
	setPlaybackLevel( level ) {
		const fadeTime = 1 * getSecondsPerBeat( this.playbackBpm );

		this.playbackLevel = level;

		if ( this.fader ) {
			this.fader.gain.linearRampToValueAtTime(
				this.playbackLevel,
				audioContext.currentTime + fadeTime
			);
		}

	}

	start() {
		if ( ! this.buffer || this.isPlaying ) {
			return;
		}
		const { loopLengthBeats, loopStartBeats, startOffsetSeconds, tempoBpm } = this.props;

		this.player = audioContext.createBufferSource();

		this.player.buffer = this.buffer;
		this.player.playbackRate.value = this.playbackBpm / tempoBpm;

		this.player.loop = true;
		this.player.loopStart = startOffsetSeconds + ( loopStartBeats * this.secondsPerBeat );
		this.player.loopEnd = this.player.loopStart + ( loopLengthBeats * this.secondsPerBeat );

		this.fader = audioContext.createGain();
		this.fader.gain.value = this.playbackLevel;

		this.player.connect( this.fader );
		this.fader.connect( audioContext.destination );

		const playNow = 0;
		this.player.start( playNow, this.player.loopStart );

	    this.isPlaying = true;
	}

	stop() {
		if ( ! this.player ) {
			return;
		}

	    this.player.stop();
	    this.player = null;
	    this.isPlaying = false;
	}

	setPlaying( shouldBePlaying ) {
		if ( shouldBePlaying ) {
			this.start();
		}
		else {
			this.stop();
		}
	}
}

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


function initLoop( element ) {
	if ( ! element.dataset.audioUrl ||
		 ! element.dataset.tempoBpm ) {
		return;
	}

	const props = {
		audioUrl: element.dataset.audioUrl,
		tempoBpm: parseFloat( element.dataset.tempoBpm ),
		loopLengthBeats: parseFloat( element.dataset.loopLengthBeats ),
		loopStartBeats: parseFloat( element.dataset.loopStartBeats ),
		startOffsetSeconds: parseFloat( element.dataset.startOffsetSeconds ),
	};
	return new Looper( props );
}

const pageState = {
	loopers: [],
	playButtons: [],
	isPlaying: false,
	playbackTempo: 120,
}

function onScrollChange() {
	const scrollPosition = window.pageYOffset / ( document.body.scrollHeight - window.innerHeight);

	const numLoops = pageState.loopers.length;

	if ( 1 === numLoops ) {
		// constant level
		pageState.loopers[0].setPlaybackLevel( 1.0 );
	}
	if ( 2 === numLoops ) {
		const faderPosition = scrollPosition;
		// crossfade, top of page = loop 1, end of page = loop 2
		pageState.loopers[ 0 ].setPlaybackLevel( 1.0 - faderPosition );
		pageState.loopers[ 1 ].setPlaybackLevel( faderPosition );
	}
	else if ( 2 <= numLoops ) {
		// many loops, split up page evenly
		const perLoop = 1.0 / ( numLoops - 1 );
		const loopPosition = scrollPosition / perLoop;
		const leftLoop = Math.floor( loopPosition );
		const faderPosition = loopPosition - leftLoop;
		pageState.loopers[ leftLoop ].setPlaybackLevel( 1.0 - faderPosition );
		if ( leftLoop < ( numLoops - 1 ) ) {
			pageState.loopers[ leftLoop + 1 ].setPlaybackLevel( faderPosition );
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

function setupPlayButtons() {
	pageState.playButtons = getPlayButtonElements();

	pageState.playButtons.forEach( playButton => {
		playButton.addEventListener( 'click', togglePlayback );
	} );
}

function getPageTempo() {
	let tempo = 120;

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
	const allLoops = getLoopElements();

	pageState.playbackTempo = getPageTempo();

	allLoops.forEach( loopElement => {
		pageState.loopers.push( initLoop( loopElement ) );
	} );

	setupPlayButtons();
}


if ( typeof window !== 'undefined' && typeof document !== 'undefined' ) {
	document.addEventListener( 'DOMContentLoaded', setupPageSoundtrack );
	window.addEventListener( 'scroll', onScrollChange );
}
