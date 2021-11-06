import React, { useEffect } from "react";
import Topbar from "../main/topbar";

function Index() {
  useEffect(() => {
    const isLogined = window.sessionStorage.userInfo == null ? false : true;
    if (!isLogined) {
      alert("로그인이 필요합니다.");
      return (window.location.href = "/login");
    }
  }, []);
  return (
    <>
      <Topbar />
      <div style={{ position: "relative", marginTop: "64px" }}>
        <h1>팔로우 페이지</h1>
      </div>
    </>
  );
}

export default Index;
