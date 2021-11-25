import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Topbar from "../topbar";
import post from "./post";

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
          <div>글 제목</div>
          <BrowserRouter>
            <Switch>
              {/* <Route exact path={baseUrl} component={view} />
            <Route path="" component={viewOtherUser} />
            <Route path= component={edit} /> */}
              <Route path={baseUrl + "post"} component={post} />
            </Switch>
          </BrowserRouter>
        </Container>
      </div>
    </>
  );
};

export default Index;
