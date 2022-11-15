import React from 'react';
// MUI:
//Styles:
import {
  Background,
  // BodyContainer,
  BodyContainer2,
  CompanyNameStyle,
  FormTitleStyle,
  FormCodeStyle,
  OriginStyle,
  DestinyStyle,
  // PassageDataBackground,
  PassageDataContainer,
  NumTicketsStyle,
  // TextPriceStyle,
  PriceTicketStyle,
  // TotalPriceStyle,
  TextTotalAmountTickets,
  TotalAmountTickets,
  TextTotalAmountIncome,
  TotalAmountIncome,
  TextTitleExpenseStyle,
  DieselStyle,
  DieselPriceStyle,
  TollStyle,
  TollPriceStyle,
  ViaticosStyle,
  ViaticosAmountStyle,
  WashedStyle,
  WashedPriceStyle,
  LaborUnionStyle,
  LaborUnionAmountStyle,
  OthersStyle,
  OthersAmountStyle,
  TextTotalExpensesStyle,
  TotalExpensesStyle,
  TextTotalSettlementStyle,
  TotalSettlementStyle,
  PlaceAndDateStyle,
  SignatureStyle,
} from './SettlementFormStyles';
//Contexts:
//Firebase Functions:
//States:
//Components:
//Others:
const settlementData = {
  companyName: 'Sin Fronteras',
  formCode: '004121',
  origin: 'Sucre',
  destiny: 'Santa Cruz',
  numTickets: 2,
  priceTicket: 100,
  totalPrice: 200,
  totalAmountTickets: 2430,
  totalAmountIncome: 2430,
  //travelExpenses.jsx :
  busEnrollment: '',
  tripMadeKey: '',
  expenses: {
    diesel: '0',
    toll: '0',
    viaticos: '0',
    washed: '0',
    laborUnion: '0',
    others: '0',
    otherDescription: '',
  },
  totalExpenses: 402, //Por default numerico

  TotalSettlement: 2078,
  date: '24/01/2021', //TravelDate?
};

