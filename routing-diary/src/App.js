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

function App() {
	
	return (
		<BrowserRouter>
    	<div className="App">
        <h1>-------- Yonazzang's Diary -------- </h1>
      	<MyHeader headText={"헤더텍스트"}
		leftChild={<MyButton text={"왼쪽버튼"} onClick={() => {alert("왼쪽 버튼 클릭")}}/>}
		rightChild={<MyButton text={"오른쪽버튼"} onClick={() => {alert("오른쪽 버튼 클릭")}}/>}
		/>

		{/* process.env.PUBLIC_URL 값이 제대로 들어있지 않은 문제 해결 필요 */}
		{/* <img src={process.env.PUBLIC_URL + `/assets/emoticon1.png`}/> */}
		
		<MyButton text={"버튼"} onClick={() => alert("버튼 클릭")} type={"positive"}/>
		<MyButton text={"버튼"} onClick={() => alert("버튼 클릭")} type={"negative"}/>
		<MyButton text={"버튼"} onClick={() => alert("버튼 클릭")} />
		<MyButton text={"버튼"} onClick={() => alert("버튼 클릭")} type={"unknown"}/>

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
  );
}

export default App;
