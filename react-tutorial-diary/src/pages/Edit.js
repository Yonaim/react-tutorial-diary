import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";


const Edit = () => {

	const [originData, setOriginData] = useState();
	const navigate = useNavigate();
	const { id } = useParams();

	const diaryList = useContext(DiaryStateContext);

	// id값이나 다이어리 데이터가 바뀌었을 때만 재실행
	useEffect(() => {
		if (diaryList.length >= 1) {
		  const targetDiary = diaryList.find(
				// parseInt는 혹시모를 오류를 위한 보험
			(it) => parseInt(it.id) === parseInt(id)
		  );
		  if (targetDiary) {
			setOriginData(targetDiary);
		  } else {
			alert("존재하지 않는 일기입니다");
			navigate("/", { replace: true });
		  }
		}
	  }, [id, diaryList]);

	return (
		<div>
			{originData && <DiaryEditor isEdit={true} originData={originData}/>}
		</div>
	);
};

export default Edit;
