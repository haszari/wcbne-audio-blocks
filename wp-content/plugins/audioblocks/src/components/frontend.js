import { Button } from '@wordpress/components';
import { withState } from '@wordpress/compose';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();


const loadSample = function(url, audioContext, callback) {
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


const looper = ( { audioUrl, buffer, player, isPlaying, setState } ) => {
	function start() {
		if ( ! buffer ) {
			return;
		}

	    const player = audioContext.createBufferSource();
	    player.buffer = buffer;
	    player.playbackRate.value = 1.0;
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

	if ( ! buffer ) {
		loadSample( audioUrl, audioContext, ( buffer ) => {
			setState( { buffer } );
		} );
	}

	const element = audioUrl ? (
		<div className='audioblocks-audiolooper' data-audio-url={ audioUrl }>
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

