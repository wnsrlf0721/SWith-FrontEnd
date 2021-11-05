import React, { useEffect } from "react";
import Topbar from "../main/topbar";

const Index = () => {
  const isLogined = window.sessionStorage.userInfo == null ? false : true;
  useEffect(() => {
    if (!isLogined) {
      alert("로그인이 필요합니다.");
      return (window.location.href = "/login");
    }
  }, []);
  return (
    <>
      <Topbar />
      <div style={{ position: "relative", marginTop: "64px" }}>
        <h1>개인 프로필 페이지</h1>
      </div>
    </>
  );
};

export default Index;
