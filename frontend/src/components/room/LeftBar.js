import './StudyRoom.css';
import logo from "../../images/logoBack.png";
import menu from "../../images/menu.png";
import planner from "../../images/planner.png";
import chat from "../../images/chat.png";
import back from "../../images/back.png";
const LeftBar = ()=>{
  return (
    <div className="Container">
            <div className="LeftBarWrap">
              <div className="LeftTopIconWrap">
                <div className="LogoIcon">
                  <img
                    style ={{width:'60px',backgroundColor:''}}
                    src={logo}
                    alt="logo"
                  />
                </div>
                <div className="menuIcon">
                <img
                    style ={{width:'auto',backgroundColor:''}}
                    src={menu}
                    alt="menu"
                  />
                </div>
                <div className="plannerIcon">
                <img
                    style ={{width:'auto',backgroundColor:''}}
                    src={planner}
                    alt="planner"
                  />
                </div>
              </div>
              <div className="LeftBottomIconWrap">
                <div className="chatIcon">
                <img
                    style ={{width:'auto',backgroundColor:''}}
                    src={chat}
                    alt="chat"
                  />
                </div>
                <div className="backIcon">
                <img
                    style ={{width:'auto',backgroundColor:''}}
                    src={back}
                    alt="back"
                  />
                </div>
              </div>
            </div>
            <div className="RightWrap">
            </div>
        </div>


  );
}

export default LeftBar

//  <h1>스터디룸 페이지</h1>;