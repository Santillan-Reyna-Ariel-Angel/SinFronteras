import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
//views
import LoginV3 from "./views/LoginV3/LoginV3";
import { Login } from "./views/Login/index";
import LoginMUI from "./views/LoginMUI/LoginMUI";
import Home from "./views/Home/Home";
import RecoverPassword from "./views/RecoverPassword/RecoverPassword";
import Notes from "./views/Notes/Notes";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/login" />} />
          {/* <Route exact path="/login" component={Login} />{" "} */}
          {/* <Route exact path="/login" component={LoginV3} /> */}
          <Route exact path="/login" component={LoginMUI} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/recover-password" component={RecoverPassword} />
          <Route exact path="/notes" component={Notes} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
