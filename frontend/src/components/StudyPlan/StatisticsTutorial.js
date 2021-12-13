import styled from 'styled-components';

import React from 'react';

import chartsImage1 from '../../images/stats_charts_1.png';
import chartsImage2 from '../../images/stats_charts_2.png';
import closeImg from '../../images/close.png';

const StatisticsTutorial = ({ onClose, maskClosable, visible }) => {
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
              <h3 style={{ fontWeight: 'bold' }}>스윗한 SWith 가이드 - 통계</h3>
              <ContentsWrap>
                <Text>
                  1. 학습관리의 "통계"는 일간, 주간, 월간별로 "공부시간"과 "달성률"을
                  확인할 수 있습니다.
                </Text>
                <Text>
                  2. "공부시간"은 스터디룸에 입장하여 공부한 시간을 기록한 수치입니다.
                </Text>
                <br /> <br />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <img
                    src={chartsImage1}
                    alt="chartsImage1"
                    style={{ width: '200px', marginLeft: '30px' }}
                  ></img>
                  <img
                    src={chartsImage2}
                    alt="chartsImage2"
                    style={{ width: '150px', marginLeft: '30px' }}
                  ></img>
                </div>
                <Text>
                  3. "달성률"은 "캘린더"에서 완료한 일정에 대해서 달성한 비율을 환산하여
                  수치와 차트로 나타냅니다.
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
  height: 600px;
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
  margin: 20px;
`;

export default StatisticsTutorial;
