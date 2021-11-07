import React, { useEffect } from "react";
import Calendar from "./Calendar";
//import styled from "styled-components";
import Topbar from "../topbar";
import "./styles.css";

const Index = () => {
  //   useEffect(() => {
  //   const isLogined = window.sessionStorage.userInfo == null ? false : true;
  //   if (!isLogined) {
  //     alert("로그인이 필요합니다.");
  //     return (window.location.href = "/login");
  //   }
  // }, []);

  return (
    <div className="container">
      <Topbar />
      <Calendar />
    </div>
  );
};
export default Index;
