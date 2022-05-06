import styled from 'styled-components';

export const Background = styled.div`
  display: grid;
  left: 0;
  top: 0;
  justify-content: center; //centrea los elementos
  /* align-content: center; //junta los elementos vertical */
  /* grid-template-columns: auto; */
`;

export const Container = styled.div`
  display: grid;
  background-color: #00bdb2;
  grid-template-columns: 170px 170px;
  grid-template-rows: auto;
  grid-row-gap: 15px;
  grid-column-gap: 10px;
  padding: 15px 20px;
  //sombreado:
  border-radius: 10px;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  grid-template-areas: 'InputCiOrNit InputCiOrNit' 'InputNameOrSocialReason InputNameOrSocialReason' 'InputEmail InputEmail' 'InputCountryCode InputMobile' 'Btn Btn';
  /* overflow: hidden; */
`;

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
