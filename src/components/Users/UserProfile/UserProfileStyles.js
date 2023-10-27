import styled from 'styled-components';
import ProfileIcon from './../../../sources/img/usuario-multiple.png'; //../../sources/img/LogoSF2.png

export const Background = styled.div`
  //Se usan los 3 o se usara margin:
  display: grid;
  /* align-content: center; //junta los elementos vertical */
  align-content: start;
  margin-top: 10%;

  justify-content: center; //centrea los elementos
  width: 100%; //opcional para llevarlo al medio de la pantalla

  left: 0;
  top: 0;
  /* grid-template-columns: auto; */

  //Note:
  /* En vista: si eliminamos margin-top, tendremos que añadir 2 <br/> despues de <Background> */
  /* En <DialogBasic /> : ya no es necesario margin-top */
  /* margin-top: 20px; */

  //New:
  /* display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  width: 100%;
  left: 0;
  top: 0;
  margin-top: 5%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center; */
`;
export const HeaderContainer = styled.div`
  display: grid;
  /* padding: 0px 0px; */
  padding: 0px 10% 0px 10%;
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
  grid-template-columns: 130px 200px; //  250px 250px  o  probar auto o xfr
  grid-template-rows: auto;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  padding: 15px 20px;
  //sombreado:
  border: 4px solid #051e34; //contorno
  border-radius: 0px 0px 10px 10px; //en vista: 0px 0px 10px 10px; en <BasicDialog/> : 0px 0px 0px 0px;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  grid-template-areas: 'ProfileIconStyle ProfileIconStyle' 'FullNameAndChargeText FullNameAndChargeText' 'InputCi InputAddress' 'InputMobile InputEmail' 'BtnRegistrer BtnRegistrer';

  @media screen and (max-width: 768px) {
    grid-template-columns: 190px; //o  probar auto o xfr
    grid-column-gap: 0px;
    padding: 15px 15px 10px 15px;
    grid-template-areas: 'ProfileIconStyle ' 'FullNameAndChargeText' 'InputCi' ' InputAddress' 'InputMobile' ' InputEmail' ' BtnRegistrer';
  }
`;

export const ProfileIconStyle = styled.div`
  grid-area: ProfileIconStyle;
  width: 90px;
  height: 90px;
  margin: -15px auto; /* Centra horizontalmente */
  //text-align: center; /* Centra verticalmente */
  background: url(${ProfileIcon});
  background-position: center;
  object-fit: cover;
  background-size: contain;
  background-repeat: no-repeat;
`;

export const FullNameAndChargeText = styled.div`
  grid-area: FullNameAndChargeText;
  text-align: center;
  font-size: larger;
  font-weight: bold;
`;

export const InputCi = styled.div`
  grid-area: InputCi;

  .input {
    width: 100%;
  }
`;

export const InputAddress = styled.div`
  grid-area: InputAddress;

  .input {
    width: 100%;
  }
`;

export const InputMobile = styled.div`
  grid-area: InputMobile;

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

export const BtnRegistrer = styled.div`
  grid-area: BtnRegistrer;
  justify-self: center;
`;
