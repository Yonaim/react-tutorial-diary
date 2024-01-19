import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DiaryStateContext } from "../App";

// components
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

// utils
import { getStringDate } from "../utils/date";
import { emotionList } from "../utils/emotion";
 
const Diary = () => {

	// path variable (경로 변수)
	const { id } = useParams();
	const diaryList = useContext(DiaryStateContext);
	const [data, setData] = useState();
	const navigate = useNavigate();
	
	useEffect(() => {
		if (diaryList.length >= 1) {
			const targetDiary = diaryList.find(
				(it) => parseInt(it.id) === parseInt(id) 
				);
			if (targetDiary) {
				setData(targetDiary);
			} else {
				alert("없는 일기를 열람하려고 시도했습니다");
				navigate("/", {replace: true});
			}
		}
	}, [id, diaryList]);

	if (!data) {
		// 데이터상으로 존재하는 일기이지만 fetch가 아직 안되었을 경우 | 없는 데이터인 경우 띄울 화면
		return <div className="DiaryPage">로딩 중...</div>
	}

	const curEmotionData = emotionList.find(
		(it) => parseInt(it.emotion_id) === parseInt(data.emotion)
	);
	return (
		<div className="DiaryPage">
			<MyHeader headText={`${getStringDate(new Date(data.date))} 기록`}
				leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)}/>}
				rightChild={<MyButton text={"수정하기"} onClick={() => navigate(`/edit/${id}`)}/>}
			/>
			<article>
				<section>
					<h4>오늘의 감정</h4>
					<div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
						<img src={curEmotionData.emotion_img}/>
						<div className="emotion_caption">
							{curEmotionData.emotion_descript}
						</div>
					</div>
				</section>
				<section>
					<h4>오늘의 일기</h4>
					<div className="diary_content_wrapper">
						<p>{data.content}</p>
					</div>
				</section>
			</article>
		</div>
	);
};

export default Diary;