// DEBUG: 다이어리 리스트에 아무것도 없을때 다이어리 생성해도 리스트가 제대로 뜨지 않는 문제 

import { createContext, useEffect, useReducer, useRef } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";

// components
import RoutesNavi from './components/RoutesNavi';

const reducer = (state, action) => {
	let newState = [];
	
	switch (action.type) {
		case "INIT":
			return action.data;
		case "CREATE":
			// spread 연산자를 사용하면 1단계까지는 깊은 복사됨 (내부 배열이나 객체는x)
			const newItem = { ...action.data};
			newState = [newItem, ...state];
			break;
		case "REMOVE":
			newState = state.filter((it) => it.id !== action.targetId);
			break;
		case "EDIT":
			newState = state.map((it) => it.id === action.data.id ? { ...action.data} : it);
			break;					
		default:
			return state;
	}
	localStorage.setItem("savedDiary", JSON.stringify(newState));
	return newState;
};

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
	const [data, dispatch] = useReducer(reducer, []);
	
	useEffect(() => {
		console.log("what");
		const localData = localStorage.getItem("savedDiary");
		if (localData) {
			// 가장 큰 id를 갖고오기 위해 id 내림차순으로 정렬
			const initDiaryData = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));
			dataId.current = initDiaryData[0].id + 1;
			dispatch({ type: "INIT", data: initDiaryData });
		};
	}, []);
	// 자바스크립트에서는 선언문이 먼저 처리되어지므로(호이스팅) dataId가 여기서 선언되어도 문제가 없음
	const dataId = useRef(0); // 렌더링과 상관없는 값이므로 ref 사용
	console.log(dataId);

	const onCreate = (date, content, emotion) => {
		dispatch({type:"CREATE", data:{id: dataId.current, date: new Date(date).getTime(), content, emotion}});
		dataId.current += 1;
	}
	const onRemove = (targetId) => {
		dispatch({type:"REMOVE", targetId});
	}
	const onEdit = (targetId, date, content, emotion) => {
		dispatch({type:"EDIT", data:{id: targetId, date: new Date(date).getTime(), content, emotion}});
	}

	return (
	<DiaryStateContext.Provider value={data}>
		{/* 최적화를 위해서는 dispatch 함수들에 대해 메모이제이션을 사용해야하지만 일단은 그냥 함 */}
		<DiaryDispatchContext.Provider value={{onCreate, onEdit, onRemove}}>
			<BrowserRouter>
				<div className="App">
				<h1>-------- Yonazzang's Diary -------- </h1>

				{/* process.env.PUBLIC_URL 값이 제대로 들어있지 않은 문제 해결 필요 */}
				{/* <img src={process.env.PUBLIC_URL + `/assets/emoticon1.png`}/> */}

				<RoutesNavi />
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/edit/:id" element={<Edit />}/>
					<Route path="/new" element={<New />}/>
					<Route path="/diary/:id" element={<Diary />}/>
					{/* /diary/(id)와 /diary 둘다에 대응하기 위해 보통은 이렇게 예외처리함.  */}
					{/* <Route path="/diary" element={<Diary />}/> */}
				</Routes>
				{/* a태그는 새로고침 되므로 SPA 방식이 아님 */}
				{/* <a href={"./new"}>홈으로 이동</a> */}
			</div>
		</BrowserRouter>
		</DiaryDispatchContext.Provider>
	</DiaryStateContext.Provider>
  );
}

export default App;
