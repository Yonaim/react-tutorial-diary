import DiaryItem from "./DiaryItem";

const DiaryList = ({ onEdit, onRemove, diaryList }) => {
	return (
		<div className="DiaryList">
			<h2>일기 리스트</h2>
			{diaryList.length === 0 ? <h4>아직 로딩중입니다...</h4> : <h4>{diaryList.length}개의 일기가 있슴...</h4>}
			<div>
				{diaryList.map((it) => (
					<DiaryItem key={`diaryitem_${it.id}`} {...it} onEdit={onEdit} onRemove={onRemove}/>
				))}
			</div>
		</div>
	);
};

DiaryList.defaultProps = {
	diaryList: [	{
		id: 0,
		author: "디폴트",
		content: "디폴트",
		emotion: 3,
		created_date: new Date().getTime()
	},]
};

export default DiaryList;