import styled from 'styled-components';

import React from 'react';

import user_icon from '../../images/user_icon.png';
import camera from '../../images/camera_true.png';
import mic from '../../images/mic_true.png';
import speaker from '../../images/speaker_true.png';

const StudyRoomTopbar = () => {
  return (
    <Bar>
      <NamePeopleNumBox>
        <p>스터디룸 이름 나중에 수정</p>
        <img src={user_icon} alt="userIcon" />
        <h3>3명 나중에 수정</h3>
      </NamePeopleNumBox>
      <MicSpeakerCameraBox>
        <img src={mic} alt="mic" />
        <img src={camera} alt="camera" />
        <img src={speaker} alt="speaker" />
      </MicSpeakerCameraBox>
      <div style={{ paddingRight: '30px', marginRight: '20px' }}>
        <img src={user_icon} alt="userIcon" />
      </div>
    </Bar>
  );
};

const Bar = styled.div`
  width: 100%;
  height: 30px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 17px 40px 17px 20px;
  background-color: #363740;
  position: fixed;
`;
const NamePeopleNumBox = styled.div`
  width: 215px;
  height: 26px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding: 0 0 0 65px;
`;

const MicSpeakerCameraBox = styled.div`
  width: 150px;
  height: 24px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 37px;
  padding: 0;
`;

export default StudyRoomTopbar;
