import styled from 'styled-components';

import React from 'react';

import sidebar from '../../images/sidebar.png';
import select from '../../images/addtodo.png';
import deleteBlock from '../../images/deleteblock.png';
import rightButton from '../../images/month.png';
import leftButton from '../../images/today.png';
import closeImg from '../../images/close.png';

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
            <div style={{ top: '10px', right: '10px', position: 'absolute' }}>
              <img
                src={closeImg}
                onClick={() => onClose()}
                style={{ height: '15px', width: '15px', cursor: 'pointer' }}
              ></img>
            </div>
            <div className="page">
              <h3 style={{ fontWeight: 'bold' }}>스윗한 SWith 가이드 - 캘린더</h3>
              <ContentsWrap>
                <img src={rightButton} alt="1번사진" style={{ width: '120px' }}></img>
                <Text>
                  1. 학습관리의 "캘린더"는 "month", "week", "day" 버튼을 통해 각각 월, 주,
                  일별로 일정을 확인할 수 있습니다.
                </Text>
                <img src={leftButton} alt="2번사진" style={{ width: '110px' }}></img>
                <Text>
                  2. 왼쪽, 오른쪽 각 화살표를 눌러 이전 달, 다음 달을 넘나들 수 있으며
                  "today" 를 누르면 현재 달로 돌아갑니다.
                </Text>
                <img src={deleteBlock} alt="3번사진" style={{ width: '95px' }}></img>
                <Text>3. 캘린더의 날짜 칸을 클릭하면 일정을 추가할 수 있습니다.</Text>
                <Text>
                  4. "week"와 "day"에서는 클릭 혹은 드래그로 일정을 추가할 수 있습니다.
                </Text>

                <Text>5. 생성된 일정 블록을 클릭하면 일정을 삭제할 수 있습니다.</Text>

                <img src={sidebar} alt="6번사진" style={{ width: '150px' }}></img>
                <Text>
                  6. 일정은 오른쪽 사이드 바의 "To-do List"에서 날짜별로 확인할 수
                  있습니다.
                </Text>

                <Text>
                  7. 자신의 일정(혹은 할일)을 완료하고 체크박스를 체크하여 달성된 것을
                  표시합니다. 집계된 달성률은 "통계"에서 확인할 수 있습니다.{' '}
                </Text>
              </ContentsWrap>
            </div>
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
    margin: 0 50px;
    padding: 20px 0;
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
  height: 750px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
`;

const ContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Text = styled.div`
  text-align: left;
  margin-bottom: 10px;
`;

export default CalendarTutorial;
