import './css/StudyCard.css';
import React from 'react';

const StudyCard = ({ title, imgUrl, body, studyRoomID, nickName }) => {
  const isLogined = window.sessionStorage.userInfo == null ? false : true;

  const enterStudyRoom = () => {
    if (!isLogined) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (window.localStorage.getItem('enteredStudyRoom') === 'true')
      alert('이미 스터디룸에 입장하였습니다.');
    else {
      window.open(
        `/StudyRoom/${studyRoomID}/${nickName}/${window.sessionStorage.userInfo}`,
        '_blank',
        'noopener noreferrer',
      );
    }
  };
  return (
    <>
      <button className="card-container" onClick={enterStudyRoom}>
        <div className="image-container">
          <img src={imgUrl} alt="기본스터디이미지" />
        </div>
        <div className="card-content">
          <div className="card-title">{title}</div>
          <div className="card-body">
            <div className="hashtagWrap">
              {body.map((x) => {
                return <div className="t">{'#' + x.hashtag}</div>;
              })}
            </div>
          </div>
        </div>
      </button>
    </>
  );
};
export default StudyCard;
