// import './css/StudyRoomEnterModal.css';
import styled from 'styled-components';

import { React } from 'react';
import { useRecoilValue } from 'recoil';
import { studyRoomAtoms } from '../recoils';

import UserVideo from './UserVideo';

const EnlargeVideoModal = ({ enlargedUserSocketId, userVideoEnlarge, getTime }) => {
  const connectedUsers = useRecoilValue(studyRoomAtoms.connectedUsers);
  const connectedUserTimer = useRecoilValue(studyRoomAtoms.connectedUserTimer);
  const userAudioMute = useRecoilValue(studyRoomAtoms.userVideoMute);
  const userVideoMute = useRecoilValue(studyRoomAtoms.userAudioMute);

  return (
    <div onClick={() => userVideoEnlarge(enlargedUserSocketId)}>
      <ModalOverlay />
      <ModalWrapper tabIndex="-1">
        <ModalInner tabIndex="0" className="modal-inner">
          {connectedUsers.map((user, index) => {
            if (user.socketId === enlargedUserSocketId)
              return (
                <div
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <UserVideo
                    nickName={user.nickName}
                    videoMuted={userVideoMute.get(user.socketId)}
                    audioMuted={userAudioMute.get(user.socketId)}
                    studyTime={getTime(connectedUserTimer.get(user.socketId))}
                    stream={user.stream}
                    userVideoEnlarge={userVideoEnlarge}
                    userSocketId={user.socketId}
                  />
                </div>
              );
          })}
        </ModalInner>
      </ModalWrapper>
    </div>
  );
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  text-align: center;
  display: 'block';
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: 'block';
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: black;
  border-radius: 10px;
  width: 55%;
  max-width: 55%;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 25px 5px 25px;
`;

export default EnlargeVideoModal;
