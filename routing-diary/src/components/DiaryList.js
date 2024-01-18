import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

// 옵션 리스트 및 선택 이벤트 발생시 실행되는 콜백 함수를 받아 메뉴 html을 생성하여 반환하는 컴포넌트
// 재사용 여지 있을지 별도 파일로 분리하는 것이 좋음
const ControlMenu = ({ value, onChange, optionList }) => {
	return (
		<select className="ControlMenu" value={value} onChange={(e) => {onChange(e.target.value)}}>
			{optionList.map((it, idx) => 
				<option key={idx} value={it.value}>
					{it.name}
				</option>
			)}
		</select>
	);
};

const sortOptionList = [
	{
		value: "latest",
		name: "최신순"
	},
	{
		value: "oldest",
		name: "오래된순"
	}
];

const filterOptionList = [
	{
		value: "all",
		name: "모두"
	}, 
	{
		value: "good",
		name: "좋은 감정"
	}, 
	{
		value: "bad",
		name: "안 좋은 감정"
	}
];

const DiaryList = ({ diaryList }) => {
	const [sortType, setSortType] = useState("latest");
	const [filterType, setFilterType] = useState("all");

	// 최신순 혹은 오래된 순으로 정렬 + 필터링하여 반환
	const getProcessedDiaryList = () => {
		// 정렬
		const compare = (a, b) => {
			if (sortType === "latest")
				return (parseInt(b.date) - parseInt(a.date)); // 혹시 모르니 문자열을 숫자로 바꿔주기
			else
				return (parseInt(a.date) - parseInt(b.date));
		};
		const copiedList = JSON.parse(JSON.stringify(diaryList)); // json 메서드를 사용해 손쉽게 깊은 복사하기
		const sortedList = copiedList.sort(compare);

		// 필터링
		const filterCallback = (it) => {
			if (filterType === "good")
				return parseInt(it.emotion) <= 3;
			else
				return parseInt(it.emotion) > 3;
		};
		const sortedAndFilteredList = filterType === "all" ? sortedList : sortedList.filter(filterCallback);
		return (sortedAndFilteredList);
	};

	const navigate = useNavigate();

	return (
	<div className="DiaryList">
		<div className="menu_wrapper">
			<div className="left_col">
				<ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList}/>
				<ControlMenu value={filterType} onChange={setFilterType} optionList={filterOptionList}/>
			</div>
			<div className="right_col">
				<MyButton type="positive" text="새 일기 쓰기" onClick={() => navigate("/new")} />
			</div>
		</div>

		{/* DiaryList 컴포넌트가 리렌더링될 때*/}
		{getProcessedDiaryList().map((it) => (
			<DiaryItem key={it.id} {...it} />
			// {/* <div key={it.id}>{it.content}</div> */}
		))}
	</div>
	);
}

/*
map 메서드가
[
	<div key={id_1}>content_1</div>
	<div key={id_2}>content_2</div>
	<div key={id_3}>content_3</div>
	...
]
와 같은 배열을 생성.

JSX는 중괄호 {} 안에 배열을 넣어도 됨.
*/

export default DiaryList;
