import { BrowserRouter, Switch, Route } from "react-router-dom";

import main from "./main/index";
import room from "./room/index";
import auth from "./login/index";
import plan from "./plan/index";
import comm from "./comm/index";
import friend from "./friend/index";
import profile from "./profile/index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={main} exact={true} />
          <Route path="/login/" component={auth} />
          <Route path="/profile/" component={profile} />
          <Route path="/mk_room/" component={room} />
          <Route path="/plan/" component={plan} />
          <Route path="/comm/" component={comm} />
          <Route path="/friend/" component={friend} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
