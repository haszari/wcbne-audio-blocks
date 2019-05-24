

const looper = ( { attributes } ) => {
	const { audioUrl } = attributes;
	const element = audioUrl ? (
		<div className='audioblocks-audiolooper' data-audio-url={ audioUrl }>
			Looper!
		</div>
	) : null;
	return (
		<div>
			{ element }
		</div>
	);
}

export default looper;

