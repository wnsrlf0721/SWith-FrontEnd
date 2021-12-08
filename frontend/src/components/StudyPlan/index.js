import './css/styles.css';
import styled from 'styled-components';

import React, { useState, useEffect } from 'react';
import { getUserPlanner } from '../../api/APIs';
import Calendar from './Calendar';
import Statistics from './Statistics';
import Topbar from '../Main/Topbar';

const Index = () => {
  const [task, setTask] = useState([]);
  useEffect(() => {
    const isLogined = window.localStorage.userInfo == null ? false : true;
    if (!isLogined) {
      alert('로그인이 필요합니다.');
      return (window.location.href = '/login');
    }
    const userInfo = JSON.parse(window.localStorage.userInfo);
    let tempEvents = [];
    getUserPlanner(userInfo.userId)
      .then((response) => {
        const data = response.data.data;
        data.studyplanner_Tasks.map((task) => {
          tempEvents = tempEvents.concat({
            id: task.id,
            title: task.taskDescription,
            start: task.startDate,
            end: task.endDate,
            complete: task.complete,
          });
        });
        setTask(tempEvents);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  }, []);

  const [swapleft, setSwapleft] = useState(true);
  return (
    <>
      <Topbar />
      <TabWrapContainer>
        <TabWrap>
          <Button className={swapleft ? 'active' : ''} onClick={() => setSwapleft(true)}>
            캘린더
          </Button>
          <Button
            className={!swapleft ? 'active' : ''}
            onClick={() => setSwapleft(false)}
          >
            통계
          </Button>
        </TabWrap>
      </TabWrapContainer>

      {swapleft ? <Calendar /> : <Statistics task={task} />}
    </>
  );
};
export default Index;

const Button = styled.button`
  width: 83px;
  height: 40px;
  margin: 4px;
  border: 1px solid #d0d0d0;
  background-color: #fff;
  color: #454648;
  border-radius: 17px;
  padding: 3px 14px;
  font-size: 15px;
  line-height: 34px;
  outline: 0;
  text-decoration: none;
  cursor: pointer;
  align-items: center;
`;

const TabWrap = styled.div`
  width: 182px;
  font-family: Roboto;
  font-size: 14px;
  //display: flex;
  align-items: center;
  display: table;
  margin-left: auto;
  margin-right: auto;
  .active {
    border: 1px solid #f8ad1d;
    background-color: #f8ad1d;
    font-weight: 700;
    color: #fff;
  }
`;
const TabWrapContainer = styled.div`
  width: 100%;
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
`;
