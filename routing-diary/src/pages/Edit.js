import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {

	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	
	const id = searchParams.get("id");
	const yona = searchParams.get("yona");
	
	console.log("id: ", id);
	console.log("yona: ", yona);

	return (
		<div>
			<h1>Edit page</h1>
			<p>이곳은 수정 페이지입니다.</p>
			<p>'/edit?id=1234&yona=zang'와 같이 id, yona 키의 쿼리스트링을 변경해보세요 콘솔에 찍힙니다.</p>
			<button onClick={() => {setSearchParams( {sanghwal: "babo", yona: "genius"} )}}>
				쿼리스트링으로 진실 확인하기
			</button>
			<button onClick={() => navigate("/home")}>HOME으로 가기</button>
			<button onClick={() => navigate(-1)}>뒤로가기</button>
		</div>
	);
};

export default Edit;
