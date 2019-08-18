
import loadSample from '../../lib/preload-audio-sample';

function getSecondsPerBeat( tempoBpm ) {
	return 60.0 / tempoBpm;
}

class Looper {
	constructor( props ) {
		this.props = props;
		const { audioUrl, tempoBpm, audioContext } = this.props;

		this.audioContext = audioContext;

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
				this.audioContext.currentTime + fadeTime
			);
		}

	}

	start() {
		if ( ! this.buffer || this.isPlaying ) {
			return;
		}
		const { loopLengthBeats, loopStartBeats, startOffsetSeconds, tempoBpm } = this.props;

		this.player = this.audioContext.createBufferSource();

		this.player.buffer = this.buffer;
		this.player.playbackRate.value = this.playbackBpm / tempoBpm;

		this.player.loop = true;
		this.player.loopStart = startOffsetSeconds + ( loopStartBeats * this.secondsPerBeat );
		this.player.loopEnd = this.player.loopStart + ( loopLengthBeats * this.secondsPerBeat );

		this.fader = this.audioContext.createGain();
		this.fader.gain.value = this.playbackLevel;

		this.player.connect( this.fader );
		this.fader.connect( this.audioContext.destination );

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

export default Looper;
