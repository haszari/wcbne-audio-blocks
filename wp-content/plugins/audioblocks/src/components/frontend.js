import { Button } from '@wordpress/components';
import { withState } from '@wordpress/compose';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

function  loadSample(url, audioContext, callback) {
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

const looper = ( { audioUrl, tempoBpm, buffer, player, isPlaying, setState } ) => {
	const secondsPerBeat = getSecondsPerBeat( tempoBpm );

	function start() {
		if ( ! buffer ) {
			return;
		}

		const player = audioContext.createBufferSource();
		player.buffer = buffer;
		player.playbackRate.value = 1.0;

		const loopLengthBeats = 1;
		player.loop = true;
		player.loopEnd = loopLengthBeats * secondsPerBeat;

		player.connect( audioContext.destination );
		player.start();

		setState( { player, isPlaying: true } );
	}

	function stop() {
		if ( ! player ) {
			return;
		}

	    player.stop();
	    setState( { player: null, isPlaying: false } );
	}

	function toggle() {
		if ( isPlaying ) {
			stop();
		}
		else {
			start();
		}
	}

	if ( ! buffer && audioUrl ) {
		loadSample( audioUrl, audioContext, ( buffer ) => {
			setState( { buffer } );
		} );
	}

	const element = audioUrl ? (
		<div
			className='audioblocks-audiolooper'
			data-audio-url={ audioUrl }
			data-tempo-bpm={ tempoBpm }
		>
			Looper!
			<Button onClick={ toggle } >
				{ isPlaying ? 'Stop' : 'Play' }
			</Button>
		</div>
	) : null;
	return (
		<div>
			{ element }
		</div>
	);
}

export default withState( {
	isPlaying: false,
	player: null,
	buffer: null,
} )( looper );

