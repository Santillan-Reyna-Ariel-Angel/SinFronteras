import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
//views
import LoginMUI from "./views/LoginMUI/LoginMUI";
import Home from "./views/Home/Home";
import RecoverPassword from "./views/RecoverPassword/RecoverPassword";
import Notes from "./views/Notes/Notes";

//Contexts
//import { ProvaiderContextoUsusario } from "./Context/ContextUsers";
// import UsersProvaider from "./Context/UsersProvaider";
const App = () => {
  return (
    <div>
      {/* <ProvaiderContextoUsusario> */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/login" />} />
          <Route exact path="/login" component={LoginMUI} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/recover-password" component={RecoverPassword} />
          <Route exact path="/notes" component={Notes} />
        </Switch>
      </BrowserRouter>
      {/* </ProvaiderContextoUsusario> */}
    </div>
  );
};

export default App;
