
const looper = ( { attributes } ) => {
	const { audioUrl, audioTitle, tempoBpm, loopLengthBeats, startOffsetSeconds } = attributes;

	const element = audioUrl ? (
		<div
			className='audioblocks-audiolooper'
			data-audio-url={ audioUrl }
			data-tempo-bpm={ tempoBpm }
			data-loop-length-beats={ loopLengthBeats }
			data-start-offset-seconds={ startOffsetSeconds }
		>
			<span>{ audioTitle }</span>
		</div>
	) : null;
	return (
		<div>
			{ element }
		</div>
	);
}

export default looper;

