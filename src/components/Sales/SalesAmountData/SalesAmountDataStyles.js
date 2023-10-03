import styled from 'styled-components';

export const Background = styled.div`
  display: grid;
  left: 0;
  top: 0;
  justify-content: center; //centrea los elementos
  /* align-content: center; //junta los elementos vertical */
  /* grid-template-columns: auto; */
`;
export const HeaderContainer = styled.div`
  display: grid;
  padding: 0px 0px;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas: 'HeaderTitle';

  color: white;
  border-radius: 10px 10px 0px 0px;
  background: #051e34;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  overflow: hidden;
`;

export const HeaderTitle = styled.div`
  grid-area: HeaderTitle;
  text-align: center;
  padding: 5px 0px;
  font-size: larger;

  @media screen and (max-width: 768px) {
    padding: 4px 0px 0px 0px;
  }
`;

export const BodyContainer = styled.div`
  display: grid;
  background-color: #00bdb2;
  grid-template-columns: auto 1fr; //Dimencion minima: 146.5px 115px
  grid-template-rows: auto;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  padding: 15px 20px;
  //sombreado:
  border: 4px solid #051e34; //contorno
  border-radius: 0px 0px 10px 10px;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  grid-template-areas: 'TextSubtotal Subtotal' 'DiscountCheckbox InputDiscount' 'DiscountDescription DiscountDescription' 'TextAmountTotal AmountTotal';
  /* overflow: hidden; */

  /* font-family: 'Roboto', 'Helvetica', 'Arial', 'Times New Roman', sans-serif; */
  font-size: large;

  @media screen and (max-width: 768px) {
    grid-row-gap: 6px;
    grid-column-gap: 8px;
    padding: 8px 12px;
  }
`;

export const TextSubtotal = styled.div`
  grid-area: TextSubtotal;
`;

export const Subtotal = styled.div`
  grid-area: Subtotal;
  font-weight: bold;
`;

export const DiscountCheckbox = styled.div`
  grid-area: DiscountCheckbox;
  .check {
    /* width: 100%; */
    margin-left: 0px;
  }
`;

export const InputDiscount = styled.div`
  grid-area: InputDiscount;
  .input {
    width: 115px;
  }
`;

export const DiscountDescription = styled.div`
  grid-area: DiscountDescription;
  .input {
    width: 100%;
  }
`;

export const TextAmountTotal = styled.div`
  grid-area: TextAmountTotal;
`;

export const AmountTotal = styled.div`
  grid-area: AmountTotal;
  font-weight: bold;
  font-size: large;
`;
