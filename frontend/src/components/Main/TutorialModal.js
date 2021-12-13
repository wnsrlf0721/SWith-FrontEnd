import styled from 'styled-components';

import React from 'react';
import { getStudyRoomInfo, patchStudyRoomInfo } from '../../api/APIs';

import historyCapture from '../../images/studyroomHistory_capture.png';
import todaytimeCapture from '../../images/todayStudyTime_capture.png';
import categoryCapture from '../../images/studyCategory_capture.png';
import closeImg from '../../images/close.png';

const TutorialModal = ({ onClose, maskClosable, visible }) => {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };
  const mainTutorial = () => {
    return (
      <div style={{ flexDirection: 'column' }}>
        <div style={{ top: '10px', right: '10px', position: 'absolute' }}>
          <img
            src={closeImg}
            onClick={() => onClose()}
            style={{ height: '15px', width: '15px', cursor: 'pointer' }}
          ></img>
        </div>
        <div className="page">
          <Header>
            <h3>스윗한 SWith 가이드 - 홈</h3>{' '}
          </Header>
          <img
            src={historyCapture}
            style={{ marginTop: '30px', height: '150px', width: 'fit-content' }}
          ></img>
          <TextWrap>1. 스터디카드를 누르면 스터디룸으로 입장할 수 있습니다.</TextWrap>
          <TextWrap>2. 내 스터디에는 내가 입장했던 스터디가 표시됩니다. </TextWrap>
          <img
            src={todaytimeCapture}
            style={{ marginTop: '30px', height: '150px', width: 'fit-content' }}
          ></img>
          <TextWrap>
            3. 학습 시간에는 오늘 스터디룸에서 공부한 시간과 학습관리에서 추가한 오늘의
            할일 달성률이 표시됩니다.
          </TextWrap>
          <img
            src={categoryCapture}
            style={{ marginTop: '30px', width: '400px', height: 'fit-content' }}
          ></img>
          <TextWrap>
            4. 스터디룸의 카테고리를 선택하면 카테고리에 맞는 스터디룸이 표시됩니다.
          </TextWrap>
        </div>
      </div>
    );
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
          <Container>{mainTutorial()}</Container>
        </ModalInner>
      </ModalWrapper>
    </>
  );
};
const TextWrap = styled.div`
  text-align: left;
  margin: 3px 0;
  width: 100%;
`;
const Header = styled.div`
  height: 45px;
  font-weight: bold;
`;
const Container = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: normal;
  .page {
    display: flex;
    position: relative;
    align-items: center;
    margin: 20px 50px;
    flex-direction: column;
    font-family: Roboto;
    font-size: 16px;
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
  height: 750px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
`;

export default TutorialModal;
