import React from "react";
import './StudyCard.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../api/defaultaxios";

function StudyCard({title,imgUrl,body,studyRoomID,nickName}) {
    const isLogined = window.sessionStorage.userInfo == null ? false : true;
    const [NickName, setNickName] = useState("");
    const [studyRoomId, setStudyRoomId] = useState("");
    const [id, setId] = useState("");
    const [pwInput,setPwInput] = useState("");
    const [pwInfo,setPwInfo] = useState([]);

    // useEffect(() => {        
    //     console.log(studyRoomId)
    //     axios
    //         .get(`/studyrooms/${studyRoomId}`)
    //         .then((response) => {
    //             const data = response.data;
    //             console.log(data.data);
    //             setPwInfo({
    //                 secret: data.data.secret,
    //                 password:data.data.password
    //             })
    //             //console.log(studyRoomInfo);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //         //console.log(studyRoomId)
    // }, [])


    const enterStudyRoom = () =>{
        if(!isLogined){
            alert("로그인이 필요합니다.");
            return;
        }
        //setNickName(nickName);
        //setStudyRoomId(studyRoomID);
        //setId(user.id);

        
        
        window.open(`/StudyRoom/${studyRoomID}/${nickName}/${window.sessionStorage.userInfo}`, "_blank", "noopener noreferrer");
        // window.open(`/StudyRoom/${studyRoomID}/${nickName}`, "_blank", "noopener noreferrer");
        // if(window.localStorage.getItem("enteredStudyRoom") === "true")
        //     alert("이미 스터디룸에 입장하였습니다.");
        // else{
            // window.localStorage.setItem("enteredStudyRoom", "true");
        //     window.open(`/StudyRoom/${studyRoomID}/${nickName}`, "_blank", "noopener noreferrer");
        // }

    }
    return(
        <> 
            {/* <Link to={{
                    pathname: `/StudyRoom/${studyRoomID}/${nickName}/${window.sessionStorage.userInfo}`
                    }}
                    target= "_blank"
                    rel="noopener noreferrer"
                > */}
                <button className="card-container" onClick={enterStudyRoom}>
                    <div className="image-container">
                        <img src ={imgUrl} alt='기본스터디이미지'/>

                    </div>
                    <div className="card-content">
                        <div className="card-title">
                            <h3>{title}</h3>
                        </div>
                        <div className="card-body">
                            <div className = "hashtagWrap">
                                {body.map((x)=>{
                                    return (
                                    <div className= "t">{'#'+x.hashtag}</div>
                                )})}
                            </div>
                        </div>

                    </div>

                </button>
            {/* </Link> */}
        </>
    );
}
export default StudyCard;