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
  /* margin-top: 40px; // si eliminamos esto tendremos que añadir 2 <br/> despues de <Background> */
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
  grid-template-columns: 170px 170px;
  grid-template-rows: auto;
  grid-row-gap: 15px;
  grid-column-gap: 10px;
  padding: 15px 20px;
  //sombreado:
  border: 4px solid #051e34; //contorno
  border-radius: 0px 0px 10px 10px;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  grid-template-areas: 'EnrollmentStyle FilingStyle' 'TypeOfBusStyle TypeOfSeatsStyle' 'NumberOfSeatsStyle StatusStyle' 'NumberOfFloorsText NumberOfFloorsText' 'NumberOfFloorsStyle NumberOfFloorsStyle' 'ServicesText ServicesText' 'ServicesStyle ServicesStyle' 'IdentificationNumberDriver IdentificationNumberDriver' 'Btn Btn';
  /* overflow: hidden; */
`;

export const EnrollmentStyle = styled.div`
  grid-area: EnrollmentStyle;
  .input {
    width: 100%;
  }
`;

export const FilingStyle = styled.div`
  grid-area: FilingStyle;
  .input {
    width: 100%;
  }
`;

export const TypeOfBusStyle = styled.div`
  grid-area: TypeOfBusStyle;
  .input {
    width: 100%;
  }
`;

export const TypeOfSeatsStyle = styled.div`
  grid-area: TypeOfSeatsStyle;
  .input {
    width: 100%;
  }
`;

export const NumberOfSeatsStyle = styled.div`
  grid-area: NumberOfSeatsStyle;
  .input {
    width: 100%;
  }
`;

export const StatusStyle = styled.div`
  grid-area: StatusStyle;
  .input {
    width: 100%;
  }
`;

export const NumberOfFloorsText = styled.div`
  grid-area: NumberOfFloorsText;
  text-align: center;
  font-size: larger;
  font-weight: bold;
`;

export const NumberOfFloorsStyle = styled.div`
  grid-area: NumberOfFloorsStyle;
  justify-self: center;
`;

export const ServicesText = styled.div`
  grid-area: ServicesText;
  text-align: center;
  font-size: larger;
  font-weight: bold;
`;

export const ServicesStyle = styled.div`
  grid-area: ServicesStyle;
  justify-self: center;
`;

export const IdentificationNumberDriver = styled.div`
  grid-area: IdentificationNumberDriver;
  .input {
    width: 50%;
  }
`;

export const Btn = styled.div`
  grid-area: Btn;
  justify-self: center;
`;
