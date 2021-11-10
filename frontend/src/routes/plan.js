import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Topbar from "../components/topbar";
import styled from "styled-components";
import Calendar from "../components/plan/Calendar";
import Statistics from "../components/plan/Statistics";

const Container = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  margin-top: 80px;
`;
const Button = styled.div`
  display: flex;
  position: relative;
  margin: 0 auto;
`;

const A = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 0 10px 0 0;
  padding: 9px 20px;
  border-radius: 17px;
  border: solid 1px #e4e6eb;
  background-color: #fafbfc;

  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  color: #363740;
  text-decoration: none;
`;

const baseUrl = "/plan";

const Index = () => {
  return (
    <>
      <Topbar />
      <div>
        <Container>
          <Button>
            <A href={baseUrl}>캘린더</A>
            <A href={baseUrl + "/statistics"}>통계</A>
          </Button>
        </Container>
        <BrowserRouter>
          <Switch>
            <Route path={baseUrl} component={Calendar} exact={true} />
            <Route path={baseUrl + "statistics"} component={Statistics} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
};

export default Index;
