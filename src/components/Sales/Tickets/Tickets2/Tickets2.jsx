import React, { useState } from 'react';
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
import Button from '@mui/material/Button';
//Para imprimir
import { PDFViewer } from '@react-pdf/renderer';
import { TicketPdf } from './TicketPdf/TicketPdf.jsx';

//Importando cantidad de pasajeros:
import { dataForPassengerTickets } from './../datos';

const Tickets2 = ({ data }) => {
  const dataDefault = dataForPassengerTickets ? dataForPassengerTickets : [];

  // Probaremos react-pdf/renderer
  const [pdfOpen, setPdfOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh' }}>
      {dataDefault
        ? dataDefault.map((data, index) => (
            <div key={index}>
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
            </div>
          ))
        : null}

      <Button
        variant="contained"
        color={!pdfOpen ? 'success' : 'error'}
        onClick={() => setPdfOpen(!pdfOpen)}
      >
        {!pdfOpen ? 'Imprimir Ahora' : 'Cerrar pdf'}
      </Button>

      {dataDefault ? (
        <>
          {pdfOpen ? (
            <PDFViewer style={{ width: '100%', height: '90vh' }}>
              <TicketPdf dataDefault={dataDefault} />
            </PDFViewer>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export { Tickets2 };
