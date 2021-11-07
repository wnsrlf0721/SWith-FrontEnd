import React from "react";
//import {StyleSheet, Text, View} from 'react-native';
import styled from "styled-components";
import Topbar from "./topbar";
import Mypage from "./MyPage";
import BottomPage from "./BottomPage";

//상단 카드, 객체 이름 css, homepage flex시 위치 수정

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 800px;
  min-width: 800px;
  text-align: left;
  //align-items: center;
`;

const Index = () => {
  return (
    <Wrap>
      <Topbar />
      <Mypage />
      <BottomPage />
    </Wrap>
  );
};

export default Index;
