import { Link } from "react-router-dom";

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

export default RoutesNavi;
