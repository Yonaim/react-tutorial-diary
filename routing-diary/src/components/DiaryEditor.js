import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DiaryDispatchContext } from "../App";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

const emotionList = [
	{
		emotion_id: 1,
		emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
		emotion_descript: "아주 좋음",
	},
	{
		emotion_id: 2,
		emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
		emotion_descript: "좀 좋음",
	},
	{
		emotion_id: 3,
		emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
		emotion_descript: "그럭저럭",
	},
	{
		emotion_id: 4,
		emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
		emotion_descript: "별로",
	},
	{
		emotion_id: 5,
		emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
		emotion_descript: "꽝",
	},
];

const getStringDate = (date) => {
	return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {

	const [date, setDate] = useState(getStringDate(new Date()));
	const [content, setContent] = useState("");
	const contentRef = useRef();
	const [selectEmotion, setSelectEmotion] = useState(3);
	const navigate = useNavigate();

	const { onCreate } = useContext(DiaryDispatchContext);

	const handleClickEmotion = (id) => {
		setSelectEmotion(id);
	};
	const handleSubmit = () => {
		if (content.length <= 0) {
			alert("한 자도 입력 안했잖아~~~~");
			contentRef.current.focus();
			return ;
		}
		onCreate(date, content, selectEmotion);
		navigate("/", {replace: true});
	};

	return (
		<div className="DiaryEditor ">
			<MyHeader
				headText={"새 일기쓰기"}
				leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)}/>}
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
					<MyButton text={"뒤로가기"} onClick={() => navigate(-1)}/>
					<MyButton text={"저장"} type={"positive"} onClick={handleSubmit}/>
				</section>
			</div>
		</div>
	);
}

export default DiaryEditor;
