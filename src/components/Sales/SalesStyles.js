import styled from 'styled-components';

export const Background = styled.div`
  //Se usan los 3 o se usara margin:
  /* display: grid; */ // si ponemos display: grid; se centrea
  align-content: center; //junta los elementos vertical
  justify-content: center; //centrea los elementos
  //new:
  /* align-items: center; */

  width: 100%; //opcional para llevarlo al medio de la pantalla
  left: 0;
  top: 0;
  /* grid-template-columns: auto; */
`;
export const HeaderContainer = styled.div`
  display: grid;
  padding: 0px 0px;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas: 'HeaderTitle';

  color: white;
  border-radius: 10px 10px 0px 0px; //en vista: 10px 10px 0px 0px; en <BasicDialog/> : 0px 0px 0px 0px;
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

export const BodyContainer = styled.form`
  display: grid;
  background-color: #00bdb2;
  grid-template-columns: 250px; //  o  probar auto o xfr
  grid-template-rows: auto;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  padding: 15px 20px;
  //sombreado:
  border: 4px solid #051e34; //contorno
  border-radius: 0px 0px 10px 10px; //en vista: 0px 0px 10px 10px; en <BasicDialog/> : 0px 0px 0px 0px;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  grid-template-areas: 'PasswordIconStyle' 'CurrentPassword' 'NewPassword' 'ConfirmNewPassword' 'BtnRegistrer';
`;
