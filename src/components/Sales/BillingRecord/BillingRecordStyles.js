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
  grid-template-columns: 150px 135px;
  grid-template-rows: auto;
  grid-row-gap: 15px;
  grid-column-gap: 10px;
  padding: 15px 15px 10px 15px;
  //sombreado:
  border: 4px solid #051e34; //contorno
  border-radius: 0px 0px 10px 10px;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  /* grid-template-areas: 'InvoiceCheckbox InvoiceCheckbox' 'InputCiOrNit InputCiOrNit' 'InputNameOrSocialReason InputNameOrSocialReason' 'InputEmail InputEmail' 'InputCountryCode InputMobile' 'Btn Btn'; */

  grid-template-areas: 'InputCiOrNit InputCiOrNit' 'InputNameOrSocialReason InputNameOrSocialReason' 'InputEmail InputEmail' 'InputCountryCode InputMobile' 'Btn Btn';

  /* overflow: hidden; */

  @media screen and (max-width: 768px) {
    grid-template-columns: 150px 115px;
    grid-row-gap: 10px;
    grid-column-gap: 5px;
    padding: 12px 10px 10px 10px;
  }
`;

// export const InvoiceCheckbox = styled.div`
//   grid-area: InvoiceCheckbox;
//   .check {
//     /* width: 100%; */
//     margin-left: 0px;
//   }
// `;

export const InputCiOrNit = styled.div`
  grid-area: InputCiOrNit;
  .input {
    /* width: 100%; */
  }
`;

export const InputNameOrSocialReason = styled.div`
  grid-area: InputNameOrSocialReason;
  .input {
    width: 100%;
  }
`;

export const InputEmail = styled.div`
  grid-area: InputEmail;
  .input {
    width: 100%;
  }
`;

export const InputCountryCode = styled.div`
  grid-area: InputCountryCode;
  .input {
    /* width: 100%; */
  }
`;

export const InputMobile = styled.div`
  grid-area: InputMobile;
  .input {
    /* width: 100%; */
  }
`;

export const Btn = styled.div`
  grid-area: Btn;
  justify-self: center;
`;
