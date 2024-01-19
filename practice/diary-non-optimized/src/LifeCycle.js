import React, { useEffect, useState } from "react";

const MountTest = () => {
	useEffect(() => {
		console.log("마운트된 시점에 실행")
		return () => {
			console.log("언마운트된 시점에 실행");
		};
	}, []);
	return <div>what the fuck</div>
};

const LifeCycle = () => {
	
	const [count, setCount] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	
	const toggle = () => {setIsVisible(!isVisible)};
	
	// useEffect 함수는 두번째 인자값이 변할때마다 첫번째 인자로 전달한 콜백 함수를 실행한다
	// 빈 배열을 전달하면 컴포넌트가 처음 마운트될때만 실행됨
	useEffect(() => {
		console.log("mount !!");
		return () => { console.log ("unmount!! ");}
		// 이 컴포넌트는 계속 떠있을거라서 호출될 일이 없당...
	}, []);

	// 두번째 인자를 전달하지 않으면 컴포넌트가 업데이트 될때 매번 실행됨
	// useEffect(() => {
	// 	console.log("update !!");
	// });

	// count 상태 값이 변할때마다 실행됨
	// useEffect(() => {
	// 	console.log("state 'count' is updated !!");
	// }, [count]);

	return (
		<div>
			<div>
				{count}
				<button onClick={() => setCount(count + 1)}>count up</button>
			</div>
			<div>
			</div>
			<button onClick={toggle}>ON/OFF BUTTON</button>
			{/* 단락평가 */}
		 	{isVisible && <MountTest />}
		</div>
	);	
};

export default LifeCycle;