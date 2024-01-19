import { useContext, useEffect, useState } from "react"
import { DiaryStateContext } from "../App";

// components
import MyButton from "../components/MyButton"
import MyHeader from "../components/MyHeader"
import DiaryList from "../components/DiaryList";

const Home = () => {

	const allData = useContext(DiaryStateContext); // 모든 일기데이터

	const [curDate, setCurDate] = useState(new Date());
	const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
	const [showData, setShowData] = useState([]); // 실질적으로 화면에 표시할 일기데이터

	// 현재 날짜 혹은 일기 목록이 바뀔시 리렌더링
	// 월 단위이므로 현재 날짜가 바뀌는 경우는 월이 바뀌는 경우라 거의 없긴하겠지만 무튼 필요~
	useEffect(() => {
		// 헐.... allData = undefined로 들어가는 경우가 있어서 안전한 조건문은		
		// allData.length === 0 -> allData.length > 1 ㅡㅡ;;
		if (allData.length > 0)
		{
			const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();
			// 해당 월의 마지막 날 마지막 시간(23:59:59)
			const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0, 23, 59, 59).getTime();
	
			setShowData(allData.filter((it) => firstDay <= it.date && it.date <= lastDay));
		}
	}, [curDate, allData]);

	const increaseMonth = () => {
		setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
	};
	const decreaseMonth = () => {
		setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
	};

	return (
		<div>
			<MyHeader 
				headText={headText}
				leftChild={<MyButton text={"<"} onClick={decreaseMonth}/>}
				rightChild={<MyButton text={">"} onClick={increaseMonth}/>}
			/>
			<DiaryList diaryList={showData}/>
		</div>
	);
};

export default Home;
