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
  NumTicketsStyle,
  TextPriceStyle,
  PriceTicketStyle,
  TotalPriceStyle,
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

export const SettlementForm = () => {
  return (
    <>
      <Background>
        <BodyContainer>
          <CompanyNameStyle>
            <span>{`Flota "SIN FRONTERAS"`}</span>
          </CompanyNameStyle>

          <FormTitleStyle>
            <span>{`PLANILLA DE LIQUIDACION`}</span>
          </FormTitleStyle>

          <FormCodeStyle>
            <span>{`N# 004121`}</span>
          </FormCodeStyle>

          <OriginStyle>
            <span>{`Origen: Sucre`}</span>
          </OriginStyle>

          <DestinyStyle>
            <span>{`Destino: Santa Cruz`}</span>
          </DestinyStyle>

          <NumTicketsStyle>
            <span>{`2`}</span>
          </NumTicketsStyle>

          <TextPriceStyle>
            <span>{`Pasaje c/u Bs.`}</span>
          </TextPriceStyle>

          <PriceTicketStyle>
            <span>{`100`}</span>
          </PriceTicketStyle>

          <TotalPriceStyle>
            <span>{`Bs. 200`}</span>
          </TotalPriceStyle>

          <TextTotalAmountTickets>
            <span>{`TOTAL PASAJES`}</span>
          </TextTotalAmountTickets>

          <TotalAmountTickets>
            <span>{`Bs. 2430`}</span>
          </TotalAmountTickets>

          <TextTotalAmountIncome>
            <span>{`TOTAL INGRESOS`}</span>
          </TextTotalAmountIncome>

          <TotalAmountIncome>
            <span>{`Bs. 2430`}</span>
          </TotalAmountIncome>

          <TextTitleExpenseStyle>
            <span>{`EGRESOS`}</span>
          </TextTitleExpenseStyle>

          <DieselStyle>
            <span>{`Diesel`}</span>
          </DieselStyle>

          <DieselPriceStyle>
            <span>{`Bs. 0`}</span>
          </DieselPriceStyle>

          <TollStyle>
            <span>{`Peaje`}</span>
          </TollStyle>

          <TollPriceStyle>
            <span>{`Bs. 0`}</span>
          </TollPriceStyle>

          <ViaticosStyle>
            <span>{`Viaticos`}</span>
          </ViaticosStyle>

          <ViaticosAmountStyle>
            <span>{`Bs. 0`}</span>
          </ViaticosAmountStyle>

          <WashedStyle>
            <span>{`Lavado`}</span>
          </WashedStyle>

          <WashedPriceStyle>
            <span>{`Bs. 0`}</span>
          </WashedPriceStyle>

          <LaborUnionStyle>
            <span>{`Sindicato`}</span>
          </LaborUnionStyle>

          <LaborUnionAmountStyle>
            <span>{`Bs. 0`}</span>
          </LaborUnionAmountStyle>

          <OthersStyle>
            <span>{`Otros`}</span>
          </OthersStyle>

          <OthersAmountStyle>
            <span>{`Bs. 0`}</span>
          </OthersAmountStyle>

          <TextTotalExpensesStyle>
            <span>{`TOTAL EGRESOS`}</span>
          </TextTotalExpensesStyle>

          <TotalExpensesStyle>
            <span>{`Bs. 402`}</span>
          </TotalExpensesStyle>

          <TextTotalSettlementStyle>
            <span>{`TOTAL LIQUIDACION`}</span>
          </TextTotalSettlementStyle>

          <TotalSettlementStyle>
            <span>{`Bs. 2078`}</span>
          </TotalSettlementStyle>

          <PlaceAndDateStyle>
            <span>{`Lugar y Fecha: ${'Sucre'} ${'24/01/2021'}`}</span>
          </PlaceAndDateStyle>

          <SignatureStyle>
            <p>{`_ _ _ _ _ _ _ _ _ _ _ _ _ _`}</p>
            <p>{`Recibi Conforme`}</p>
            <span>{`PROPIETARIO`}</span>
          </SignatureStyle>
        </BodyContainer>
      </Background>
    </>
  );
};
