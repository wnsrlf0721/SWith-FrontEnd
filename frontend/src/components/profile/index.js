import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Topbar from "../main/topbar";
import view from "./route/view";
import edit from "./route/edit";
import plan from "../plan/index";

const baseUrl = "/profile/";

const Index = () => {
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
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path={baseUrl} component={view} />
            <Route path={baseUrl + "edit"} component={edit} />
            <Route path="/plan" component={plan} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
};

export default Index;
