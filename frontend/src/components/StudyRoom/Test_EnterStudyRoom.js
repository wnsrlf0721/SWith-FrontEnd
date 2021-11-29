import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../api/APIs';

const Test_EnterStudyRoom = () => {
  const [nickName, setNickName] = useState('');
  const [studyRoomId, setStudyRoomId] = useState('');
  const isLogined = window.sessionStorage.userInfo == null ? false : true;

  if (isLogined) {
    //alert("로그인이 필요합니다.");
    //return (window.location.href = "/login");
    const session = JSON.parse(window.sessionStorage.userInfo);
    getUserInfo(session.userId)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.status === '200' && data.message === 'OK') {
          setNickName(data.data.nickname);
        }
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  }

  const onChangeNickName = (e) => {
    if (!isLogined) {
      setNickName(e.target.value);
    }
  };

  const onChangeStudyRoomId = (e) => {
    setStudyRoomId(e.target.value);
  };

  return (
    <div>
      <header></header>
      <div>
        닉네임: <input onChange={onChangeNickName} value={nickName} />
        StudyRoomId: <input onChange={onChangeStudyRoomId} value={studyRoomId} />
        <Link
          to={{
            pathname: `/StudyRoom/${studyRoomId}/${nickName}`,
          }}
        >
          <button>입장하기</button>
        </Link>
      </div>
    </div>
  );
};

export default Test_EnterStudyRoom;
