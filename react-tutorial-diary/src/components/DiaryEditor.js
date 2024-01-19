import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DiaryDispatchContext } from "../App";

// components
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

// utils
import { getStringDate } from "../utils/date";
import { emotionList } from "../utils/emotion";

const DiaryEditor = ({ isEdit, originData }) => {
	const [date, setDate] = useState(getStringDate(new Date()));
	const [content, setContent] = useState("");
	const contentRef = useRef();
	const [selectEmotion, setSelectEmotion] = useState(3);
	const navigate = useNavigate();

	const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

	const handleClickEmotion = useCallback((id) => {
		setSelectEmotion(id);
	}, []);
	const handleSubmit = () => {
		if (content.length < 1) {
			alert("한 자도 입력 안했잖아~~~~");
			contentRef.current.focus();
			return ;
		}

		if (window.confirm(isEdit === true ? "정말 수정하시겠습니까?" : "일기를 생성하시겠습니까")) {
			if (isEdit === true) {
				onEdit(originData.id, date, content, selectEmotion);
			}
			else {
				onCreate(date, content, selectEmotion);
			}
		}
		navigate("/", {replace: true});
	};
	const handleRemove = useCallback(() => {
		if (window.confirm("이 일기를 정말 삭제하시겠습니까?")) {
			onRemove(originData.id);
			navigate("/", {replace:true});
		}
	}, []);

	const goPrev = useCallback(() => {
		navigate(-1);
	}, []);

	useEffect(() => {
		if (isEdit === true) {
			setDate(getStringDate(new Date(parseInt(originData.date))));
			setSelectEmotion(originData.emotion);
			setContent(originData.content);
		}
	}, [isEdit, originData]);

	// console.log(isEdit);
	// console.log(originData);
	// if (isEdit === true) console.log("isEdit === true");
	// if (isEdit == true) console.log("isEdit == true");
	// if (isEdit) console.log("isEdit");

	return (
		<div className="DiaryEditor">
			<MyHeader
				headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
				// headText={isEdit === true ? "일기 수정하기" : "새 일기쓰기"}
				leftChild={<MyButton text={"< 뒤로가기"} onClick={goPrev}/>}
				rightChild={isEdit && <MyButton text={"삭제하기"} onClick={handleRemove} type={"negative"}/>}
			/>
			<div>
				<section>
					<h4>오늘의 날짜를 입력하세요</h4>
					<div className="input_box">
						<input
							className="input_date"
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
					</div>
				</section>
				<section>
					<h4>오늘의 감정</h4>
					<div className="input_box emotion_list_wrapper">
						{emotionList.map((it) => (
							<div key={it.emotion_id}>
								<EmotionItem key={it.emotion_id} {...it}
								onClick={handleClickEmotion} isSelected={selectEmotion === it.emotion_id}/>
							</div>
						))}
					</div>
				</section>
				<section>
					<h4>오늘의 일기</h4>
					<div className="input_box text_wrapper">
						<textarea ref={contentRef} placeholder={"오늘 어땠는지 적어보시오"} value={content}
						onChange={(e) => setContent(e.target.value)}/>
					</div>
				</section>
				<section className="control_box">
					<MyButton text={"뒤로가기"} onClick={goPrev}/>
					<MyButton text={"저장"} type={"positive"} onClick={handleSubmit}/>
				</section>
			</div>
		</div>
	);
}

export default DiaryEditor;
