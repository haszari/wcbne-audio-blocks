
// bit silly how we're not checking window here, but are down there (can polish that later)
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

function getLoopElements() {
	return Array.from(
		document.querySelectorAll(
			'.audioblocks-audiolooper'
		)
	);
}

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

function initLoop( element ) {
	if ( ! element.dataset.audioUrl ) {
		return;
	}

	loadSample( element.dataset.audioUrl, audioContext, ( buffer ) => {
	    const player = audioContext.createBufferSource();

	    player.buffer = buffer;
	    player.playbackRate.value = 1.0;
	    player.connect( audioContext.destination );

	    element.addEventListener( 'click', () => {
	    	player.start();
	    } );
	} );
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
