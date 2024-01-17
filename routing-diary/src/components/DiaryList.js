import { useState } from "react";

// 옵션 리스트 및 선택 이벤트 발생시 실행되는 콜백 함수를 받아 메뉴 html을 생성하여 반환하는 컴포넌트
// 재사용 여지 있을지 별도 파일로 분리하는 것이 좋음
const ControlMenu = ({ value, onChange, optionList }) => {
	return (
		<select value={value} onChange={(e) => {onChange(e.target.value)}}>
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

const DiaryList = ({ diaryList }) => {
	const [sortType, setSortType] = useState("latest");
	// 최신순 혹은 오래된 순으로 정렬하여 반환
	const getProcessedDiaryList = () => {
		// 직접 비교 함수 정의
		const compare = (a, b) => {
			if (sortType === "latest")
				return (parseInt(b.date) - parseInt(a.date)); // 혹시 모르니 문자열을 숫자로 바꿔주기
			else
				return (parseInt(a.date) - parseInt(b.date));
		};

		const copiedList = JSON.parse(JSON.stringify(diaryList)); // json 메서드를 사용해 손쉽게 깊은 복사하기
		const sortedList = copiedList.sort(compare);
		return (sortedList)
	};

	return (
	<div>
		<ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList}/>
		{/* DiaryList 컴포넌트가 리렌더링될 때*/}
		{getProcessedDiaryList().map((it) => (
			<div key={it.id}>{it.content}</div>
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
