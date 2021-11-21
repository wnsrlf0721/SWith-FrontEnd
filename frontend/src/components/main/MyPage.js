import React, { useEffect, useState } from "react";
import BtnPrev from "../../images/Prev.svg";
import BtnNext from "../../images/Next.svg";
import studyImage from "../../images/studyImage.jpg";
import axios from "../../api/defaultaxios";
import Progress from "../plan/Progress";
import moment from "moment";
import "./StudyCard.css";
import "./MyPage.css";
import StudyCard from "./StudyCard";
import styled from "styled-components";
const Img = styled.img`
  height: auto;
  width: 30px;
  &:hover {
    cursor: pointer;
    background-color: #ef8585;
    border: solid 1px #ef8585;
  }
`;

const MyPage = () => {
  const [NickName, setNickName] = useState("");
  const [posts, setPosts] = useState([]);
  const [todaystudy, setTodaystudy] = useState({
    hour: 0,
    minute: 0,
    second: 0,
    complete: 0,
    count: 0,
  });

  const studyBox = () => {
    return (
      <>
        {currentPosts.map((data) => {
          return (
            <div className="LinkContainer">
              <StudyCard
                title={data.title}
                imgUrl={studyImage}
                body={data.hashtags}
                studyRoomID={data.id}
                nickName={NickName}
              ></StudyCard>
            </div>
          );
        })}
      </>
    );
  };

  const LoginStudy = (isLogined) => {
    const postsNum = currentPosts.length;
    if (!isLogined || postsNum === 0) {
      return (
        <div className="blackBox">
          <div className="studyText">
            내가 만든 스터디 또는 초대 받은 스터디가 등록됩니다
          </div>
        </div>
      );
    } else if (postsNum < 3) {
      return (
        <>
          {studyBox()}
          <div className="blackBox">
            <div className="studyText">
              내가 만든 스터디 또는 초대 받은 스터디가 등록됩니다
            </div>
          </div>
        </>
      );
    } else if (postsNum >= 3) {
      return <>{studyBox()}</>;
    }
  };
  const LoginStudyTime = (isLogined) => {
    if (isLogined) {
      return (
        <div className="StudyTimeBox">
          <div
            className="ColumnWrap"
            style={{ margin: "30px 40px", height: "100%", width: "80%" }}
          >
            <div className="ColumnWrap">
              <div
                className="TextBox"
                style={{ fontWeight: "bold", fontSize: "15px" }}
              >
                오늘 공부한 시간
              </div>
              <div className="TextBox">
                {`${todaystudy.hour
                  .toString()
                  .padStart(2, "0")}:${todaystudy.minute
                  .toString()
                  .padStart(2, "0")}:${todaystudy.second
                  .toString()
                  .padStart(2, "0")}`}
              </div>
            </div>
            <div className="Line"></div>
            <div className="ColumnWrap">
              <div
                className="TextBox"
                style={{ fontWeight: "bold", fontSize: "15px" }}
              >
                오늘의 할일 달성률
              </div>
              <div style={{ marginTop: "15px", alignItems: "center" }}>
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
      );
    } else {
      return (
        <div
          className="StudyTimeBox"
          style={{ justifyContent: "center", flexDirection: "row" }}
        >
          <div
            className="studyText"
            style={{ color: "#454648", margin: "3px" }}
          >
            나의 학습 시간과 달성률을 보고 싶다면?
          </div>
          <a
            href="/login"
            className="login"
            style={{
              color: "#ef8585",
              margin: "3px",
              textDecorationLine: "none",
            }}
          >
            로그인
          </a>
        </div>
      );
    }
  };
  const isLogined = window.sessionStorage.userInfo == null ? false : true;
  useEffect(() => {
    if (isLogined) {
      const userInfo = JSON.parse(window.sessionStorage.userInfo);
      const date = moment().format("YYYY-MM-DD"); //현재 날짜
      const Today = moment(date);
      //닉네임 설정
      axios
        .get(`/users/${userInfo.userId}`)
        .then((response) => {
          const data = response.data;
          if (data.status === "200" && data.message === "OK") {
            setNickName(data.data.nickname);
          }
        })
        .catch((error) => {
          console.log(error.toJSON());
        });
      //오늘의 공부시간
      axios
        .get(`/statistics/${userInfo.userId}`)
        .then((response) => {
          const datas = response.data.data;
          datas.map((data) => {
            const D_date = moment(data.date);
            //console.log(D_date);
            const Diff = Math.abs(Today.diff(D_date, "days"));

            const hour = Number(data.studyTime.slice(0, 2));
            const minute = Number(data.studyTime.slice(3, 5));
            const second = Number(data.studyTime.slice(6, 8));

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
      //오늘의 달성률
      axios
        .get(`/planners/${userInfo.userId}`)
        .then((response) => {
          const data = response.data.data;
          data.studyplanner_Tasks.map((task) => {
            const plan_date = moment(
              moment(task.startDate).format("YYYY-MM-DD")
            );
            //console.log(Today, plan_date);
            const Diff = Today.diff(plan_date, "days");
            if (Diff === 0) {
              //console.log(task.complete);
              setTodaystudy((prev) => ({
                ...prev,
                complete: prev.complete + task.complete,
                count: prev.count + 1,
              }));
            }
          });
        })
        .catch((error) => {
          console.log(error.toJSON());
        });
      axios
        .get(`/studyrooms/history/${userInfo.userId}`)
        .then((response) => {
          const roomId = response.data.data.studyroomIds;
          for (var i in roomId) {
            console.log(roomId[i]);
          }
          let roomInfo = [];
          axios
            .get("/studyrooms")
            .then((response) => {
              const datas = response.data.data;
              //console.log(datas);
              datas.map((data) => {
                for (var i in roomId) {
                  if (data.id === roomId[i]) {
                    roomInfo = roomInfo.concat({
                      id: data.id,
                      title: data.title,
                      hashtags: data.hashtags,
                      purpose: data.purpose,
                    });
                  } else {
                    continue;
                  }
                }
              });
              setPosts(roomInfo);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error.toJSON());
        });
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const pageRight = () => {
    let pageNum = Math.ceil(posts.length / postsPerPage);
    if (currentPage === pageNum) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };
  const pageLeft = () => {
    let pageNum = Math.ceil(posts.length / postsPerPage);
    if (currentPage === 1) {
      setCurrentPage(pageNum);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="MainContainer">
      <div className="ContentsContainer">
        <div className="StudyHistoryWrap">
          <div className="StudyHistoryHeader">
            <div className="TextBox">내 스터디</div>
            {/* <button onClick={console.log(currentPage)}></button> */}
            <div>
              <Img src={BtnPrev} alt="BtnPrev" onClick={pageLeft} />
              <Img src={BtnNext} alt="BtnNext" onClick={pageRight} />
            </div>
          </div>
          <div className="cardWrap">{LoginStudy(isLogined)}</div>
        </div>
        <div className="StudyTimeWrap">
          <div className="StudyTimeHeader">
            <div className="TextBox">학습 시간</div>
          </div>
          {LoginStudyTime(isLogined)}
        </div>
      </div>
    </div>
  );
};
export default MyPage;