export const SettlementForm = () => {
  let settlementDataProps = [settlementData];

  return (
    <>
      {settlementDataProps
        ? settlementDataProps.map((data, index) => (
            // <div key={index}> //si utilizamos div los centreos del backgroung no funcionan
            <Background>
              <BodyContainer2>
                <CompanyNameStyle>
                  <span>{`Flota "${data.companyName.toUpperCase()}"`}</span>
                </CompanyNameStyle>

                <FormTitleStyle>
                  <span>{`PLANILLA DE LIQUIDACION`}</span>
                </FormTitleStyle>

                <FormCodeStyle>
                  <span>{`N# ${data.formCode}`}</span>
                </FormCodeStyle>

                <OriginStyle>
                  <span>{`Origen: ${data.origin}`}</span>
                </OriginStyle>

                <DestinyStyle>
                  <span>{`Destino: ${data.destiny}`}</span>
                </DestinyStyle>

                {/* Opcion 1: ccsLine */}
                {/* <PassageDataContainer>
                  <>
                    <span
                      style={{
                        textAlign: 'right',
                        paddingRight: '50px',
                      }}
                    >
                      {data.numTickets}
                    </span>
                    <span>{`Pasaje c/u Bs.`}</span>
                    <span
                      style={{
                        textAlign: 'right',
                        paddingRight: '50px',
                      }}
                    >
                      {data.priceTicket}
                    </span>
                    <span>{`Bs. ${data.totalPrice}`}</span>
                  </>

                  <>
                    <span
                      style={{
                        textAlign: 'right',
                        paddingRight: '50px',
                      }}
                    >
                      {data.numTickets}
                    </span>
                    <span>{`Pasaje c/u Bs.`}</span>
                    <span
                      style={{
                        textAlign: 'right',
                        paddingRight: '50px',
                      }}
                    >
                      {data.priceTicket}
                    </span>
                    <span>{`Bs. ${data.totalPrice}`}</span>
                  </>

                  <>
                    <span
                      style={{
                        textAlign: 'right',
                        paddingRight: '50px',
                      }}
                    >
                      {data.numTickets}
                    </span>
                    <span>{`Pasaje c/u Bs.`}</span>
                    <span
                      style={{
                        textAlign: 'right',
                        paddingRight: '50px',
                      }}
                    >
                      {data.priceTicket}
                    </span>
                    <span>{`Bs. ${data.totalPrice}`}</span>
                  </>
                </PassageDataContainer> */}

                {/* Opcion 2: stylesComponents */}
                {/* <PassageDataContainer>
                  <>
                    <NumTicketsStyle>
                      <span>{data.numTickets}</span>
                    </NumTicketsStyle>

                    <TextPriceStyle>
                      <span>{`Pasaje c/u Bs.`}</span>
                    </TextPriceStyle>

                    <PriceTicketStyle>
                      <span>{data.priceTicket}</span>
                    </PriceTicketStyle>

                    <TotalPriceStyle>
                      <span>{`Bs. ${data.totalPrice}`}</span>
                    </TotalPriceStyle>
                  </>

                  <>
                    <NumTicketsStyle>
                      <span>{10}</span>
                    </NumTicketsStyle>

                    <TextPriceStyle>
                      <span>{`Pasaje c/u Bs.`}</span>
                    </TextPriceStyle>

                    <PriceTicketStyle>
                      <span>{80}</span>
                    </PriceTicketStyle>

                    <TotalPriceStyle>
                      <span>{`Bs. ${80}`}</span>
                    </TotalPriceStyle>
                  </>

                  <>
                    <NumTicketsStyle>
                      <span>{100}</span>
                    </NumTicketsStyle>

                    <TextPriceStyle>
                      <span>{`Pasaje c/u Bs.`}</span>
                    </TextPriceStyle>

                    <PriceTicketStyle>
                      <span>{5}</span>
                    </PriceTicketStyle>

                    <TotalPriceStyle>
                      <span>{`Bs. ${5}`}</span>
                    </TotalPriceStyle>
                  </>
                </PassageDataContainer> */}

                {/* Opcion Hibrida: */}
                <PassageDataContainer>
                  <>
                    <NumTicketsStyle>
                      <span>{data.numTickets}</span>
                    </NumTicketsStyle>

                    <span>{`Pasaje c/u Bs.`}</span>

                    <PriceTicketStyle>
                      <span>{data.priceTicket}</span>
                    </PriceTicketStyle>

                    <span>{`Bs. ${data.totalPrice}`}</span>
                  </>

                  <>
                    <NumTicketsStyle>
                      <span>{10}</span>
                    </NumTicketsStyle>

                    <span>{`Pasaje c/u Bs.`}</span>

                    <PriceTicketStyle>
                      <span>{80}</span>
                    </PriceTicketStyle>

                    <span>{`Bs. ${80}`}</span>
                  </>

                  <>
                    <NumTicketsStyle>
                      <span>{100}</span>
                    </NumTicketsStyle>

                    <span>{`Pasaje c/u Bs.`}</span>

                    <PriceTicketStyle>
                      <span>{5}</span>
                    </PriceTicketStyle>

                    <span>{`Bs. ${5}`}</span>
                  </>
                </PassageDataContainer>

                <TextTotalAmountTickets>
                  <span>{`TOTAL PASAJES`}</span>
                </TextTotalAmountTickets>

                <TotalAmountTickets>
                  <span>{`Bs. ${data.totalAmountTickets}`}</span>
                </TotalAmountTickets>

                <TextTotalAmountIncome>
                  <span>{`TOTAL INGRESOS`}</span>
                </TextTotalAmountIncome>

                <TotalAmountIncome>
                  <span>{`Bs. ${data.totalAmountIncome}`}</span>
                </TotalAmountIncome>

                <>
                  <TextTitleExpenseStyle>
                    <span>{`EGRESOS`}</span>
                  </TextTitleExpenseStyle>

                  <DieselStyle>
                    <span>{`Diesel`}</span>
                  </DieselStyle>

                  <DieselPriceStyle>
                    <span>{`Bs. ${data.expenses.diesel}`}</span>
                  </DieselPriceStyle>

                  <TollStyle>
                    <span>{`Peaje`}</span>
                  </TollStyle>

                  <TollPriceStyle>
                    <span>{`Bs. ${data.expenses.toll}`}</span>
                  </TollPriceStyle>

                  <ViaticosStyle>
                    <span>{`Viaticos`}</span>
                  </ViaticosStyle>

                  <ViaticosAmountStyle>
                    <span>{`Bs. ${data.expenses.viaticos}`}</span>
                  </ViaticosAmountStyle>

                  <WashedStyle>
                    <span>{`Lavado`}</span>
                  </WashedStyle>

                  <WashedPriceStyle>
                    <span>{`Bs. ${data.expenses.washed}`}</span>
                  </WashedPriceStyle>

                  <LaborUnionStyle>
                    <span>{`Sindicato`}</span>
                  </LaborUnionStyle>

                  <LaborUnionAmountStyle>
                    <span>{`Bs. ${data.expenses.laborUnion}`}</span>
                  </LaborUnionAmountStyle>

                  <OthersStyle>
                    <span>{`Otros`}</span>
                  </OthersStyle>

                  <OthersAmountStyle>
                    <span>{`Bs. ${data.expenses.others}`}</span>
                  </OthersAmountStyle>

                  <TextTotalExpensesStyle>
                    <span>{`TOTAL EGRESOS`}</span>
                  </TextTotalExpensesStyle>

                  <TotalExpensesStyle>
                    <span>{`Bs. ${data.totalExpenses}`}</span>
                  </TotalExpensesStyle>
                </>

                <TextTotalSettlementStyle>
                  <span>{`TOTAL LIQUIDACION`}</span>
                </TextTotalSettlementStyle>

                <TotalSettlementStyle>
                  <span>{`Bs. ${data.TotalSettlement}`}</span>
                </TotalSettlementStyle>

                <PlaceAndDateStyle>
                  <span>{`Lugar y Fecha: ${data.origin} ${data.date}`}</span>
                </PlaceAndDateStyle>

                <SignatureStyle>
                  <p>{`_ _ _ _ _ _ _ _ _ _ _ _ _ _`}</p>
                  <p>{`Recibi Conforme`}</p>
                  <span>{`PROPIETARIO`}</span>
                </SignatureStyle>
              </BodyContainer2>
            </Background>
            // </div>
          ))
        : null}
    </>
  );
};
