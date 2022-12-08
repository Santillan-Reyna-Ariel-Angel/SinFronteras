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
  /* margin-top: 40px; // si eliminamos esto tendremos que añadir 2 <br/> despues de <Background> */
`;
export const HeaderContainer = styled.div`
  display: grid;
  padding: 0px 0px;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas: 'HeaderTitle';

  color: white;
  border-radius: 0px 0px 0px 0px; //10px 10px 0px 0px
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
  grid-template-columns: 150px 150px;
  grid-template-rows: auto;
  grid-row-gap: 15px;
  grid-column-gap: 10px;
  padding: 15px 20px;
  //sombreado:
  border: 4px solid #051e34; //contorno
  border-radius: 0px 0px 0px 0px; //0px 0px 10px 10px
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  grid-template-areas: 'TripMadeKeyStyle TripMadeKeyStyle' 'DieselStyle TollStyle' 'ViaticosStyle WashedStyle' 'LaborUnionStyle OthersStyle' 'OtherDescriptionStyle OtherDescriptionStyle' 'TextTotalExpensesStyle TextTotalExpensesStyle' 'Btn Btn';
  /* overflow: hidden; */
`;

export const TripMadeKeyStyle = styled.div`
  grid-area: TripMadeKeyStyle;
  .input {
    width: 100%;
  }
`;

export const DieselStyle = styled.div`
  grid-area: DieselStyle;
  .input {
    width: 100%;
  }
`;

export const TollStyle = styled.div`
  grid-area: TollStyle;
  .input {
    width: 100%;
  }
`;

export const ViaticosStyle = styled.div`
  grid-area: ViaticosStyle;
  .input {
    width: 100%;
  }
`;

export const WashedStyle = styled.div`
  grid-area: WashedStyle;
  .input {
    width: 100%;
  }
`;

export const LaborUnionStyle = styled.div`
  grid-area: LaborUnionStyle;
  .input {
    width: 100%;
  }
`;

export const OthersStyle = styled.div`
  grid-area: OthersStyle;
  .input {
    width: 100%;
  }
`;

export const OtherDescriptionStyle = styled.div`
  grid-area: OtherDescriptionStyle;
  .input {
    width: 100%;
  }
`;

export const TextTotalExpensesStyle = styled.div`
  grid-area: TextTotalExpensesStyle;
  text-align: center;
  font-size: larger;
  font-weight: bold;
`;

export const Btn = styled.div`
  grid-area: Btn;
  justify-self: center;
`;
