import './css/StudyCard.css';
import { getBanUsers, getStudyRoomInfo } from '../../api/APIs';
import React from 'react';
import user_icon from '../../images/user_black.png';

const StudyCard = ({
  title,
  imgUrl,
  body,
  studyRoomID,
  nickName,
  maxUserCount,
  userCount,
}) => {
  const isLogined = window.localStorage.userInfo == null ? false : true;

  const enterStudyRoom = () => {
    if (!isLogined) {
      alert('로그인이 필요합니다.');
      return;
    }
    getBanUsers(studyRoomID)
      .then((response) => {
        const res = response.data.data;
        for (let i = 0; i < res.length; i++) {
          if (res[i].user.id === JSON.parse(window.localStorage.userInfo).userId) {
            alert('강퇴당한 방에 다시 입장하실 수 없습니다.');
            return;
          }
        }
        getStudyRoomInfo(studyRoomID)
          .then((response) => {
            if (response.data.data.userCount >= response.data.data.maxUserCount) {
              alert('최대 인원수 초과로 입장하실 수 없습니다.');
              window.location.reload();
            } else {
              window.open(
                `/StudyRoom/${studyRoomID}/${nickName}/${window.localStorage.userInfo}`,
                '_blank',
                'noopener noreferrer',
              );
              // if (window.localStorage.getItem('enteredStudyRoom') === 'true')
              //   alert('이미 스터디룸에 입장하였습니다.');
              // else {
              //   window.open(
              //     `/StudyRoom/${studyRoomID}/${nickName}/${window.localStorage.userInfo}`,
              //     '_blank',
              //     'noopener noreferrer',
              //   );
              // }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <button className="card-container" onClick={enterStudyRoom}>
        <div className="image-container">
          <img src={imgUrl} alt="기본스터디이미지" />
        </div>
        <div className="card-content">
          <div className="card-title" style={{ display: 'flex' }}>
            <div style={{ width: '77%' }}>{title}</div>
            <div>
              <img
                style={{
                  height: '12px',
                  width: 'auto',
                  objectFit: 'cover',
                  marginRight: '2px',
                }}
                src={user_icon}
                alt="user_icon"
              />
              {userCount}/{maxUserCount}
            </div>
          </div>
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
