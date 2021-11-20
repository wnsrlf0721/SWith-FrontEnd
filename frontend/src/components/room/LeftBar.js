import "./StudyRoom.css";
import logo from "../../images/logoBack.png";
import menu from "../../images/menu.png";
import planner from "../../images/planner.png";
import chat from "../../images/chat.png";
import back from "../../images/back.png";
import StudyEditModal from "./StudyEditModal";
import { useState } from "react";
import { Link } from "react-router-dom";

const LeftBar = ({ studyRoomId }) => {
  //console.log(studyRoomId);
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="LeftBarWrap">
      <div className="LeftTopIconWrap">
        <div className="LogoIcon">
          <img
            style={{ width: "60px", backgroundColor: "", cursor: "default" }}
            src={logo}
            alt="logo"
          />
        </div>
        <div className="ImgIcon">
          <img
            style={{ width: "auto", backgroundColor: "" }}
            src={menu}
            onClick={openModal}
            alt="menu"
          />
        </div>
        {modalVisible && (
          <StudyEditModal
            visible={modalVisible}
            closable={true}
            maskClosable={true}
            onClose={closeModal}
            studyRoomId={studyRoomId}
          ></StudyEditModal>
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
          <img
            style={{ width: "auto", backgroundColor: "" }}
            src={planner}
            alt="planner"
          />
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
            style={{ width: "auto", backgroundColor: "" }}
            src={back}
            alt="back"
          />
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
