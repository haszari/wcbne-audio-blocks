import LoopCard from './loop-card';

const looper = ( { attributes } ) => {
	const {
		audioArtist,
		audioTitle,
		audioUrl,
		tempoBpm,
		loopLengthBeats,
		showCardOnPage,
		startOffsetSeconds,
	} = attributes;

	const element = audioUrl ? (
		<div
			className='audioblocks-audiolooper'
			data-audio-url={ audioUrl }
			data-tempo-bpm={ tempoBpm }
			data-loop-length-beats={ loopLengthBeats }
			data-start-offset-seconds={ startOffsetSeconds }
		>
			<LoopCard hidden={ ! showCardOnPage } artist={ audioArtist } title={ audioTitle } />
		</div>
	) : null;
	return (
		<div>
			{ element }
		</div>
	);
}

export default looper;

