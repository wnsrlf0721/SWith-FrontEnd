import styled from 'styled-components';

import React from 'react';
import { getStudyRoomInfo, patchStudyRoomInfo } from '../../api/APIs';

const CalendarTutorial = ({ onClose, maskClosable, visible }) => {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };
  return (
    <>
      <ModalOverlay />
      <ModalWrapper
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <ModalInner tabIndex="0" className="modal-inner">
          <Container>
            <div className="page">시간이 된다면 간단한 튜토리얼 작성</div>
          </Container>
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

const Container = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: normal;
  .page {
    display: flex;
    position: relative;
    width: 100%;
    margin: 0 10px;
    padding: 50px 0;
    flex-direction: column;
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  overflow: auto;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  position: absolute;
  background-color: #fff;
  border-radius: 10px;
  width: 600px;
  height: 700px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
`;

export default CalendarTutorial;
