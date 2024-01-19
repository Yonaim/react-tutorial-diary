import React, { useState, useEffect } from 'react';

import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary"

const movePageTo = (path, setCurrentPage) => {
	setCurrentPage(path);
	window.history.pushState(null, '', path);
};

const RoutesNavi = ({ setCurrentPage }) => {
	return (
		<nav>
			<span onClick={() => movePageTo("/", setCurrentPage)}>HOME</span>
			<br/>
			<span onClick={() => movePageTo("/edit", setCurrentPage)}>EDIT</span>
			<br/>
			<span onClick={() => movePageTo("/new", setCurrentPage)}>NEW</span>
			<br/>
			<span onClick={() => movePageTo("/diary", setCurrentPage)}>DIARY</span>
		</nav>
	);
};

const App_pure = () => {

	const getCurrentPath = () => {
		return (window.location.pathname);
	};
	
	const [currentPage, setCurrentPage] = useState(getCurrentPath());

	return (
		<div className="App">
      	<RoutesNavi setCurrentPage={setCurrentPage} />

		{currentPage === "/" && <Home />}
		{currentPage === "/edit" && <Edit />}
		{currentPage === "/new" && <New />}
		{currentPage === "/diary" && <Diary />}
		</div>
	);
};

export default App_pure;
