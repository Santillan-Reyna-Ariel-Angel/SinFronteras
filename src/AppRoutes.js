import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
//views
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import RecoverPassword from "./components/RecoverPassword/RecoverPassword";
import Notes from "./components/Notes/Notes";
import UserRegistration from "./components/UserRegistration/UserRegistration";
import Layout from "./components/Loyout/Layout";
import Sales from "./components/Sales/Sales";
//Contexts
import { ContextoUsuario, users } from "./contexts/ContextUsers";
import { ProviderListarNotas } from "./contexts/ContextListarNotas";
import { ProviderBranchOffice } from "./contexts/ContextBranchOffice";

const AppRoutes = () => {
  return (
    <div>
      <ContextoUsuario.Provider value={users}>
        <ProviderBranchOffice>
          <ProviderListarNotas>
            <BrowserRouter>
              <Switch>
                <Route
                  exact
                  path="/"
                  component={() => <Redirect to="/acceso" />}
                />
                <Route exact path="/acceso" component={Login} />
                <Layout>
                  <Route exact path="/principal" component={Home} />
                  <Route
                    exact
                    path="/recuperar-contraseña"
                    component={RecoverPassword}
                  />
                  <Route exact path="/notas" component={Notes} />
                  <Route
                    exact
                    path="/personal/registro-de-cargos"
                    component={UserRegistration}
                  />
                  <Route exact path="/ventas/pasajes/" component={Sales} />
                </Layout>
              </Switch>
            </BrowserRouter>
          </ProviderListarNotas>
        </ProviderBranchOffice>
      </ContextoUsuario.Provider>
    </div>
  );
};

export default AppRoutes;
