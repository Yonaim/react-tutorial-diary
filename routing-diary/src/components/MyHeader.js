
// 컴포넌트들을 인자로 받는 컴포넌트
const MyHeader = ({ headText, leftChild, rightChild }) => {
	return (<header>
		<div className="head_btn_left">{leftChild}</div>
		<div className="head_text">{headText}</div>
		<div className="head_btn_right">{rightChild}</div>
	</header>);
};

export default MyHeader;