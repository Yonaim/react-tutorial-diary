const MyButton = ({ text, type, onClick }) => {

	// 전달된 type이 정의되지 않은 type인 경우를 고려
	const btnType = ["positive", "negative"].includes(type) ? type : "default";

	return (
		// css에서 class name은 공백 기준으로 분리되어 생각되어짐
		<button className={["MyButton", `MyButton_${type}`].join(" ")} onClick={onClick}>
			{text}
		</button>
	);
};

MyButton.defaultProps = {
	type: "default"
};

export default MyButton;
