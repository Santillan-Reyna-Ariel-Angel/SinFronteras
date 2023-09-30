import styled from 'styled-components';
import backgroundImage from './../../sources/img/Flota2.jpg';
import Logo from './../../sources/img/LogoSF2.png';

export const Background = styled.div`
  display: grid;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  background: url(${backgroundImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  /* object-fit: contain; */
  justify-content: center;
  align-content: center;

  grid-template-columns: auto;
`;

export const Container = styled.form`
  display: grid;
  padding: 25px 30px;
  grid-column-gap: 15px;
  grid-row-gap: 17px;
  grid-template-columns: 160px 200px auto;
  grid-template-rows: auto auto auto;
  border-radius: 20px;
  grid-template-areas:
    'Logo InputUser InputUser'
    'Logo InputP InputP' 'Logo RecoverPassword Button';
  /* background: #00bdb440;
  backdrop-filter: blur(22px); */
  background: radial-gradient(circle, #9ca3af, #00bdb2, black 155%);

  box-shadow: 10px 7px 5px rgba(0, 0, 0, 0.7);

  @media screen and (max-width: 768px) {
    grid-column-gap: 20px;
    grid-template-columns: 180px 100px;
    grid-template-rows: 160px 1fr 1fr auto;
    padding: 10px 15px;

    grid-template-areas:
      'Logo Logo'
      'InputUser InputUser'
      'InputP InputP'
      'RecoverPassword Button';
  }

  @media screen and (max-width: 360px) {
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    grid-template-columns: 120px 120px;
    grid-template-rows: 100px 1fr 1fr auto;
    padding: 10px 15px;

    grid-template-areas:
      'Logo Logo'
      'InputUser InputUser'
      'InputP InputP'
      'RecoverPassword Button';
  }
`;

export const ContainerLogo = styled.div`
  grid-area: Logo;
  background: url(${Logo});
  background-position: center;
  object-fit: cover;
  background-size: contain;
  background-repeat: no-repeat;
`;

export const InputUser = styled.div`
  grid-area: InputUser;

  .input {
    width: 100%;
  }
`;

export const InputPassword = styled.div`
  grid-area: InputP;
  .input {
    width: 100%;
  }
`;
export const TextRecoverPassword = styled.div`
  grid-area: RecoverPassword;
  align-self: center;

  .link {
    color: red;
    font-weight: bold;
    text-decoration: none;
  }

  .link:hover {
    color: #c2510b;
  }
`;

export const ButtonEnter = styled.div`
  grid-area: Button;
  .link {
    text-decoration: none;
  }
  //Color del Boton:
  /* .buttonEnter {
    background-color: #ef3e2e;
  } */
  @media screen and (max-width: 768px) {
    align-self: center;
    justify-self: center;
  }
`;
