import React from 'react';
// MUI:
//Styles:
import {
  Background,
  BodyContainer,
  CompanyNameStyle,
  FormTitleStyle,
  FormCodeStyle,
  OriginStyle,
  DestinyStyle,
  PassageDataContainer,
  NumTicketsStyle,
  PriceTicketStyle,
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
  formCode: 'travel_fecha_hora_matricula', //travel_30-12-2022_20-30_bus-004
  origin: 'a', //Sucre
  destiny: 'b', //Santa Cruz

  travelIncome: {
    incomeTickets: [
      {
        numTickets: 0,
        priceTicket: 0,
        totalPrice: 0,
      },
      // {
      //   numTickets: 9,
      //   priceTicket: 90,
      //   totalPrice: 810,
      // },
      // {
      //   numTickets: 16,
      //   priceTicket: 80,
      //   totalPrice: 1280,
      // },
      // {
      //   numTickets: 2,
      //   priceTicket: 70,
      //   totalPrice: 140,
      // },
    ],
    totalAmountTickets: 0,
    totalAmountIncome: 0,
  },

  travelExpenses: {
    busEnrollment: '',
    expenses: {
      diesel: '0',
      laborUnion: '0',
      otherDescription: '',
      others: '0',
      toll: '0',
      viaticos: '0',
      washed: '0',
    },
    totalExpenses: 0, //Por default numerico
    tripMadeKey: '',
  },

  TotalSettlement: 0,
  travelDate: 'xx/xx/xxxx', //TravelDate?
};

export const SettlementForm = React.forwardRef((props, ref) => {
  let { settlementFormData } = props;
  // console.log('settlementFormDataList', settlementFormDataList);

  let settlementDataProps = settlementFormData
    ? [settlementFormData]
    : [settlementData];

  console.log('settlementDataProps', settlementDataProps);

  return (
    <div ref={ref}>
      {settlementDataProps
        ? settlementDataProps.map((data, index) => (
            // <div key={index}> //si utilizamos div los centreos del backgroung no funcionan
            <Background>
              <BodyContainer>
                <CompanyNameStyle>
                  <span>{`Flota "${data.companyName.toUpperCase()}"`}</span>
                </CompanyNameStyle>

                <FormTitleStyle>
                  <span>{`PLANILLA DE LIQUIDACION`}</span>
                </FormTitleStyle>

                <FormCodeStyle>
                  <span>{`Codigo: ${data.formCode}`}</span>
                </FormCodeStyle>

                <OriginStyle>
                  <span>{`Origen: ${data.origin}`}</span>
                </OriginStyle>

                <DestinyStyle>
                  <span>{`Destino: ${data.destiny}`}</span>
                </DestinyStyle>

                {/* Opcion Hibrida: */}
                <PassageDataContainer>
                  {data.travelIncome.incomeTickets.map((data) => (
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
                  ))}
                </PassageDataContainer>

                <TextTotalAmountTickets>
                  <span>{`TOTAL PASAJES`}</span>
                </TextTotalAmountTickets>

                <TotalAmountTickets>
                  <span>{`Bs. ${data.travelIncome.totalAmountTickets}`}</span>
                </TotalAmountTickets>

                <TextTotalAmountIncome>
                  <span>{`TOTAL INGRESOS`}</span>
                </TextTotalAmountIncome>

                <TotalAmountIncome>
                  <span>{`Bs. ${data.travelIncome.totalAmountIncome}`}</span>
                </TotalAmountIncome>

                <>
                  <TextTitleExpenseStyle>
                    <span>{`EGRESOS`}</span>
                  </TextTitleExpenseStyle>

                  <DieselStyle>
                    <span>{`Diesel`}</span>
                  </DieselStyle>

                  <DieselPriceStyle>
                    <span>{`Bs. ${data.travelExpenses.expenses.diesel}`}</span>
                  </DieselPriceStyle>

                  <TollStyle>
                    <span>{`Peaje`}</span>
                  </TollStyle>

                  <TollPriceStyle>
                    <span>{`Bs. ${data.travelExpenses.expenses.toll}`}</span>
                  </TollPriceStyle>

                  <ViaticosStyle>
                    <span>{`Viaticos`}</span>
                  </ViaticosStyle>

                  <ViaticosAmountStyle>
                    <span>{`Bs. ${data.travelExpenses.expenses.viaticos}`}</span>
                  </ViaticosAmountStyle>

                  <WashedStyle>
                    <span>{`Lavado`}</span>
                  </WashedStyle>

                  <WashedPriceStyle>
                    <span>{`Bs. ${data.travelExpenses.expenses.washed}`}</span>
                  </WashedPriceStyle>

                  <LaborUnionStyle>
                    <span>{`Sindicato`}</span>
                  </LaborUnionStyle>

                  <LaborUnionAmountStyle>
                    <span>{`Bs. ${data.travelExpenses.expenses.laborUnion}`}</span>
                  </LaborUnionAmountStyle>

                  <OthersStyle>
                    <span>{`Otros`}</span>
                  </OthersStyle>

                  <OthersAmountStyle>
                    <span>{`Bs. ${data.travelExpenses.expenses.others}`}</span>
                  </OthersAmountStyle>

                  <TextTotalExpensesStyle>
                    <span>{`TOTAL EGRESOS`}</span>
                  </TextTotalExpensesStyle>

                  <TotalExpensesStyle>
                    <span>{`Bs. ${data.travelExpenses.totalExpenses}`}</span>
                  </TotalExpensesStyle>
                </>

                <TextTotalSettlementStyle>
                  <span>{`TOTAL LIQUIDACION`}</span>
                </TextTotalSettlementStyle>

                <TotalSettlementStyle>
                  <span>{`Bs. ${data.totalSettlement}`}</span>
                </TotalSettlementStyle>

                <PlaceAndDateStyle>
                  <span>{`Lugar y Fecha: ${data.origin} ${data.travelDate}`}</span>
                </PlaceAndDateStyle>

                <SignatureStyle>
                  <p>{`_ _ _ _ _ _ _ _ _ _ _ _ _ _`}</p>
                  <p>{`Recibi Conforme`}</p>
                  <span>{`PROPIETARIO`}</span>
                </SignatureStyle>
              </BodyContainer>
            </Background>
            // </div>
          ))
        : null}
    </div>
  );
});
