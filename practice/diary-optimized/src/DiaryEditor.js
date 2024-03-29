import { memo, useState, useRef, useContext } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {
	// useContext 훅을 사용해 컨텍스트로부터 값을 갖고옴
	const { onCreate } = useContext(DiaryDispatchContext);
	const authorInput = useRef();
	const [state, setState] = useState({
		author: "",
		content: "",
		emotion: 1
	});

	const handleChangeState = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = () => {

		if (state.author.length < 3) {
			authorInput.current.focus();
			alert("작성자 이름은 최소 3글자 이상");
			return ;
		}

		onCreate(state.author, state.content, state.emotion);
		alert("저장 성공");
	};

	return (
		<div className="DiaryEditor">
			<h2>오늘의 일기</h2>
			<div>
				<input
					ref={authorInput}
					value={state.author}
					onChange={handleChangeState}
					name="author"
					placeholder="작성자를 입력하세요"
					type="text"
				/>
			</div>
			<div>
				<textarea 
					value={state.content}
					onChange={handleChangeState}
					name="content"
					placeholder="일기 입력하쇼"
					type="text"
					/>
			</div>
			<div>
				<span>오늘의 감정점수: </span>
				<select
					name="emotion"
					value={state.emotion}
					onChange={handleChangeState}
				>
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
					<option value={4}>4</option>
					<option value={5}>5</option>
				</select>
			</div>
			<div>
				<button onClick={handleSubmit}>일기 저장하기</button>
			</div>
		</div>
	);
};

export default memo(DiaryEditor);