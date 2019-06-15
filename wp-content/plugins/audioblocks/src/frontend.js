

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

function loadSample(url, audioContext, callback) {
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.responseType = 'arraybuffer';
	request.onload = function () {
		console.log('sample loaded, decoding');
		audioContext.decodeAudioData(request.response, callback);
	};
	console.log('loading sample');
	request.send();
}

function getSecondsPerBeat( tempoBpm ) {
	return 60.0 / tempoBpm;
}

class Looper {
	constructor( attributes ) {
		this.props = attributes;
		const { audioUrl, tempoBpm } = this.props;

		this.secondsPerBeat = getSecondsPerBeat( tempoBpm );
		this.player = null;
		this.isPlaying = false;
		this.buffer = null;
		this.playbackBpm = tempoBpm;

		if ( audioUrl ) {
			loadSample( audioUrl, audioContext, ( buffer ) => {
				this.buffer = buffer;
			} );
		}
	}

	setPlaybackTempo( bpm ) {
		this.playbackBpm = bpm;
	}

	start() {
		if ( ! this.buffer || this.playing ) {
			return;
		}
		const { loopLengthBeats, startOffsetSeconds, tempoBpm } = this.props;

		this.player = audioContext.createBufferSource();

		this.player.buffer = this.buffer;
		this.player.playbackRate.value = this.playbackBpm / tempoBpm;

		this.player.loop = true;
		this.player.loopStart = startOffsetSeconds;
		this.player.loopEnd = startOffsetSeconds + ( loopLengthBeats * this.secondsPerBeat );

		this.player.connect( audioContext.destination );
		this.player.start();

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

	toggle() {
		if ( this.isPlaying ) {
			this.stop();
		}
		else {
			this.start();
		}
	}

}

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

	const props = {
		audioUrl: element.dataset.audioUrl,
		tempoBpm: parseFloat( element.dataset.tempoBpm ),
		loopLengthBeats: parseFloat( element.dataset.loopLengthBeats ),
		startOffsetSeconds: parseFloat( element.dataset.startOffsetSeconds ),
	};
	return new Looper( props );
}

const loopers = [];

function initLoops() {
	const allLoops = getLoopElements();

	allLoops.forEach( loopElement => {
		loopers.push( initLoop( loopElement ) );
	} );
}

function togglePlayback() {
	const globalTempo = 127;

	audioContext.resume().then( function() {
		loopers.forEach( looper => {
			looper.setPlaybackTempo( globalTempo );
			looper.toggle();
		} );
	} );
}

if ( typeof window !== 'undefined' && typeof document !== 'undefined' ) {
	document.addEventListener( 'DOMContentLoaded', initLoops );
	document.addEventListener( 'click', togglePlayback );
}
