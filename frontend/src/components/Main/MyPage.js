import './css/MyPage.css';
import styled from 'styled-components';

import React, { useEffect, useState } from 'react';
import {
  getUserInfo,
  getUserStatistics,
  getUserPlanner,
  getUserStudyRoomsHistory,
  getStudyRooms,
} from '../../api/APIs';
import moment from 'moment';
import Progress from '../StudyPlan/Progress';
import StudyCard from './StudyCard';

import BtnPrev from '../../images/Prev.svg';
import BtnNext from '../../images/Next.svg';
import studyImage from '../../images/studyImage.jpg';

const MyPage = () => {
  const [NickName, setNickName] = useState('');
  const [posts, setPosts] = useState([]);
  const [todaystudy, setTodaystudy] = useState({
    hour: 0,
    minute: 0,
    second: 0,
    complete: 0,
    count: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const isLogined = window.localStorage.userInfo == null ? false : true;

  useEffect(() => {
    if (isLogined) {
      const userInfo = JSON.parse(window.localStorage.userInfo);
      const date = moment().format('YYYY-MM-DD');
      const Today = moment(date);

      getUserInfo(userInfo.userId)
        .then((response) => {
          const data = response.data;
          if (data.status === '200' && data.message === 'OK') {
            setNickName(data.data.nickname);
          }
        })
        .catch((error) => {
          console.log(error.toJSON());
        });

      getUserStatistics(userInfo.userId)
        .then((response) => {
          const datas = response.data.data;
          datas.map((data) => {
            const D_date = moment(data.date);
            const Diff = Math.abs(Today.diff(D_date, 'days'));

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

      getUserPlanner(userInfo.userId)
        .then((response) => {
          const data = response.data.data;
          data.studyplanner_Tasks.map((task) => {
            const plan_date = moment(moment(task.startDate).format('YYYY-MM-DD'));
            const Diff = Today.diff(plan_date, 'days');
            if (Diff === 0) {
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
      getUserStudyRoomsHistory(userInfo.userId)
        .then((response) => {
          const roomId = response.data.data.studyroomIds;
          let roomInfo = [];
          getStudyRooms()
            .then((response) => {
              const datas = response.data.data;
              datas.map((data) => {
                for (var i in roomId) {
                  if (data.id === roomId[i]) {
                    roomInfo = roomInfo.concat({
                      id: data.id,
                      title: data.title,
                      hashtags: data.hashtags,
                      purpose: data.purpose,
                      maxUserCount: data.maxUserCount,
                      userCount: data.userCount,
                      secret: data.secret,
                      imageURL: data.imageURL,
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
          console.log(error);
        });
    }
  }, []);

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

  const studyBox = () => {
    return (
      <>
        {currentPosts.map((data) => {
          return (
            <div className="LinkContainer">
              <StudyCard
                title={data.title}
                imgUrl={data.imageURL ? data.imageURL : studyImage}
                body={data.hashtags}
                studyRoomID={data.id}
                nickName={NickName}
                maxUserCount={data.maxUserCount}
                userCount={data.userCount}
                secret={data.secret}
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
          <div className="studyText">내가 입장했던 스터디가 등록됩니다.</div>
        </div>
      );
    } else if (postsNum < 3) {
      return (
        <>
          {studyBox()}
          <div className="blackBox">
            <div className="studyText">내가 입장했던 스터디가 등록됩니다.</div>
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
            style={{ margin: '30px 40px', height: '100%', width: '80%' }}
          >
            <div className="ColumnWrap">
              <div className="TextBox" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                오늘 공부한 시간
              </div>
              <div className="TextBox">
                {`${todaystudy.hour.toString().padStart(2, '0')}:${todaystudy.minute
                  .toString()
                  .padStart(2, '0')}:${todaystudy.second.toString().padStart(2, '0')}`}
              </div>
            </div>
            <div className="Line"></div>
            <div className="ColumnWrap">
              <div className="TextBox" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                오늘의 할일 달성률
              </div>
              <div style={{ marginTop: '15px', alignItems: 'center' }}>
                <Progress
                  done={
                    todaystudy.count === 0
                      ? 0
                      : Math.round(Number(todaystudy.complete / todaystudy.count) * 100)
                  }
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
          style={{ justifyContent: 'center', flexDirection: 'row' }}
        >
          <div className="studyText" style={{ color: '#454648', margin: '3px' }}>
            나의 학습 시간과 달성률을 보고 싶다면?
          </div>
          <a
            href="/login"
            className="login"
            style={{
              color: '#ef8585',
              margin: '3px',
              textDecorationLine: 'none',
              fontWeight: 'bold',
            }}
          >
            로그인
          </a>
        </div>
      );
    }
  };

  return (
    <div className="MainContainer">
      <div className="ContentsContainer">
        <div className="StudyHistoryWrap">
          <div className="StudyHistoryHeader">
            <div className="TextBox">내 스터디</div>
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

const Img = styled.img`
  height: auto;
  width: 30px;
  &:hover {
    cursor: pointer;
    background-color: #ef8585;
    border: solid 1px #ef8585;
  }
`;
