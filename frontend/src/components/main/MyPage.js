import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import BtnPrev from "../../images/Prev.svg";
import BtnNext from "../../images/Next.svg";
import studyImage from "../../images/studyImage.jpg";
import axios from "../../api/defaultaxios";
import Progress from "../plan/Progress";
import moment from "moment";
import './StudyCard.css'
import './MyPage.css'
import StudyCard from "./StudyCard";

const MyPage = () => {
  const [NickName, setNickName] = useState("");
  const [todaystudy, setTodaystudy] = useState({
    hour: 0,
    minute: 0,
    second: 0,
    complete: 0,
    count: 0,
  });

  const hashtags=[{hashtag:'hashtag1'}]
  
  //스터디 히스토리 추가
  const studyBox=()=>{
    return (
      <div className= "LinkContainer">
        <StudyCard
          title={"스터디기록1"}
          imgUrl={studyImage}
          body={hashtags}
          studyRoomID={"1"}
          nickName={NickName}
        ></StudyCard>
      </div>
      
    );
  }
  const LoginStudy =(isLogined)=>{
    if(isLogined){
      return (
        <>
          {studyBox()}
          {studyBox()}
        </>
      )
    }
  }
  const LoginStudyTime =(isLogined)=>{
    if(isLogined){
      return (
      <div className= "StudyTimeBox">
        <div className = "ColumnWrap" style = {{margin:"30px 40px",height: "100%",width:"80%"}}>
          <div className= "ColumnWrap">
          <div className= "TextBox" style={{ fontWeight: "bold", fontSize: "15px" }}>
            오늘 공부한 시간
          </div>
          <div className= "TextBox" >{`${todaystudy.hour
            .toString()
            .padStart(2, "0")}:${todaystudy.minute
            .toString()
            .padStart(2, "0")}:${todaystudy.second
            .toString()
            .padStart(2, "0")}`}</div>
          </div>
          <div className= "Line"></div>
          <div className= "ColumnWrap">
            <div className= "TextBox" style={{ fontWeight: "bold", fontSize: "15px" }}>
              오늘의 할일 달성률
            </div>
            <div style={{ marginTop: "15px" ,alignItems: "center"}}>
              <Progress
                done={
                  todaystudy.count === 0
                    ? 0
                    : Math.round(
                        Number(todaystudy.complete / todaystudy.count) * 100
                      )
                }
                // ProgressBar
              />
            </div>
          </div>
        </div>
      </div>
      )
    }else{
      return (
        <div className= "StudyTimeBox" style={{justifyContent: "center",flexDirection:"row"}}>
          <div className= "studyText" style= {{color:"#454648", margin:"3px"}}>나의 학습 시간과 달성률을 보고 싶다면?</div>
          <a href="/login" className="login" style= {{color:"#ef8585", margin:"3px",textDecorationLine: "none"}}>
              로그인
            </a>
        </div>
      )
    }
  }
  const isLogined = window.sessionStorage.userInfo == null ? false : true;
  useEffect(() => {
    if (isLogined) {
      const userInfo = JSON.parse(window.sessionStorage.userInfo);
      const date = moment().format("YYYY-MM-DD"); //현재 날짜
      const Today = moment(date);
      axios
        .get(`/statistics/${userInfo.userId}`)
        .then((response) => {
          const datas = response.data.data;
          setNickName(datas.nickname);
          //console.log(datas);
          datas.map((data) => {
            //일간, 주간, 월간 공부시간 기록
            const D_date = moment(data.date);
            //console.log(D_date);
            const Diff = Math.abs(Today.diff(D_date, "days"));

            const hour = Number(data.studyTime.slice(0, 2));
            const minute = Number(data.studyTime.slice(3, 5));
            const second = Number(data.studyTime.slice(6, 8));

            //오늘의 공부시간
            if (Diff === 0) {
              setTodaystudy((prev) => ({
                ...prev,
                hour: prev.hour + hour,
                minute: prev.minute + minute,
                second: prev.second + second,
              }));
            }
          });
        })
        .catch((error) => {
          console.log(error.toJSON());
        });
      axios
        .get(`/planners/${userInfo.userId}`)
        .then((response) => {
          const data = response.data.data;
          data.studyplanner_Tasks.map((task) => {
            const plan_date = moment(task.startDate);
            const Diff = Math.abs(Today.diff(plan_date, "days"));
            if (Diff === 0) {
              //console.log(task.complete);
              setTodaystudy((prev) => ({
                ...prev,
                complete: prev.complete + task.complete,
                count: prev.complete + 1,
              }));
            }
          });
        })
        .catch((error) => {
          console.log(error.toJSON());
        });
      //참여했던 스터디룸 조회 API
      // axios
      //   .get(`/studyrooms-history/${userInfo.userId}`)
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.log(error.toJSON());
      //   });
    }

  }, []);

  return (
    <div className= "MainContainer">
      <div className= "ContentsContainer">
        <div className= "StudyHistoryWrap">
          <div className= "StudyHistoryHeader">
            <div className= "TextBox">내 스터디</div>
            <div>
              <img
                style={{ height: "auto", width: "30px" ,cursor:"pointer"}}
                src={BtnPrev}
                alt="BtnPrev"
              />
              <img
                style={{ height: "auto", width: "30px" ,cursor:"pointer"}}
                src={BtnNext}
                alt="BtnNext"
              />
            </div>
          </div>
          <div className= "cardWrap">
            {LoginStudy(isLogined)}
            <div className= "LinkContainer" 
              style= {{cursor: 'default',backgroundColor: "#454648",  display: "flex",alignItems: "center"}}>
              <div className= "studyText">내가 만든 스터디 또는 초대 받은 스터디가 등록됩니다</div>
            </div>
          </div>
        </div>
        <div className= "StudyTimeWrap">
            <div className= "StudyTimeHeader">
              <div className= "TextBox">학습 시간</div>
            </div>
            {LoginStudyTime(isLogined)}
        </div>
      </div>
    </div>
  );
};
export default MyPage;
