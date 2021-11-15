import React, { useEffect } from "react";

function Index() {
  useEffect(() => {
    const isLogined = window.sessionStorage.userInfo == null ? false : true;
    if (!isLogined) {
      alert("로그인이 필요합니다.");
      return (window.location.href = "/login");
    }
  }, []);
  return <h1>스터디룸 페이지</h1>;
}

export default Index;
