import './css/StudyRoom.css';

import StudyRoomEditModal from './StudyRoomEditModal';
import { useState, useEffect } from 'react';

import logo from '../../images/SWith_logo2.svg';
import menu from '../../images/setting_icon.svg';
import back from '../../images/back.png';

const StudyRoomLeftBar = ({ studyRoomId, masterId, userId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const isLogined = window.localStorage.userInfo == null ? false : true;
    if (isLogined) {
      const local = JSON.parse(window.localStorage.userInfo);
      setUserEmail(local.name);
    }
  }, []);

  const openModal = () => {
    if (masterId === userId || userEmail === 'admin@swith.ml') {
      setModalVisible(true);
    } else {
      alert('방장만 스터디룸 수정할 수 있습니다!');
      return;
    }
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="LeftBarWrap">
      <div className="LeftTopIconWrap">
        <div className="LogoIcon">
          <img
            style={{ width: '50px', backgroundColor: '', cursor: 'default' }}
            src={logo}
            alt="logo"
          />
        </div>
        <div className="ImgIcon">
          <img
            style={{ width: 'auto', backgroundColor: '' }}
            src={menu}
            onClick={openModal}
            alt="menu"
          />
        </div>
        {modalVisible && (
          <StudyRoomEditModal
            visible={modalVisible}
            closable={true}
            maskClosable={true}
            onClose={closeModal}
            studyRoomId={studyRoomId}
          ></StudyRoomEditModal>
        )}
        <div className="ImgIcon"></div>
      </div>
      <div className="LeftBottomIconWrap">
        <div className="ImgIcon">
          <img
            style={{ width: 'auto', backgroundColor: '' }}
            src={back}
            alt="back"
            onClick={() => {
              window.open('', '_self').close();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StudyRoomLeftBar;
