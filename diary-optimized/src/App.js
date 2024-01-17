import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import LifeCycle from "./LifeCycle";

const diary_list_reducer = (state, action) => {
	switch (action.type) {
		case "INIT": {
			return (action.data);
		}
		case "CREATE": {
			const created_date = new Date().getTime();
			const newItem = {
				...action.data,
				created_date
			};
			return [newItem, ...state];
		}
		case "REMOVE": {
			console.log("????");
			return state.filter((it) => it.id !== action.targetId);
		}
		case "EDIT": {
			return state.map((it) => it.id === action.targetId ? {
				...it, content: action.newContent
			} : it);
		}
		default:
			return state;
	}
}

const App = () => {

	// state 'data'를 관리하는 로직을 별도의 함수 reducer로 분리
	const [data, dispatch] = useReducer(diary_list_reducer, []);
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
		dispatch({ type: "INIT", data: initData });
	};

	// 초기 데이터를 가져오는 함수 'getData'를 컴포넌트가 처음 마운트될때 실행
	useEffect(() => {
		setTimeout(() => {
			getData();
		}, 1000);
	}, []);

	const onCreate = useCallback((author, content, emotion) => {
		dispatch({
			type: "CREATE",
			data: { author, content, emotion, id: dataId.current }
		});
		dataId.current += 1;
	}, []);

	// 처음 렌더링된 이후로 재생성될 필요가 없으므로 useCallback으로 최적화
	const onRemove = useCallback((targetId) => {
		dispatch({ type: "REMOVE", targetId });
	}, []);

	const onEdit = useCallback((targetId, newContent) => {
		dispatch({ type: "EDIT", targetId, newContent});
	}, []);

	// memoization 적용 - data가 변할 때만 재실행됨
	// 의존 배열에 data.length가 아니라 data가 들어가야한다고 warning을 띄워주긴 하는데 의도상 이게 맞음ㅇㅇ
	// 근데 경고메세지가 너무 거슬리니까 일단 data로 함
	const getDiaryAnalysis = useMemo(() => {
		if (data.length === 0) {
			return { goodcount: 0, badCount: 0, goodRatio: 0 };
		}

		const goodCount = data.filter((it) => it.emotion >= 3).length;
		const badCount = data.length - goodCount;
		const goodRatio = (goodCount / data.length) * 100.0;
		
		return { goodCount, badCount, goodRatio };
	}, [data]);
// }, [data.length]);
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
