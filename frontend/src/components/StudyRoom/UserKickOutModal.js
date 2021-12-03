import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { postBanUser } from '../../api/APIs';
import socket from '../../socket/socket';
import { studyRoomAtoms } from '../recoils';

const UserKickOutModal = () => {
  const [kickOutInfo, setKickOutInfo] = useRecoilState(studyRoomAtoms.kickOutInfo);
  const [openKickOutModal, setOpenKickOutModal] = useRecoilState(
    studyRoomAtoms.openKickOutModal,
  );

  const kickOutUser = () => {
    socket.emit('kickOut', {
      socketId: kickOutInfo[0],
    });
    postBanUser(kickOutInfo[1], kickOutInfo[2])
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenKickOutModal(false);
  };

  return (
    <>
      <ModalOverlay />
      <ModalWrapper tabIndex="-1">
        <ModalInner tabIndex="0" className="modal-inner">
          <p style={{ fontSize: '25px' }}>
            <span style={{ color: '#ef8585' }}>{kickOutInfo[3]}</span>님을 강퇴
            하시겠습니까?
          </p>
          <Button onClick={() => kickOutUser()}>네</Button>
          <Button onClick={() => setOpenKickOutModal(false)}>아니오</Button>
        </ModalInner>
      </ModalWrapper>
    </>
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
  background-color: #fff;
  border-radius: 10px;
  width: 480px;
  max-width: 560px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`;

const Button = styled.button`
  align-items: center;
  margin: 5px;
  width: 25%;
  height: 48px;
  background-color: #ef8585;
  font-size: 0.95rem;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  border: 0;
  outline: 0;
  text-decoration: none;
`;

export default UserKickOutModal;
