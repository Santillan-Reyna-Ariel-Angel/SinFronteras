import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
//views
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import RecoverPassword from './components/RecoverPassword/RecoverPassword';
// import Notes from './components/Notes/Notes';
import { UserRegistration } from './components/Users/UserRegistration/UserRegistration';
import { UserDataTable } from './components/Users/UserDataTable/UserDataTable';
import Layout from './components/Loyout/Layout';
import { Sales } from './components/Sales/Sales';
import { BranchRegistration } from './components/BranchRegistration/BranchRegistration';
import { BusRegistration } from './components/Bus/BusRegistration/BusRegistration';
import { BusList } from './components/Bus/BusList/BusList';
//travels
import { TravelRegistration } from './components/Travels/TravelRegistration/TravelRegistration';
// import { TravelExpenses } from './components/Travels/TravelExpenses/TravelExpenses';
import { RegisterDestination } from './components/Destinations/RegisterDestination';
//Reportes:
import { TicketsSoldDataTable } from './components/Reports/TicketsSoldDataTable/TicketsSoldDataTable';
import { SettlementForm } from './components/Reports/SettlementForm/SettlementForm';
import { SettlementFormsList } from './components/Reports/SettlementFormsList/SettlementFormsList';
//probando tickets
import { Tickets1 } from './components/Sales/Tickets/Tickets1/Tickets1.jsx';
import { Tickets2 } from './components/Sales/Tickets/Tickets2/Tickets2.jsx';
import { TicketsSold } from './components/Sales/Tickets/TicketsSold/TicketsSold';
import { ReactToPrintComponent } from './components/Sales/Tickets/TicketsSold/ReactToPrintComponent/ReactToPrintComponent.jsx';
import { PrintTicketsSold } from './components/Sales/Tickets/TicketsSold/PrintTicketsSold.jsx';
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
//ComponentsGenerals:
// import { DialogBasic } from './components/DialogBasic/DialogBasic';
//Components Test:

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
                        <Route
                          exact
                          path="/pasajes-vendidos"
                          component={TicketsSold} // componente en pre-produccion y ruta para pruebas visualizadas
                        />
                        <Route
                          exact
                          path="/tickets-component"
                          component={ReactToPrintComponent}
                        />
                        <Route
                          exact
                          path="/pasajes-imprimir" // o /pasajes/imprimir-pasaje o /boletos/imprimir-boleto
                          component={PrintTicketsSold} // se usa con otro componente en pre-produccion y ruta inaccesible
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
                            path="/personal/registro-de-usuarios/"
                            component={UserRegistration}
                          />

                          <Route
                            exact
                            path="/personal/lista-de-usuarios/"
                            component={UserDataTable}
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
                            path="/viajes/registrar-destinos/"
                            component={RegisterDestination}
                          />

                          <Route
                            exact
                            path="/reportes/lista-de-ventas/"
                            component={TicketsSoldDataTable}
                          />

                          <Route
                            exact
                            path="/reportes/lista-de-viajes/"
                            component={SettlementFormsList}
                          />

                          {/* Route for Tests: */}

                          <Route
                            exact
                            path="/test-component2/"
                            component={SettlementForm}
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
