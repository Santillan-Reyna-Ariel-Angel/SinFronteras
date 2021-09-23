import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
//views
import LoginMUI from "./components/LoginMUI/LoginMUI";
import Home from "./components/Home/Home";
import RecoverPassword from "./components/RecoverPassword/RecoverPassword";
import Notes from "./components/Notes/Notes";

//Contexts
import { ContextoUsuario, users } from "./contexts/ContextUsers";
const App = () => {
  return (
    <div>
      <ContextoUsuario.Provider value={users}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={() => <Redirect to="/login" />} />
            <Route exact path="/login" component={LoginMUI} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/recover-password" component={RecoverPassword} />
            <Route exact path="/notes" component={Notes} />
          </Switch>
        </BrowserRouter>
      </ContextoUsuario.Provider>
    </div>
  );
};

export default App;
