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
} from './Tickets2Styles';

const Tickets2 = ({ data }) => {
  const dataDefault = [
    {
      companyName: 'Sin Fronteras',
      ticketNumber: '123456789',
      issuingUser: 'Santillan Reyna Ariel Angel', //usuario emisor
      companyPhone: '46410523',
      origin: 'Sucre',
      destiny: 'Santa Cruz',
      travelDate: '30/5/2022',
      DepartureTime: '20:30',
      lane: '0', //carril
      passengerName: 'Santillan Quispe Javier Angel',
      identificationNumber: '7896541',
      seat: '1',
      typeOfSeat: 'Semi-cama',
      price: '30',
      legend: 'Gracias por su compra, le deseamos un buen viaje.',
    },
    {
      companyName: 'Sin Fronteras',
      ticketNumber: '123456789',
      issuingUser: 'Santillan Reyna Ariel Angel', //usuario emisor
      companyPhone: '46410523',
      origin: 'Sucre',
      destiny: 'Santa Cruz',
      travelDate: '30/5/2022',
      DepartureTime: '20:30',
      lane: '0', //carril
      passengerName: 'Santillan Quispe Javier Angel',
      identificationNumber: '7896541',
      seat: '2',
      typeOfSeat: 'Semi-cama',
      price: '30',
      legend: 'Gracias por su compra, le deseamos un buen viaje.',
    },
    {
      companyName: 'Sin Fronteras',
      ticketNumber: '123456789',
      issuingUser: 'Santillan Reyna Ariel Angel', //usuario emisor
      companyPhone: '46410523',
      origin: 'Sucre',
      destiny: 'Santa Cruz',
      travelDate: '30/5/2022',
      DepartureTime: '20:30',
      lane: '0', //carril
      passengerName: 'Santillan Quispe Javier Angel',
      identificationNumber: '7896541',
      seat: '3',
      typeOfSeat: 'Semi-cama',
      price: '30',
      legend: 'Gracias por su compra, le deseamos un buen viaje.',
    },
    {
      companyName: 'Sin Fronteras',
      ticketNumber: '123456789',
      issuingUser: 'Santillan Reyna Ariel Angel', //usuario emisor
      companyPhone: '46410523',
      origin: 'Sucre',
      destiny: 'Santa Cruz',
      travelDate: '30/5/2022',
      DepartureTime: '20:30',
      lane: '0', //carril
      passengerName: 'Santillan Quispe Javier Angel',
      identificationNumber: '7896541',
      seat: '4',
      typeOfSeat: 'Semi-cama',
      price: '30',
      legend: 'Gracias por su compra, le deseamos un buen viaje.',
    },
    {
      companyName: 'Sin Fronteras',
      ticketNumber: '123456789',
      issuingUser: 'Santillan Reyna Ariel Angel', //usuario emisor
      companyPhone: '46410523',
      origin: 'Sucre',
      destiny: 'Santa Cruz',
      travelDate: '30/5/2022',
      DepartureTime: '20:30',
      lane: '0', //carril
      passengerName: 'Santillan Quispe Javier Angel',
      identificationNumber: '7896541',
      seat: '5',
      typeOfSeat: 'Semi-cama',
      price: '30',
      legend: 'Gracias por su compra, le deseamos un buen viaje.',
    },
    {
      companyName: 'Sin Fronteras',
      ticketNumber: '123456789',
      issuingUser: 'Santillan Reyna Ariel Angel', //usuario emisor
      companyPhone: '46410523',
      origin: 'Sucre',
      destiny: 'Santa Cruz',
      travelDate: '30/5/2022',
      DepartureTime: '20:30',
      lane: '0', //carril
      passengerName: 'Santillan Quispe Javier Angel',
      identificationNumber: '7896541',
      seat: '6',
      typeOfSeat: 'Semi-cama',
      price: '30',
      legend: 'Gracias por su compra, le deseamos un buen viaje.',
    },
    {
      companyName: 'Sin Fronteras',
      ticketNumber: '123456789',
      issuingUser: 'Santillan Reyna Ariel Angel', //usuario emisor
      companyPhone: '46410523',
      origin: 'Sucre',
      destiny: 'Santa Cruz',
      travelDate: '30/5/2022',
      DepartureTime: '20:30',
      lane: '0', //carril
      passengerName: 'Santillan Quispe Javier Angel',
      identificationNumber: '7896541',
      seat: '7',
      typeOfSeat: 'Semi-cama',
      price: '30',
      legend: 'Gracias por su compra, le deseamos un buen viaje.',
    },
    {
      companyName: 'Sin Fronteras',
      ticketNumber: '123456789',
      issuingUser: 'Santillan Reyna Ariel Angel', //usuario emisor
      companyPhone: '46410523',
      origin: 'Sucre',
      destiny: 'Santa Cruz',
      travelDate: '30/5/2022',
      DepartureTime: '20:30',
      lane: '0', //carril
      passengerName: 'Santillan Quispe Javier Angel',
      identificationNumber: '7896541',
      seat: '8',
      typeOfSeat: 'Semi-cama',
      price: '30',
      legend: 'Gracias por su compra, le deseamos un buen viaje.',
    },
    {
      companyName: 'Sin Fronteras',
      ticketNumber: '123456789',
      issuingUser: 'Santillan Reyna Ariel Angel', //usuario emisor
      companyPhone: '46410523',
      origin: 'Sucre',
      destiny: 'Santa Cruz',
      travelDate: '30/5/2022',
      DepartureTime: '20:30',
      lane: '0', //carril
      passengerName: 'Santillan Quispe Javier Angel',
      identificationNumber: '7896541',
      seat: '9',
      typeOfSeat: 'Semi-cama',
      price: '30',
      legend: 'Gracias por su compra, le deseamos un buen viaje.',
    },
    {
      companyName: 'Sin Fronteras',
      ticketNumber: '123456789',
      issuingUser: 'Santillan Reyna Ariel Angel', //usuario emisor
      companyPhone: '46410523',
      origin: 'Sucre',
      destiny: 'Santa Cruz',
      travelDate: '30/5/2022',
      DepartureTime: '20:30',
      lane: '0', //carril
      passengerName: 'Clara Reyna Caba',
      identificationNumber: '7896541',
      seat: '10',
      typeOfSeat: 'Semi-cama',
      price: '30',
      legend: 'Gracias por su compra, le deseamos un buen viaje.',
    },
  ];
  return (
    <>
      {dataDefault
        ? dataDefault.map((data) => (
            <>
              <Background>
                <BodyContainer>
                  <LogoContainer>
                    <LogoPng />
                    <CompanyName>
                      <span>{data.companyName}</span>
                    </CompanyName>
                  </LogoContainer>
                  <GeneralInformation>
                    <p>
                      <span>Ticket: </span>
                      {data.ticketNumber}
                    </p>
                    <p>
                      <span>Emitido por: </span>
                      {data.issuingUser}
                    </p>
                    <p>
                      <span>Teléfono: </span>
                      {data.companyPhone}
                    </p>
                  </GeneralInformation>
                  <Route>
                    <span>
                      {data.origin} - {data.destiny}
                    </span>
                  </Route>
                  <PassengerInformation>
                    <p>
                      <span>Fecha: </span>
                      {data.travelDate}
                    </p>
                    <p>
                      <span>Hora de salida: </span>
                      {data.DepartureTime}
                    </p>
                    <p>
                      <span>Carril: </span>
                      {data.lane}
                    </p>
                    <p>
                      <span>Pasajero: </span>
                      {data.passengerName}
                    </p>
                    <p>
                      <span>Ci: </span>
                      {data.identificationNumber}
                    </p>
                  </PassengerInformation>
                  <BusInformation>
                    <p>
                      <span>Asiento: </span>
                      <p className="seat">{data.seat}</p>
                      <p className="typeSeat">{data.typeOfSeat}</p>
                    </p>
                    <p className="price">
                      <span>Precio: </span>
                      {data.price} Bs
                    </p>
                  </BusInformation>
                  <Legend>
                    <p>{data.legend}</p>
                  </Legend>
                </BodyContainer>
              </Background>
            </>
          ))
        : null}
    </>
  );
};

export { Tickets2 };
