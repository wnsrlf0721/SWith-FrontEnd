import React, { useEffect } from 'react';

const StudyRoomBeforePage = ({ match }) => {
  useEffect(() => {
    window.location.href = `/StudyRoomJoin/${match.params.studyRoomId}/${match.params.nickName}/${match.params.userInfo}`;
  }, []);
  return <></>;
};

export default StudyRoomBeforePage;
