import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
//views
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import RecoverPassword from './components/RecoverPassword/RecoverPassword';
// import Notes from './components/Notes/Notes';
import { UserRegistration } from './components/UserRegistration/UserRegistration';
import Layout from './components/Loyout/Layout';
import { Sales } from './components/Sales/Sales';
import { BranchRegistration } from './components/BranchRegistration/BranchRegistration';
import { BusRegistration } from './components/Bus/BusRegistration/BusRegistration';
import { BusList } from './components/Bus/BusList/BusList';
//travels
import { TravelRegistration } from './components/Travels/TravelRegistration/TravelRegistration';
import { TravelExpenses } from './components/Travels/TravelExpenses/TravelExpenses';
//Reportes:
import { ListOfTicketsSold } from './components/Reports/ListOfTicketsSold/ListOfTicketsSold';
import { SettlementForm } from './components/Reports/SettlementForm/SettlementForm';
//probando tickets
import { Tickets1 } from './components/Sales/Tickets/Tickets1/Tickets1.jsx';
import { Tickets2 } from './components/Sales/Tickets/Tickets2/Tickets2.jsx';
import { Tickets3 } from './components/Sales/Tickets/Tickets3/Tickets3';
import { ReactToPrintComponent } from './components/Sales/Tickets/Tickets3/ReactToPrintComponent/ReactToPrintComponent.jsx';
import { ReactToPrintComponent2 } from './components/Sales/Tickets/Tickets3/ReactToPrintComponent/ReactToPrintComponent2.jsx';
//SendEmail
import { SendEmail } from './components/SendEmail/SendEmail.jsx';
import { SendEmail2 } from './components/SendEmail/SendEmail2.jsx';
import { SendEmail3 } from './components/SendEmail/SendEmail3';
//Contexts
import { ProviderListarNotas } from './contexts/ContextListarNotas';
import { ProviderBranchOffice } from './contexts/ContextBranchOffice';
import { ProviderUserData } from './contexts/ContextUserData';
import { ProviderGeneralCompanyData } from './contexts/ContextGeneralCompanyData';
import { ProviderBranchTripsMade } from './contexts/ContextBranchTripsMade';
import { ProviderCompanyBuses } from './contexts/ContextCompanyBuses';
import { ProviderAllUserData } from './contexts/ContextAllUserData';

const AppRoutes = () => {
  return (
    <>
      <ProviderBranchOffice>
        <ProviderUserData>
          <ProviderGeneralCompanyData>
            <ProviderBranchTripsMade>
              <ProviderCompanyBuses>
                <ProviderAllUserData>
                  <ProviderListarNotas>
                    <BrowserRouter>
                      <Switch>
                        <Route
                          exact
                          path="/"
                          component={() => <Redirect to="/acceso" />}
                        />
                        <Route exact path="/acceso" component={Login} />
                        <Route exact path="/tickets1" component={Tickets1} />
                        <Route exact path="/tickets2" component={Tickets2} />
                        <Route exact path="/tickets3" component={Tickets3} />
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
                        <Route
                          exact
                          path="/send-email2"
                          component={SendEmail2}
                        />
                        <Route
                          exact
                          path="/send-email3"
                          component={SendEmail3}
                        />

                        <Layout>
                          <Route exact path="/principal" component={Home} />
                          <Route
                            exact
                            path="/recuperar-contraseña"
                            component={RecoverPassword}
                          />
                          {/* <Route exact path="/notas" component={Notes} /> */}
                          {/* <Route exact path="/tickets" component={Tickets} /> */}

                          <Route
                            exact
                            path="/ventas/pasajes/"
                            component={Sales}
                          />
                          <Route
                            exact
                            path="/personal/registro-de-cargos"
                            component={UserRegistration}
                          />

                          <Route
                            exact
                            path="/buses/registro-de-buses/"
                            component={BusRegistration}
                          />

                          <Route
                            exact
                            path="/buses/lista-de-buses/"
                            component={BusList}
                          />

                          <Route
                            exact
                            path="/sucursales/registro-de-sucursales/"
                            component={BranchRegistration}
                          />

                          <Route
                            exact
                            path="/viajes/programar-viaje/"
                            component={TravelRegistration}
                          />

                          <Route
                            exact
                            path="/reportes/lista-ventas/"
                            component={ListOfTicketsSold}
                          />

                          {/* Route for Tests: */}
                          <Route
                            exact
                            path="/test-component/"
                            component={TravelExpenses}
                          />
                        </Layout>
                      </Switch>
                    </BrowserRouter>
                  </ProviderListarNotas>
                </ProviderAllUserData>
              </ProviderCompanyBuses>
            </ProviderBranchTripsMade>
          </ProviderGeneralCompanyData>
        </ProviderUserData>
      </ProviderBranchOffice>
    </>
  );
};

export default AppRoutes;
