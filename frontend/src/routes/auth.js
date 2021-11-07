import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import login from "../components/login/login";
import join from "../components/login/join";
import logo from "../images/logo.png";

const Header = styled.header`
  height: 64px;
  margin: 0;
  h1 {
    padding: 20px;
    line-height: 1;
    margin: 0;
  }
`;

const baseUrl = "/login/";

function index() {
  return (
    <>
      <Header>
        <h1>
          <a href="/">
            <img
              style={{ maxHeight: "50px", height: "40px", width: "90px" }}
              src={logo}
              alt="logo"
            />
          </a>
        </h1>
      </Header>
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path={baseUrl} component={login} />
            <Route path={baseUrl + "join"} component={join} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}

export default index;
