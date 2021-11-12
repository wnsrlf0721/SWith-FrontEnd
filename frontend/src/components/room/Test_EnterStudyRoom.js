import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Test_EnterStudyRoom = () => {
  const [nickName, setNickName] = useState("");
  const [studyRoomId, setStudyRoomId] = useState("");
  
  useEffect(() => {

  }, []);

  const onChangeNickName = (e) => {
    setNickName(e.target.value);
  };

  const onChangeStudyRoomId = (e) => {
    setStudyRoomId(e.target.value);
  };


  return (
    < div >
      <header>
      </header>
      <div>
        닉네임: <input onChange={onChangeNickName} value={nickName} />
        StudyRoomId: <input onChange={onChangeStudyRoomId} value={studyRoomId} />
        <Link to={{
          pathname: '/StudyRoom',
          state: {
            nickName: nickName,
            studyRoomId: studyRoomId
          }
        }} >
          <button >입장하기</button>
        </Link>
      </div>
    </div >
  );
};

export default Test_EnterStudyRoom;