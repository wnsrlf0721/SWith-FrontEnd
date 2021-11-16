import './StudyRoom.css';
import searchGray from "../../images/search_gray.png";
import heartTrue from "../../images/heart_true.png";
import defaultProfile from "../../images/default_profile_Image.png";
import planner from "../../images/planner2.png";
import cameraTrue from "../../images/camera_default.png";
import micTrue from "../../images/mic_default.png";

const user = [
    {
        id:1,
        name : '사용자'
    },
    {
        id:2,
        name : '유저1'
    },
    {
        id:3,
        name : '유저2'
    },
    {
        id:4,
        name : '유저3'
    },
    {
        id:4,
        name : '유저3'
    },
    {
        id:4,
        name : '유저3'
    },
    {
        id:4,
        name : '유저3'
    },
    {
        id:4,
        name : '유저3'
    }
]


const isUser = (user) => {
    if(user.id!=1){
        return (
            <div className="ImgIcon" style={{height: 'auto'}}>
                <img
                    style ={{width:'15px'}}
                    src={heartTrue}
                    alt="heartTrue"
                />
            </div>
        )
    }
}

const UserList = ()=>{
  return (
    <div className="UserListtWrap">
        <div className="UserList">
            <div className="rowContainer">
                <div className = "text" style={{fontWeight:'bold'}}>참여자 목록</div>
                <div className = "text" style={{fontSize:'12px'}}>4/4</div>
            </div>
            <div className="rowContainer">
                <div className="ImgIcon" style={{height: 'auto'}}>
                    <img
                        style ={{width:'15px',backgroundColor:''}}
                        src={searchGray}
                        alt="searchGray"
                    />
                </div>
            </div>
        </div>
        <div className="List" style={{overflow: "auto"}}>
           {user.map((user)=>{
                return (
                    <div className="UserList">
                        <div className="rowContainer">
                            <div className="profile">
                                <img
                                    style ={{height:'30px',width:'auto',objectFit:'cover'}}
                                    src={defaultProfile}
                                    alt="defaultProfile"
                                />
                            </div>
                            <div className = "text" style= {{maxWidth:"140px",overflow: "hidden"}} >{user.name}</div>
                        </div>
                        <div className="rowContainer">
                            <div className="ImgIcon" style={{height: 'auto'}}>
                                <img
                                    style ={{width:'15px'}}
                                    src={cameraTrue}
                                    alt="cameraTrue"
                                />
                            </div>
                            {isUser(user)}
                            <div className="ImgIcon" style={{height: 'auto'}}>
                                <img
                                    style ={{width:'15px'}}
                                    src={micTrue}
                                    alt="micTrue"
                                />
                            </div>
                            <div className="ImgIcon" style={{height: 'auto'}}>
                                <img
                                    style ={{width:'15px'}}
                                    src={planner}
                                    alt="planner"
                                />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  );
}

export default UserList
