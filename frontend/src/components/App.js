import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import main from "./main/index";
import comm from "./comm/index";
import room from "./room/index";
import plan from "./plan/index";
import login from "./login/index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/" component={main} exact={true} />
        <Route path="/login" component={login} />
        <Route path="/comm" component={comm} />
        <Route path="/room" component={room} />
        <Route path="/plan" component={plan} />
      </BrowserRouter>
    </>
  );
}

export default App;
