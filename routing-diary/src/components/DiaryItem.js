import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {

	const navigate = useNavigate();
	const strDate = new Date(parseInt(date)).toLocaleDateString();

	return (
		<div className="DiaryItem">
			<div className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")}>
				<img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}/>
			</div>
			<div className="info_wrapper">
				<div className="diary_date">{strDate}</div>
				<div className="diary_content_preview">{content}</div>
			</div>
			<div>
				<MyButton text={"수정"} onClick={() => navigate(`/edit/${id}`)}/>
			</div>
		</div>
	); 
};

export default DiaryItem;