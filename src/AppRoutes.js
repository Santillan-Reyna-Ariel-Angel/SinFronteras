import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
//views
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import RecoverPassword from './components/RecoverPassword/RecoverPassword';
import Notes from './components/Notes/Notes';
import UserRegistration from './components/UserRegistration/UserRegistration';
import Layout from './components/Loyout/Layout';
import Sales from './components/Sales/Sales';
//probando tickets
import { Tickets } from './components/Sales/Tickets/Tickets.jsx';
import { Tickets2 } from './components/Sales/Tickets2/Tickets2.jsx';
import { ReactToPrintComponent } from './components/Sales/Tickets3/ReactToPrintComponent/ReactToPrintComponent.jsx';
import { ReactToPrintComponent2 } from './components/Sales/Tickets3/ReactToPrintComponent/ReactToPrintComponent2.jsx';
//SendEmail
import { SendEmail } from './components/SendEmail/SendEmail.jsx';
import { SendEmail2 } from './components/SendEmail/SendEmail2.jsx';
import { SendEmail3 } from './components/SendEmail/SendEmail3.jsx';
//Contexts
import { ProviderListarNotas } from './contexts/ContextListarNotas';
import { ProviderBranchOffice } from './contexts/ContextBranchOffice';
import { ProviderUserData } from './contexts/ContextUserData';
import { ProviderGeneralCompanyData } from './contexts/ContextGeneralCompanyData';

const AppRoutes = () => {
  return (
    <>
      <ProviderBranchOffice>
        <ProviderUserData>
          <ProviderGeneralCompanyData>
            <ProviderListarNotas>
              <BrowserRouter>
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={() => <Redirect to="/acceso" />}
                  />
                  <Route exact path="/acceso" component={Login} />
                  <Route exact path="/tickets" component={Tickets} />
                  <Route exact path="/tickets2" component={Tickets2} />
                  <Route
                    exact
                    path="/tickets-component"
                    component={ReactToPrintComponent}
                  />
                  <Route
                    exact
                    path="/tickets-component2"
                    component={ReactToPrintComponent2}
                  />
                  <Route exact path="/send-email" component={SendEmail} />
                  <Route exact path="/send-email2" component={SendEmail2} />
                  <Route exact path="/send-email3" component={SendEmail3} />

                  <Layout>
                    <Route exact path="/principal" component={Home} />
                    <Route
                      exact
                      path="/recuperar-contraseña"
                      component={RecoverPassword}
                    />
                    <Route exact path="/notas" component={Notes} />
                    {/* <Route exact path="/tickets" component={Tickets} /> */}
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
          </ProviderGeneralCompanyData>
        </ProviderUserData>
      </ProviderBranchOffice>
    </>
  );
};

export default AppRoutes;
