import React from "react";
import Topbar from "../topbar";
import Post from "./Post";

function index() {
  return (
    <>
      <Topbar />
      <div style={{ position: "relative", marginTop: "64px" }}>
        <h1>커뮤니티 페이지</h1>
      </div>
      <Post/>
    </>
  );
}

export default index;
