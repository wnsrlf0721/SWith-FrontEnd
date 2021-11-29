import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import Topbar from '../components/Main/Topbar';
import Mypage from '../components/Main/MyPage';
import BottomPage from '../components/Main/BottomPage';

//상단 카드, 객체 이름 css, homepage flex시 위치 수정

const Main = ({ location }) => {
  const query = queryString.parse(location.search);
  return (
    <Wrap>
      <Topbar />
      <Mypage />
      <BottomPage search={query.search} />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 64px;
  padding-bottom: 120px;
  background-color: #fff;
  position: relative;
`;

export default Main;
