import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Main from '../routes/Main';
import Auth from '../routes/Auth';
import StudyPlan from './StudyPlan/index';
import Community from './Community/index';
import Profile from '../routes/Profile';
import MakeStudyRoom from './StudyRoom/MakeStudyRoom';
import StudyRoom from './StudyRoom/StudyRoom';
import StudyRoomBeforePage from './StudyRoom/StudyRoomBeforePage';

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Main} exact={true} />
            <Route path="/login/" component={Auth} />
            <Route path="/profile/" component={Profile} />
            <Route path="/plan/:userId" component={StudyPlan} />
            <Route path="/comm/" component={Community} />
            <Route path="/MakeRoom" component={MakeStudyRoom} />
            <Route
              path="/StudyRoom/:studyRoomId/:nickName/:userInfo"
              component={StudyRoomBeforePage}
            />
            <Route
              path="/StudyRoomJoin/:studyRoomId/:nickName/:userInfo"
              component={StudyRoom}
            />
          </Switch>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
