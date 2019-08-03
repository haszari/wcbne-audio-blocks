
const LoopCard = ( { artist, title, hidden } ) => {

	let classes = 'audioLoopCard';
	if ( hidden ) {
		classes += ' hidden';
	}

	return (
		<div className={ classes }>
			<span class='audioLoopCard-artist'>{ artist }</span> – <span class='audioLoopCard-title'>{ title }</span>
		</div>
	);
}

export default LoopCard;

