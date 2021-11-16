import React from "react";
import styled from "styled-components";
import queryString from "query-string";
import Topbar from "../components/topbar";
import Mypage from "../components/main/MyPage";
import BottomPage from "../components/main/BottomPage";

//상단 카드, 객체 이름 css, homepage flex시 위치 수정

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 800px;
  min-width: 800px;
  text-align: left;
  //align-items: center;
`;

const Index = ({ location }) => {
  const query = queryString.parse(location.search);
  return (
    <Wrap>
      <Topbar />
      <Mypage />
      <BottomPage search={query.search} />
    </Wrap>
  );
};

export default Index;
