import React from 'react';
import {
  Background,
  BodyContainer,
  LogoContainer,
  GeneralInformation,
  Route,
  PassengerInformation,
  BusInformation,
  LogoPng,
  CompanyName,
  Legend,
} from './TicketsStyles';

const Tickets = () => {
  return (
    <>
      <Background>
        <BodyContainer>
          <LogoContainer>
            <LogoPng />
            <CompanyName>
              <span>Sin Fronteras</span>
            </CompanyName>
          </LogoContainer>
          <GeneralInformation>
            <p>
              <span>Ticket: </span>1063891
            </p>
            <p>
              <span>Emitido por: </span>Santillan Reyna Ariel Angel
            </p>
            <p>
              <span>Telefono: </span>4645698
            </p>
          </GeneralInformation>
          <Route>
            <span>Sucre-SantaCruz</span>
          </Route>
          <PassengerInformation>
            <p>
              <span>Fecha: </span>28/05/2022
            </p>
            <p>
              <span>Hora de salida: </span>19:30 hrs
            </p>
            <p>
              <span>Carril: </span>0
            </p>
            <p>
              <span>Pasajero: </span>Santillan Reyna Cristian Andres
            </p>
            <p>
              <span>Ci: </span>7485963
            </p>
          </PassengerInformation>
          <BusInformation>
            <p>
              <span>Asiento: </span>
              <p className="seat">25</p>
              <p className="typeSeat">Semi-cama</p>
            </p>
            <p className="price">
              <span>Precio: </span>30Bs
            </p>
          </BusInformation>
          <Legend>
            <p>Gracias por su preferencia</p>
          </Legend>
        </BodyContainer>
      </Background>
    </>
  );
};

export { Tickets };
