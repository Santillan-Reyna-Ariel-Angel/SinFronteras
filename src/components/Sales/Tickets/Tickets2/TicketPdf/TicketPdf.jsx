import React from 'react';
import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import Logo from './../../../../../sources/img/LogoSF2.png';
const TicketPdf = ({ dataDefault }) => {
  return (
    <Document title="boletos">
      <Page size="A4">
        <View>
          {dataDefault.map((data, index) => (
            // <View key={index}>
            // Background:
            <View
              style={{
                display: 'grid',
                left: '0',
                top: '0',
                justifyContent: 'center', //centrea los elementos
                /* align-content: center; //junta los elementos vertical */
                /* grid-template-columns: auto; */
                padding: '5px 0px', // o margin: 5px 0px;
              }}
            >
              {/* BodyContainer: */}
              <View
                style={{
                  display: 'grid',
                  // backgroundColor: '#00bdb2',
                  gridTemplateColumns: '170px 170px',
                  gridTemplateRows: 'auto',
                  gridRowGap: '10px',
                  gridColumnGap: '10px',
                  padding: '10px 15px',
                  //sombreado:
                  border: '4px solid #051e34', //contorno
                  borderRadius: '0px',
                  backdropFilter: 'blur(18px)',
                  boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.7)',
                  gridTemplateAreas: `'LogoContainer GeneralInformation' 'Route Route' 'PassengerInformation BusInformation' 'Legend Legend'`,
                  /* overflow: hidden; */
                }}
              >
                {/* LogoContainer: */}
                <View
                  style={{
                    display: 'grid',
                    gridArea: 'LogoContainer',
                    gridTemplateColumns: 'auto',
                    gridTemplateRows: '1fr',
                    gridTemplateAreas: `'LogoPng' 'CompanyName'`,
                    gridRowGap: '0px',
                  }}
                >
                  {/* LogoPng: */}
                  {/* 1ra  alternativa */}
                  {/* <View
                    style={{
                      gridArea: 'LogoPng',
                      height: '100px',
                      background: `url(${Logo})`,
                      backgroundPosition: 'center',
                      objectFit: 'cover',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      alt: 'Logo.png',
                    }}
                  /> */}
                  {/* 2da alternativa */}
                  <Image
                    src={Logo}
                    alt="Logo.png"
                    style={{
                      gridArea: 'LogoPng',
                      height: '100px',
                      // background: `url(${Logo})`,
                      backgroundPosition: 'center',
                      objectFit: 'cover',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />

                  {/* CompanyName: */}
                  <View
                    style={{
                      gridArea: 'CompanyName',
                      textAlign: 'center',
                      fontSize: 'large',
                      fontWeight: 'bold',
                    }}
                  >
                    <Text>{data.companyName}</Text>
                  </View>
                </View>
                {/* GeneralInformation: */}
                <View
                  style={{
                    gridArea: 'GeneralInformation',
                    // p {
                    //     margin: "0px",
                    //   }
                    //   span {
                    //     fontWeight: "bold",
                    //   }
                  }}
                >
                  <Text style={{ margin: '0px' }}>
                    <Text style={{ fontWeight: 'bold' }}>Sucursal: </Text>
                    {data.branchNumber}
                  </Text>
                  <Text style={{ margin: '0px' }}>
                    <Text style={{ fontWeight: 'bold' }}>Ticket: </Text>
                    {data.ticketNumber}
                  </Text>
                  <Text style={{ margin: '0px' }}>
                    <Text style={{ fontWeight: 'bold' }}>Emitido por: </Text>
                    {data.issuingUser}
                  </Text>
                  <Text style={{ margin: '0px' }}>
                    <Text style={{ fontWeight: 'bold' }}>Teléfono: </Text>
                    {data.companyPhone}
                  </Text>
                </View>
                {/* Route: */}
                <View
                  style={{
                    gridArea: 'Route',
                    textAlign: 'center',
                    fontSize: 'x-large',
                    fontWeight: 'bold',
                  }}
                >
                  <Text>
                    {data.origin} - {data.destiny}
                  </Text>
                </View>
                {/* pasangerInformation: */}
                <View
                  style={{
                    gridArea: 'PassengerInformation',
                    // p {
                    //   margin: 0px;
                    // }
                    // span {
                    //   font-weight: bold;
                    // }
                  }}
                >
                  <Text style={{ margin: '0px' }}>
                    <Text style={{ fontWeight: 'bold' }}>Fecha: </Text>
                    {data.travelDate}
                  </Text>
                  <Text style={{ margin: '0px' }}>
                    <Text style={{ fontWeight: 'bold' }}>Hora de salida: </Text>
                    {data.departureTime}
                  </Text>
                  <Text style={{ margin: '0px' }}>
                    <Text style={{ fontWeight: 'bold' }}>Carril: </Text>
                    {data.lane}
                  </Text>
                  <Text style={{ margin: '0px' }}>
                    <Text style={{ fontWeight: 'bold' }}>Pasajero: </Text>
                    {data.passengerFullName}
                  </Text>
                  <Text style={{ margin: '0px' }}>
                    <Text style={{ fontWeight: 'bold' }}>Ci: </Text>
                    {data.identificationNumber}
                  </Text>
                </View>
                {/* BusInformation: */}
                <View
                  style={{
                    gridArea: 'BusInformation',
                    // p {
                    //   margin: 0px;
                    // }
                    // span {
                    //   font-weight: bold;
                    // }
                    // .seat {
                    //   font-size: xx-large;
                    //   font-weight: bold;
                    //   text-align: center;
                    // }
                    // .typeSeat {
                    //   text-align: center;
                    // }
                    // .price {
                    //   margin-top: 17px;
                    // }
                  }}
                >
                  <Text style={{ margin: '0px' }}>
                    <Text style={{ fontWeight: 'bold' }}>Asiento: </Text>
                    <Text
                      style={{
                        fontSize: 'xx-large',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      {data.seatId}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                      }}
                    >
                      {data.typeOfSeat}
                    </Text>
                  </Text>
                  <Text style={{ marginTop: '17px' }}>
                    <Text style={{ fontWeight: 'bold' }}>Precio: </Text>
                    {data.seatPrice} Bs
                  </Text>
                </View>
                {/* Legend: */}
                <View
                  style={{
                    gridArea: 'Legend',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    // p {
                    //   margin: 0px;
                    // }
                  }}
                >
                  <Text style={{ margin: '0px' }}>{data.legend}</Text>
                </View>
              </View>
            </View>
            // </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export { TicketPdf };
