const DiaryList = ({ diaryList }) => {
	return <div>
		{diaryList.map((it) => (
			<div key={it.id}>{it.content}</div>
		))}
	</div>;
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
