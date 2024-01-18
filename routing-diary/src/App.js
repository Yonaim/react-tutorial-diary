import { createContext, useReducer, useRef } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";

// components
import MyButton from './components/MyButton';
import RoutesNavi from './components/RoutesNavi';
import MyHeader from './components/MyHeader';

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
	return newState;
};

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

const dummyData = [
	{
		id: 1,
		emotion: 1,
		content: "오늘의 일기 1번",
		date: 1705488011578,
	},
	{
		id: 2,
		emotion: 2,
		content: "오늘의 일기 2번",
		date: 1705488011579,
	},
	{
		id: 3,
		emotion: 3,
		content: "오늘의 일기 3번",
		date: 1705488011580,
	},
	{
		id: 4,
		emotion: 4,
		content: "오늘의 일기 4번",
		date: 1705488011581,
	},
	{
		id: 5,
		emotion: 5,
		content: "오늘의 일기 5번",
		date: 1705488011582,
	},
	{
		id: 6,
		emotion: 6,
		content: "오늘의 일기 6번",
		date: 1805488011583,
	},
];

function App() {
	const [data, dispatch] = useReducer(reducer, dummyData);
	
	const dataId = useRef(0); // 렌더링과 상관없는 값이므로 ref 사용
	
	const onCreate = (date, content, emotion) => {
		dispatch({type:"CREATE", data:{id: dataId, date: new Date(date).getTime(), content, emotion}});
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
					<Route path="/edit" element={<Edit />}/>
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
