import styled from 'styled-components';

export const Background = styled.div`
  //Se usan los 4 o se usara margin:
  display: grid;
  align-content: center; //junta los elementos vertical
  justify-content: center; //centrea los elementos orizontalmente
  width: 100%; //opcional para llevarlo al medio de la pantalla

  /* left: 0; */
  /* top: 0; */
  /* grid-template-columns: auto; */
  //new:
  margin-top: 40px; // si eliminamos esto tendremos que añadir 2 <br/> despues de <Background>
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
`;

export const BodyContainer = styled.div`
  display: grid;
  background-color: #00bdb2;
  grid-template-columns: 135px 135px;
  grid-template-rows: auto;
  grid-row-gap: 15px;
  grid-column-gap: 10px;
  padding: 15px 20px;
  //sombreado:
  border: 4px solid #051e34; //contorno
  border-radius: 0px 0px 10px 10px;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  grid-template-areas: 'DepartmentStyle DepartmentStyle' 'LocationStyle LocationStyle' 'AssignPricesText AssignPricesText' 'NormalTypeOfBusCheck NormalSeatType' 'NormalMinimalPrice NormalMaximumPrice' 'LeitoTypeOfBusCheck LeitoSeatType' 'LeitoMinimalPrice LeitoMaximumPrice' 'Btn Btn';
  /* overflow: hidden; */
`;

export const DepartmentStyle = styled.div`
  grid-area: DepartmentStyle;
  .input {
    width: 100%;
  }
`;

export const LocationStyle = styled.div`
  grid-area: LocationStyle;
  .input {
    width: 100%;
  }
`;

export const AssignPricesText = styled.div`
  grid-area: AssignPricesText;
  text-align: center;
  font-size: larger;
  font-weight: bold;
`;

export const NormalTypeOfBusCheck = styled.div`
  grid-area: NormalTypeOfBusCheck;
  .check {
    /* width: 100%; */
    margin-left: 0px;
  }
`;

export const NormalSeatType = styled.div`
  grid-area: NormalSeatType;
  .input {
    width: 100%;
  }
`;

export const NormalMinimalPrice = styled.div`
  grid-area: NormalMinimalPrice;
  .input {
    width: 100%;
  }
`;

export const NormalMaximumPrice = styled.div`
  grid-area: NormalMaximumPrice;
  .input {
    width: 100%;
  }
`;

export const LeitoTypeOfBusCheck = styled.div`
  grid-area: LeitoTypeOfBusCheck;
  .check {
    /* width: 100%; */
    margin-left: 0px;
  }
`;

export const LeitoSeatType = styled.div`
  grid-area: LeitoSeatType;
  .input {
    width: 100%;
  }
`;

export const LeitoMinimalPrice = styled.div`
  grid-area: LeitoMinimalPrice;
  .input {
    width: 100%;
  }
`;

export const LeitoMaximumPrice = styled.div`
  grid-area: LeitoMaximumPrice;
  .input {
    width: 100%;
  }
`;

// export const ServicesStyle = styled.div`
//   grid-area: ServicesStyle;
//   justify-self: center; //centrea lo checks
// `;

export const Btn = styled.div`
  grid-area: Btn;
  justify-self: center;
`;
