import styled from 'styled-components';

export const Background = styled.div`
  //Se usan los 4 o se usara margin:
  display: grid;
  align-content: center; //junta los elementos vertical
  justify-content: center; //centrea los elementos orizontalmente
  width: 100%; //opcional para llevarlo al medio de la pantalla

  left: 0;
  top: 0;
  /* grid-template-columns: auto; */
  //new:
  margin-top: 40px; // si eliminamos esto tendremos que añadir 2 <br/> despues de <Background>
`;

export const BodyContainer = styled.div`
  display: grid;
  background-color: 'gray'; //00bdb2
  grid-template-columns: 100px 100px 100px 100px;
  grid-template-rows: auto;
  grid-row-gap: 5px;
  grid-column-gap: 5px;
  padding: 15px 20px;
  //sombreado:
  border: 4px solid #051e34; //contorno
  border-radius: 0px 0px 0px 0px;
  /* backdrop-filter: blur(18px); */
  /* box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7); */
  grid-template-areas: 'CompanyNameStyle CompanyNameStyle CompanyNameStyle CompanyNameStyle' 'FormTitleStyle FormTitleStyle FormTitleStyle FormCodeStyle' 'OriginStyle OriginStyle DestinyStyle DestinyStyle' 'NumTicketsStyle TextPriceStyle PriceTicketStyle TotalPriceStyle' 'TextTotalAmountTickets TextTotalAmountTickets TextTotalAmountTickets TotalAmountTickets' 'TextTotalAmountIncome TextTotalAmountIncome TextTotalAmountIncome TotalAmountIncome' 'TextTitleExpenseStyle TextTitleExpenseStyle TextTitleExpenseStyle TextTitleExpenseStyle' 'DieselStyle DieselStyle DieselPriceStyle DieselPriceStyle' ' TollStyle TollStyle TollPriceStyle TollPriceStyle' 'ViaticosStyle ViaticosStyle ViaticosAmountStyle ViaticosAmountStyle' 'WashedStyle WashedStyle WashedPriceStyle WashedPriceStyle' 'LaborUnionStyle LaborUnionStyle LaborUnionAmountStyle LaborUnionAmountStyle' 'OthersStyle OthersStyle OthersAmountStyle OthersAmountStyle' 'TextTotalExpensesStyle TextTotalExpensesStyle TextTotalExpensesStyle  TotalExpensesStyle' 'TextTotalSettlementStyle TextTotalSettlementStyle TextTotalSettlementStyle TotalSettlementStyle' 'PlaceAndDateStyle PlaceAndDateStyle PlaceAndDateStyle PlaceAndDateStyle ' 'SignatureStyle SignatureStyle SignatureStyle SignatureStyle';
  /* overflow: hidden; */
`;

export const CompanyNameStyle = styled.div`
  grid-area: CompanyNameStyle;
  /* width: 100%; */
  text-align: center;
  font-size: larger;
  font-weight: bold;
`;

export const FormTitleStyle = styled.div`
  grid-area: FormTitleStyle;
  text-align: center;
  font-size: larger;
  font-weight: bold;
`;

export const FormCodeStyle = styled.div`
  grid-area: FormCodeStyle;
  text-align: center;
  font-size: larger;
  font-weight: bold;
`;

export const OriginStyle = styled.div`
  grid-area: OriginStyle;
  border-bottom: 4px solid #051e34; //contorno
`;

export const DestinyStyle = styled.div`
  grid-area: DestinyStyle;
  border-bottom: 4px solid #051e34; //contorno
`;

export const NumTicketsStyle = styled.div`
  grid-area: NumTicketsStyle;
`;

export const TextPriceStyle = styled.div`
  grid-area: TextPriceStyle;
`;

export const PriceTicketStyle = styled.div`
  grid-area: PriceTicketStyle;
`;

export const TotalPriceStyle = styled.div`
  grid-area: TotalPriceStyle;
`;

export const TextTotalAmountTickets = styled.div`
  grid-area: TextTotalAmountTickets;
  text-align: right;
  font-size: larger;
  font-weight: bold;
  padding-right: 10px;
`;

export const TotalAmountTickets = styled.div`
  grid-area: TotalAmountTickets;
  font-size: larger;
  font-weight: bold;
`;

export const TextTotalAmountIncome = styled.div`
  grid-area: TextTotalAmountIncome;
  text-align: right;
  font-size: larger;
  font-weight: bold;
  padding-right: 10px;
`;

export const TotalAmountIncome = styled.div`
  grid-area: TotalAmountIncome;
  /* text-align: center; */
  font-size: larger;
  font-weight: bold;
`;

export const TextTitleExpenseStyle = styled.div`
  grid-area: TextTitleExpenseStyle;
  /* width: 100%; */
  text-align: center;
  font-size: larger;
  font-weight: bold;
  justify-self: center; //tentativo a eliminar
`;

export const DieselStyle = styled.div`
  grid-area: DieselStyle;
  text-align: left;
  /* margin-left: 80px; */
  padding-left: 80px;
`;

export const DieselPriceStyle = styled.div`
  grid-area: DieselPriceStyle;
  text-align: center;
`;

export const TollStyle = styled.div`
  grid-area: TollStyle;
  text-align: left;
  padding-left: 80px;
`;

export const TollPriceStyle = styled.div`
  grid-area: TollPriceStyle;
  text-align: center;
`;

export const ViaticosStyle = styled.div`
  grid-area: ViaticosStyle;
  text-align: left;
  padding-left: 80px;
`;

export const ViaticosAmountStyle = styled.div`
  grid-area: ViaticosAmountStyle;
  text-align: center;
`;

export const WashedStyle = styled.div`
  grid-area: WashedStyle;
  text-align: left;
  padding-left: 80px;
`;

export const WashedPriceStyle = styled.div`
  grid-area: WashedPriceStyle;
  text-align: center;
`;

export const LaborUnionStyle = styled.div`
  grid-area: LaborUnionStyle;
  text-align: left;
  padding-left: 80px;
`;

export const LaborUnionAmountStyle = styled.div`
  grid-area: LaborUnionAmountStyle;
  text-align: center;
`;

export const OthersStyle = styled.div`
  grid-area: OthersStyle;
  text-align: left;
  padding-left: 80px;
`;

export const OthersAmountStyle = styled.div`
  grid-area: OthersAmountStyle;
  text-align: center;
`;

export const TextTotalExpensesStyle = styled.div`
  grid-area: TextTotalExpensesStyle;
  text-align: right;
  font-size: larger;
  font-weight: bold;
  padding-right: 10px;
`;

export const TotalExpensesStyle = styled.div`
  grid-area: TotalExpensesStyle;
  font-size: larger;
  font-weight: bold;
`;

export const TextTotalSettlementStyle = styled.div`
  grid-area: TextTotalSettlementStyle;
  text-align: center;
  font-size: larger;
  font-weight: bold;
  /* padding-right: 10px; */
`;

export const TotalSettlementStyle = styled.div`
  grid-area: TotalSettlementStyle;
  font-size: larger;
  font-weight: bold;
`;

export const PlaceAndDateStyle = styled.div`
  grid-area: PlaceAndDateStyle;
  text-align: center;
`;

export const SignatureStyle = styled.div`
  grid-area: SignatureStyle;
  text-align: center;
  margin-top: 40px;
  p {
    margin: 0px 0px;
  }
`;

// export const OtherDescriptionStyle = styled.div`
//   grid-area: OtherDescriptionStyle;
//   .input {
//     width: 100%;
//   }
// `;

// export const Btn = styled.div`
//   grid-area: Btn;
//   justify-self: center;
// `;
