import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";
// import RoutesNavi from './components/RoutesNavi';

const RoutesNavi = () => {
	return (
		<nav>
			<Link to={"/"}>HOME</Link>
			<br/>
			<Link to={"/diary"}>DIARY</Link>
			<br/>
			<Link to={"/edit"}>EDIT</Link>
			<br/>
			<Link to={"/new"}>NEW</Link>
		</nav>
	);
};

function App_useLibrary() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>-------- Yonazzang's Diary -------- </h1>
      	<RoutesNavi />
        <Routes>
			<Route path="/" element={<Home />}/>
			<Route path="/edit" element={<Edit />}/>
			<Route path="/new" element={<New />}/>
			<Route path="/diary" element={<Diary />}/>
		</Routes>
		{/* a태그는 새로고침 되므로 SPA 방식이 아님 */}
		{/* <a href={"./new"}>홈으로 이동</a> */}
      </div>
    </BrowserRouter>
  );
}

export default App_useLibrary;
