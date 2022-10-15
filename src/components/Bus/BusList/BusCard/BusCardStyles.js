import styled from 'styled-components';

export const Background = styled.div`
  display: grid;
  left: 0;
  top: 0;
  justify-content: center; //centrea los elementos
  align-content: center; //junta los elementos vertical
  /* grid-template-columns: auto; */

  //Tentado a eliminar:
  /* margin: 0px 3px; */
`;

export const BodyContainer = styled.div`
  display: grid;
  background-color: #00bdb2;
  grid-template-columns: 100px;
  grid-template-rows: auto;
  grid-row-gap: 5px; //15px
  grid-column-gap: 10px;
  padding: 0px 7px 10px 7px; //15px 20px
  //sombreado:
  border: 4px solid #051e34; //contorno
  border-radius: 10px 10px 10px 10px; //0px 0px 10px 10px;
  backdrop-filter: blur(18px);
  /* box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7); */
  grid-template-areas: 'CheckboxBusIconStyle' 'EnrollmentStyle' 'BranchStyle' 'BtnUpdateDataStyle';
  /* overflow: hidden; */
`;

export const CheckboxBusIconStyle = styled.div`
  grid-area: CheckboxBusIconStyle;
  justify-self: center;
`;

export const EnrollmentStyle = styled.div`
  grid-area: EnrollmentStyle;
  justify-self: center;
`;

export const BranchStyle = styled.div`
  grid-area: BranchStyle;
  justify-self: center;
  font-weight: bold;
`;

export const BtnUpdateDataStyle = styled.div`
  grid-area: BtnUpdateDataStyle;
  justify-self: center;
`;
