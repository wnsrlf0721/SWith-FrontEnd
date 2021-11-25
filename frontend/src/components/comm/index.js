import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Topbar from "../topbar";
import post from "./post";
import PostList from "./postList";
import search_icon from "../../images/search_gray.png";
import writing_icon from "../../images/writing_icon.png";

const baseUrl = "/comm/";
const Container = styled.div`
  margin-top: 70px;
  display: grid;
  width: 70%;
  height: 100%;
  margin: 0 auto;
  border: solid 1px #e4e6eb;
  grid-template-columns: 1fr 3fr;
`;
const List = styled.div`
  width: 100%;
`;
const Box = styled.div`
  margin: 30px 0;
  border: 1px solid #e4e6eb;
  padding: 10px 20px;
`;
const Index = () => {
  return (
    <>
      <Topbar />
      <div style={{ marginTop: "64px", height: "100%" }}>
        <Container>
          <div>
            <List>
              <Box>
                <form onSubmit={(e) => onsearch(e)}>
                  <button
                    style={{
                      backgroundColor: "white",
                      border: "0px",
                      padding: "0 6px 0 0 ",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{
                        height: "18px",
                        width: "18px",
                        verticalAlign: "middle",
                      }}
                      src={search_icon}
                      alt="search_icon"
                    />
                  </button>
                  <input
                    style={{ border: "0px" }}
                    type="text"
                    placeholder="게시글 검색"
                  ></input>
                </form>
              </Box>
              <Box>
                <a href="/comm/post" style={{ textDecoration: "none" }}>
                  <img
                    style={{
                      height: "18px",
                      width: "18px",
                      verticalAlign: "middle",
                      padding: "0 6px 0 0 ",
                    }}
                    src={writing_icon}
                    alt="writing_icon"
                  />
                  게시글 작성하기
                </a>
              </Box>
              <Box>
                게시판 목록
                <ul style={{ listStyleType: "none" }}>
                  <li>스터디 모집</li>
                  <li>스터디 참여</li>
                  <li>자유게시판</li>
                  <li>정보 공유</li>
                </ul>
              </Box>
            </List>
          </div>
          <BrowserRouter>
            <Switch>
              {/* <Route exact path={baseUrl} component={view} />
            <Route path="" component={viewOtherUser} />
            <Route path= component={edit} /> */}
              <Route exact path={baseUrl} component={PostList} />
              <Route path={baseUrl + "post"} component={post} />
            </Switch>
          </BrowserRouter>
        </Container>
      </div>
    </>
  );
};

export default Index;
