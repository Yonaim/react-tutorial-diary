import { useState } from "react";

const DiaryItem = ({ onRemove, onEdit, id, author, content, emotion, created_date }) => {
	
	const [localContent, setLocalContent] = useState(content);
	const [isEdit, setIsEdit] = useState(false);
	const toggleIsEdit = () => setIsEdit(!isEdit);
	
	// 삭제
	const handleClickRemove = () => {
		if (window.confirm(`${id}번 째 일기를 ㄹㅇ로 삭제하시겠습니까?`)) {
			onRemove(id);
		}
	};

	// 수정
	const handleEdit = () => {
		if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
			onEdit(id, localContent);
			toggleIsEdit();
		}
	};
	const handleQuitEdit = () => {
		setIsEdit(false);
	};
	
	return (
		<div className="DiaryItem">
			<div className="info">
				<span>
					작성자: {author} | 감정점수: {emotion}
				</span>
				<br />
				<span className="date">{new Date(created_date).toLocaleDateString()}</span>
			</div>
			<div className="content">
				{isEdit ? <textarea value={localContent} 
							onChange={(e) => setLocalContent(e.target.value)}/>
					: content}
			</div>
			<div className="buttons">
				{isEdit ?
				<>
					<button onClick={handleQuitEdit}>수정취소할랭</button>
					<button onClick={handleEdit}>수정완료</button>		 
				</> :
				<>
					<button onClick={handleClickRemove}>삭제~~</button>
					<button onClick={toggleIsEdit}>수~정</button>
				</>
				}
			</div>
		</div>
	);
};

export default DiaryItem;