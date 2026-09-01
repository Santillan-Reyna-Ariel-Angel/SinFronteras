import styled from 'styled-components';

export const Background = styled.div`
  //Se usan los 4 o se usara margin:
  display: grid;
  /* align-content: center; //junta los elementos vertical */
  align-content: start;
  margin-top: 5%;

  justify-content: center; //centrea los elementos orizontalmente
  min-width: 435px;
  width: 100%; //opcional para llevarlo al medio de la pantalla

  left: 0;
  top: 0;
  /* grid-template-columns: auto; */
  //new:
  /* margin-top: 40px; // si eliminamos esto tendremos que añadir 2 <br/> despues de <Background> */
  @media screen and (max-width: 768px) {
    margin-top: 10%;
    margin-bottom: 10%;
  }
`;

export const BodyContainer = styled.div`
  display: grid;
  background-color: #00bdb2;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: 5px;
  grid-column-gap: 10px;
  padding: 0px 0px 0px 0px;
  //sombreado:
  border: 4px solid #051e34; //contorno
  border-radius: 10px 10px 10px 10px;
  /* backdrop-filter: blur(18px); */
  /* box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7); */
  grid-template-areas: 'MuiDataTablesStyle';
  /* overflow: hidden; */
`;

export const MuiDataTablesStyle = styled.div`
  grid-area: MuiDataTablesStyle;
  /* justify-self: center; */
`;
