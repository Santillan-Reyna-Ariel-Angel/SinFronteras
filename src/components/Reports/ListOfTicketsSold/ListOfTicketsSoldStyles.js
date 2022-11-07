import styled from 'styled-components';

export const Background = styled.div`
  display: grid;
  left: 0;
  top: 0;
  justify-content: center; //centrea los elementos
  align-content: center; //junta los elementos vertical
  /* grid-template-columns: auto; */
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
