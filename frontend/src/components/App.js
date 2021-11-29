import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Main from '../routes/Main';
import Auth from '../routes/Auth';
import StudyPlan from './StudyPlan/index';
import Community from './Community/index';
import Follow from './Follow/index';
import Profile from '../routes/Profile';
import DM from './DM/index';
import MakeStudyRoom from './StudyRoom/MakeStudyRoom';
import StudyRoom from './StudyRoom/StudyRoom';
// import testSR from "./room/index";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Main} exact={true} />
            <Route path="/login/" component={Auth} />
            <Route path="/profile/" component={Profile} />
            <Route path="/plan/" component={StudyPlan} />
            <Route path="/comm/" component={Community} />
            <Route path="/friend/" component={Follow} />
            <Route path="/dm" component={DM} />
            <Route path="/MakeRoom" component={MakeStudyRoom} />
            <Route
              path="/StudyRoom/:studyRoomId/:nickName/:userInfo"
              component={StudyRoom}
            />
            {/* <Route path="/testSR" component={testSR} /> */}
          </Switch>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
