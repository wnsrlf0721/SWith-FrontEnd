import Topbar from '../components/Main/Topbar';

import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import View from '../components/Profile/View';
import ViewOtherUser from '../components/Profile/ViewOtherUser';
import Edit from '../components/Profile/Edit';
import Plan from '../components/StudyPlan/index';

const baseUrl = '/profile/';

const Profile = () => {
  useEffect(() => {
    const isLogined = window.localStorage.userInfo == null ? false : true;
    if (!isLogined) {
      alert('로그인이 필요합니다.');
      return (window.location.href = '/login');
    }
  }, []);
  return (
    <>
      <Topbar />
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path={baseUrl} component={View} />
            <Route path="/profile/:userId/other" component={ViewOtherUser} />
            <Route path={baseUrl + 'edit'} component={Edit} />
            <Route path="/plan" component={Plan} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
};

export default Profile;
