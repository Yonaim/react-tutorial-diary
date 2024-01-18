const EmotionItem = ({ emotion_id, emotion_img, emotion_descript, onClick, isSelected }) => {
	
	const getSubClassName = () => isSelected ? `EmotionItem_on_${emotion_id}` : "EmotionItem_off";
	
	return (
		<div className={["EmotionItem", getSubClassName()].join(" ")} onClick={() => onClick(emotion_id)}>
			<img src={emotion_img} />
			<span>{emotion_descript}</span>
		</div>
	);
};

export default EmotionItem;
