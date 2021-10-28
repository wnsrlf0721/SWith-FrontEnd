import React from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  background: #ffffff;
  /* gray/2 */

  border: 1px solid #cccccc;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;

  position: static;
  width: 809px;
  height: 41px;
  left: 20px;
  top: 10px;

  background: #ffffff;
`;
const Right = styled.div`
  position: static;
  width: 180px;
  height: 40px;
  left: 1720px;
  top: 10.5px;

  /* Inside Auto Layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 167px;
`;

const topbar = () => {
  return (
    <Container>
      <Left>
        <a href="/">홈</a>
        <a href="/plan">공부기록</a>
        <a href="/comm">커뮤니티</a>
        <input type="text" placeholder="스터디룸 검색" />
      </Left>
      <Right>
        <a href="/login">로그인</a>
      </Right>
    </Container>
  );
};

export default topbar;
