import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Topbar from "../topbar";
import post from "./post";
import CreatePost from "./CreatePost";
import './postList.css';
import PostList from "./postList"

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

const Index = () => {
  return (
    <>
      <Topbar />
      <div style={{ marginTop: "64px", height: "100%" }}>
        <Container>
          <div>LeftBar 내용
            <a href="/comm/CreatePost">링크</a>
            <a href="/comm/post">링크</a>
            </div> 
          <BrowserRouter>
            <Switch>
              {/* <Route exact path={baseUrl} component={view} />
            <Route path="" component={viewOtherUser} />
            <Route path= component={edit} /> */}
              <Route exact path={baseUrl} component={PostList} />
              <Route path={baseUrl + "post"} component={post} />
              <Route path={baseUrl + "CreatePost"} component={CreatePost}/>
            </Switch>
          </BrowserRouter>
        </Container>
      </div>
    </>
  );
};

export default Index;
