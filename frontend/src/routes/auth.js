import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import login from "../components/login/login";
import join from "../components/login/join";
import Topbar from "../components/topbar";

const baseUrl = "/login/";

function index() {
  return (
    <>
      <Topbar />
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
