import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../components/Login/Login';
import Join from '../components/Login/Join';
import FindPassword from '../components/Login/FindPassword';
import Topbar from '../components/Main/Topbar';

const baseUrl = '/login/';

const Auth = () => {
  return (
    <>
      <Topbar />
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path={baseUrl} component={Login} />
            <Route path={baseUrl + 'join'} component={Join} />
            <Route path={baseUrl + 'password'} component={FindPassword} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
};

export default Auth;
