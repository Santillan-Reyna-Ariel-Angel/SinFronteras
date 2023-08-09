import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
//views
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import RecoverPassword from './components/RecoverPassword/RecoverPassword';
// import Notes from './components/Notes/Notes';
import { UserRegistration } from './components/Users/UserRegistration/UserRegistration';
import { UserDataTable } from './components/Users/UserDataTable/UserDataTable';
import { Layout } from './components/Loyout/Layout';
import { Sales } from './components/Sales/Sales';
import { BranchRegistration } from './components/BranchRegistration/BranchRegistration';
import { BusRegistration } from './components/Bus/BusRegistration/BusRegistration';
import { BusList } from './components/Bus/BusList/BusList';
//travels
import { TravelRegistration } from './components/Travels/TravelRegistration/TravelRegistration';
// import { TravelExpenses } from './components/Travels/TravelExpenses/TravelExpenses';
import { RegisterDestination } from './components/Destinations/RegisterDestination';
//Reportes:
import { TicketsSoldDataTable } from './components/Reports/Tickets/TicketsSoldDataTable/TicketsSoldDataTable';
import { SettlementForm } from './components/Reports/TravelList/SettlementForm/SettlementForm';
import { SettlementFormsDataTable } from './components/Reports/TravelList/SettlementFormsDataTable/SettlementFormsDataTable';

import { TicketsSold } from './components/Reports/Tickets/TicketsSold/TicketsSold';
import { ReactToPrintComponent } from './components/Reports/Tickets/TicketsSold/ReactToPrintComponent/ReactToPrintComponent.jsx';
import { PrintTicketsSold } from './components/Reports/Tickets/TicketsSold/PrintTicketsSold.jsx';
//SendEmail
import { SendEmail } from './components/SendEmail/SendEmail.jsx';
import { SendEmail2 } from './components/SendEmail/SendEmail2.jsx';
import { SendEmail3 } from './components/SendEmail/SendEmail3';
//Contexts

import { ProviderAllBranchOffices } from './contexts/ContextAllBranchOffices';
import { ProviderBranchOffice } from './contexts/ContextBranchOffice';
import { ProviderUserData } from './contexts/ContextUserData';
import { ProviderGeneralCompanyData } from './contexts/ContextGeneralCompanyData';
import { ProviderBranchTripsMade } from './contexts/ContextBranchTripsMade';
import { ProviderCompanyBuses } from './contexts/ContextCompanyBuses';
import { ProviderAllUserData } from './contexts/ContextAllUserData';
import { ProviderAllUserDataForLogin } from './contexts/ContextAllUserDataForLogin';
//ComponentsGenerals:
// import { DialogBasic } from './components/DialogBasic/DialogBasic';
//Components Test:
//probando tickets
import { Tickets1 } from './components/ComponentTest/EmptyPage/Tickets/Tickets1/Tickets1.jsx';
import { Tickets2 } from './components/ComponentTest/EmptyPage/Tickets/Tickets2/Tickets2.jsx';
//probando ChangeBranchConnection:
import { ChangeBranchConnection } from './components/ChangeBranchConnection/ChangeBranchConnection.jsx';

// others test:
import { UserProfile } from './components/Users/UserProfile/UserProfile.jsx';
import { ChangePassword } from './components/Users/ChangePassword/ChangePassword';
import { PdfGenerate } from './components/Reports/PdfGenerate/PdfGenerate';

const AppRoutes = () => {
  return (
    <>
      <ProviderAllBranchOffices>
        <ProviderBranchOffice>
          <ProviderUserData>
            <ProviderGeneralCompanyData>
              <ProviderBranchTripsMade>
                <ProviderCompanyBuses>
                  <ProviderAllUserData>
                    <ProviderAllUserDataForLogin>
                      <BrowserRouter>
                        <Switch>
                          <Route
                            exact
                            path="/"
                            component={() => <Redirect to="/acceso" />}
                          />
                          <Route exact path="/acceso" component={Login} />
                          <Route
                            exact
                            path="/conectar-sucursal"
                            component={ChangeBranchConnection}
                          />

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
                          <Route
                            exact
                            path="/send-email"
                            component={SendEmail}
                          />
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

                          {/* COMPONENTES DE PRUEBA SIN MENU NI CABECERA: */}
                          <Route exact path="/tickets1" component={Tickets1} />
                          <Route exact path="/tickets2" component={Tickets2} />

                          {/* Layout */}
                          <Layout>
                            <Route exact path="/principal" component={Home} />
                            <Route
                              exact
                              path="/recuperar-contrasenia"
                              component={RecoverPassword}
                            />

                            {/* <Route exact path="/tickets" component={Tickets} /> */}

                            <Route
                              exact
                              path="/perfil/mi-perfil/"
                              component={UserProfile}
                            />

                            <Route
                              exact
                              path="/perfil/cambiar-contrasenia"
                              component={ChangePassword}
                            />

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
                              component={SettlementFormsDataTable}
                            />

                            {/* Route for Tests: */}

                            <Route
                              exact
                              path="/test-component2/"
                              component={SettlementForm}
                            />

                            <Route
                              exact
                              path="/test-component4/"
                              component={PdfGenerate}
                            />
                          </Layout>
                        </Switch>
                      </BrowserRouter>
                    </ProviderAllUserDataForLogin>
                  </ProviderAllUserData>
                </ProviderCompanyBuses>
              </ProviderBranchTripsMade>
            </ProviderGeneralCompanyData>
          </ProviderUserData>
        </ProviderBranchOffice>
      </ProviderAllBranchOffices>
    </>
  );
};

export default AppRoutes;
