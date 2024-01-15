import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import LifeCycle from "./LifeCycle";

// const dummyList = [
// 	{
// 		id: 1,
// 		author: "요나짱",
// 		content: "이 날은 기분이 매우 안조앗음",
// 		emotion: 1,
// 		created_date: new Date().getTime()
// 	},
// 	{
// 		id: 2,
// 		author: "요나짱",
// 		content: "이 날은 기분이 그저그랬음",
// 		emotion: 3,
// 		created_date: new Date().getTime()
// 	},
// 	{
// 		id: 3,
// 		author: "요나짱",
// 		content: "이 날은 기분이 매우 조앗음",
// 		emotion: 5,
// 		created_date: new Date().getTime()
// 	},
// ];

const App = () => {

	const [data, setData] = useState([]);
	const dataId = useRef(0);

	// 초기 데이터를 가져오는 함수
	const getData = async () => {
		const res = await fetch(
			"https://jsonplaceholder.typicode.com/comments"
		).then((res) => res.json());

		const initData = res.slice(0, 20).map((it) => {
			return {
				author: it.email,
				content: it.body,
				emotion: Math.floor(Math.random() * 5) + 1,
				created_date: new Date().getTime() + 1,
				id: dataId.current++,
			};
		});
		setData(initData);
	};

	// 초기 데이터를 가져오는 함수 'getData'를 컴포넌트가 처음 마운트될때 실행
	useEffect(() => {
		setTimeout(() => {
			getData();
		}, 1000);
	}, []);

	// 새로운 일기가 생성될때 실행하는 함수
	const onCreate = (author, content, emotion) => {
		const created_date = new Date().getTime();
		const newItem = {
			author,
			content,
			emotion,
			created_date,
			id: dataId.current
		};
		dataId.current += 1;
		setData([newItem, ...data]);
	};

	const onRemove = (targetId) => {
		const newDiaryList = data.filter((it) => it.id !== targetId);
		setData(newDiaryList);
	};

	const onEdit = (targetId, newContent) => {
		setData(
			data.map((it) => it.id === targetId ? { ...it, content:newContent } : it)
		);
	};

	// App 컴포넌트가 리렌더링될때마다 다시 실행됨 (memoization 미적용)
	// const getDiaryAnalysis = () => {
		// console.log("일기 통계를 위한 계산 들어갑니다~")
	// 	return { goodCount: 0, badCount: 1, goodRatio: 50};
	// };
	// const { goodCount, badCount, goodRatio } = getDiaryAnalysis();

	// memoization 적용 - data가 변할 때만 재실행됨
	// 의존 배열에 data.length가 아니라 data가 들어가야한다고 warning을 띄워주긴 하는데 의도상 이게 맞음ㅇㅇ
	const getDiaryAnalysis = useMemo(() => {
		console.log("일기 통계를 위한 계산 들어갑니다~")
		console.log(data.length);
		if (data.length === 0) {
			return { goodcount: 0, badCount: 0, goodRatio: 0 };
		}

		const goodCount = data.filter((it) => it.emotion >= 3).length;
		const badCount = data.length - goodCount;
		const goodRatio = (goodCount / data.length) * 100.0;
		
		return { goodCount, badCount, goodRatio };
	}, [data.length]);
	const { goodCount, badCount, goodRatio } = getDiaryAnalysis;


	return (
		<div className="App">
			<LifeCycle />
			<DiaryEditor onCreate={onCreate}/>
			<div>전체 일기 : {data.length}</div>
			<div>기분 좋은 일기 개수 : {goodCount}</div>
			<div>기분 나쁜 일기 개수 : {badCount}</div>
			<div>기분 좋은 일기 비율 : {goodRatio}</div>
			<DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
		</div>
	);
};

export default App;
