import styled from 'styled-components';
import PasswordIcon from './../../../sources/img/password-icon.png'; //../../sources/img/LogoSF2.png

export const Background = styled.div`
  //Se usan los 3 o se usara margin:
  display: grid;
  align-content: center; //junta los elementos vertical
  justify-content: center; //centrea los elementos
  width: 100%; //opcional para llevarlo al medio de la pantalla

  left: 0;
  top: 0;
  /* grid-template-columns: auto; */

  //Note:
  /* En vista: si eliminamos margin-top, tendremos que añadir 2 <br/> despues de <Background> */
  /* En <DialogBasic /> : ya no es necesario margin-top */
  /* margin-top: 40px; */
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
  grid-template-columns: 210px; //  o  probar auto o xfr
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

  @media screen and (max-width: 768px) {
    grid-template-columns: 200px; //  o  probar auto o xfr
    padding: 10px 15px;
  }
`;

export const PasswordIconStyle = styled.div`
  grid-area: PasswordIconStyle;
  width: 90px;
  height: 90px;
  margin: -15px auto 0px auto; /* Centra horizontalmente */
  //text-align: center; /* Centra verticalmente */
  background: url(${PasswordIcon});
  background-position: center;
  object-fit: cover;
  background-size: contain;
  background-repeat: no-repeat;
`;

export const CurrentPassword = styled.div`
  grid-area: CurrentPassword;

  .input {
    width: 100%;
  }
`;

export const NewPassword = styled.div`
  grid-area: NewPassword;

  .input {
    width: 100%;
  }
`;

export const ConfirmNewPassword = styled.div`
  grid-area: ConfirmNewPassword;

  .input {
    width: 100%;
  }
`;

export const BtnRegistrer = styled.div`
  grid-area: BtnRegistrer;
  justify-self: center;
`;
