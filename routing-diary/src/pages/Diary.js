import { useParams } from "react-router-dom";

const Diary = () => {

	// path variable (경로 변수)
	const { id } = useParams();
	console.log(id);

	return (
		<div>
			<h1>Diary page</h1>
			<p>이곳은 일기 페이지입니다.</p>
		</div>
	);
};

export default Diary;
