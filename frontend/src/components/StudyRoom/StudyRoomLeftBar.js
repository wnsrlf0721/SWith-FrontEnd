import './css/StudyRoom.css';

import StudyRoomEditModal from './StudyRoomEditModal';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logoBack.png';
import menu from '../../images/setting_icon.svg';
import planner from '../../images/planner.png';
import chat from '../../images/chat.png';
import back from '../../images/back.png';

const StudyRoomLeftBar = ({ studyRoomId, masterId, userId }) => {
  //console.log(studyRoomId);
  //console.log(masterId, userId);
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    if (masterId === userId) {
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
            style={{ width: '60px', backgroundColor: '', cursor: 'default' }}
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
        <div className="ImgIcon">
          {/* <Link to={{
                    pathname: `/StudyRoom/${studyRoomID}/${nickName}/${window.localStorage.userInfo}`
                    }}
                    target= "_blank"
                    rel="noopener noreferrer"
                > */}
          {/* <Link to="/plan"
                    target= "_blank"
                    rel="noopener noreferrer"
                > */}
          {/* <img
            style={{ width: "auto", backgroundColor: "" }}
            src={planner}
            alt="planner"
          /> */}
          {/* </Link> */}
        </div>
      </div>
      <div className="LeftBottomIconWrap">
        {/* <div className="ImgIcon">
                <img
                    style ={{width:'auto',backgroundColor:''}}
                    src={chat}
                    alt="chat"
                  />
                </div> */}
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
