
const LoopCard = ( { artist, title } ) => {

	return (
		<div className="audioLoopCard">
			<span class="audioLoopCard-artist">{ artist }</span> – <span class="audioLoopCard-title">{ title }</span>
		</div>
	);
}

export default LoopCard;

