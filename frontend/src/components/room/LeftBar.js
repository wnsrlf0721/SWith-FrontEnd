import './StudyRoom.css';
import logo from "../../images/logoBack.png";
import menu from "../../images/menu.png";
import planner from "../../images/planner.png";
import chat from "../../images/chat.png";
import back from "../../images/back.png";
import StudyEditModal from './StudyEditModal';
import {useState} from 'react';

const LeftBar = ({studyRoomId})=>{
  const [modalVisible, setModalVisible] = useState(false)
  const openModal = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }


  return (
            <div className="LeftBarWrap">
              <div className="LeftTopIconWrap">
                <div className="LogoIcon">
                  <img
                    style ={{width:'60px',backgroundColor:''}}
                    src={logo}
                    alt="logo"
                  />
                </div>
                <div className="ImgIcon">
                <img
                    style ={{width:'auto',backgroundColor:''}}
                    src={menu}
                    onClick={openModal}
                    alt="menu"
                    
                  />
                </div>
                  {
                    modalVisible && <StudyEditModal
                      visible={modalVisible}
                      closable={true}
                      maskClosable={true}
                      onClose={closeModal}
                      studyRoomId={studyRoomId}></StudyEditModal>
                  }
                <div className="ImgIcon">
                <img
                    style ={{width:'auto',backgroundColor:''}}
                    src={planner}
                    alt="planner"
                  />
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
                    style ={{width:'auto',backgroundColor:''}}
                    src={back}
                    alt="back"
                  />
                </div>
              </div>
            </div>


  );
}

export default LeftBar
