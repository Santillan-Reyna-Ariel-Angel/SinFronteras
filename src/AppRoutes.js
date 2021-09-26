import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
//views
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import RecoverPassword from "./components/RecoverPassword/RecoverPassword";
import Notes from "./components/Notes/Notes";

//Contexts
import { ContextoUsuario, users } from "./contexts/ContextUsers";
import { ProviderListarNotas } from "./contexts/ContextListarNotas";

const AppRoutes = () => {
  return (
    <div>
      <ContextoUsuario.Provider value={users}>
        <ProviderListarNotas>
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Redirect to="/login" />}
              />
              <Route exact path="/login" component={Login} />
              <Route exact path="/home" component={Home} />
              <Route
                exact
                path="/recover-password"
                component={RecoverPassword}
              />
              <Route exact path="/notes" component={Notes} />
            </Switch>
          </BrowserRouter>
        </ProviderListarNotas>
      </ContextoUsuario.Provider>
    </div>
  );
};

export default AppRoutes;
