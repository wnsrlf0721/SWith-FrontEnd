import React, { useState } from "react";
import Calendar from "./Calendar";
import styled from "styled-components";
import Topbar from "../topbar";
import "./styles.css";
//import ToggleBtn from "./ToggleBtn";


const ButtonActive = styled.button`
  margin : 4px;  
  border: 1px
  solid #f8ad1d;
  background-color: #f8ad1d;
  font-weight: 700;
  color: #fff;
  border-radius: 17px;
  padding: 3px 14px;
  font-size: 15px;
  line-height: 34px;
  outline: 0;
  text-decoration: none;
  cursor: pointer;
  width:83px;
  align-items: center;
`;
const Button = styled.button`
  width: 83px;
  margin : 4px;
  border: 1px
  solid #d0d0d0;
  border-radius: 17px;
  padding: 3px 14px;
  background-color: #fff;
  font-size: 15px;
  line-height: 34px;
  cursor: pointer;
  color : #454648;
  align-items: center;
  outline: 0;
  text-decoration: none;
`;

const TabWrap = styled.div`
  width:182px;
  font-family: Roboto;
  font-size: 14px;
  margin-top: 84px;
  //display: flex;
  align-items: center;
  display: table; 
  margin-left: auto;
  margin-right: auto;

`; 
const TabWrapContainer = styled.div`
  width:100%;
  // margin-top:64px;
  margin-left: auto;
  margin-right: auto;
`; 



const Index = () => {
  //   useEffect(() => {
  //   const isLogined = window.sessionStorage.userInfo == null ? false : true;
  //   if (!isLogined) {
  //     alert("로그인이 필요합니다.");
  //     return (window.location.href = "/login");
  //   }
  // }, []);

    return(
      <div className='container'>
        <Topbar/>
        <TabWrapContainer>
          <TabWrap>
            <ButtonActive>캘린더</ButtonActive>
            <Button>통계</Button>
          </TabWrap>
        </TabWrapContainer>
        
        {/* <ToggleBtn/> */}
        <Calendar/>
      </div>
    );
}
export default Index;
