import styled from "styled-components";
import backgroundImage from "./../../sources/img/Flota2.jpg";
import Logo from "./../../sources/img/LogoSF.png";

/* Colores:
Primarios: #00bdb2 (1ra opcion) - #14c7dd (2da opcion)
Secundarios: #9ca3af (1ra opcion) - #dbdef1(2da opcion)*/

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

  justify-content: center;
  align-content: center;

  grid-template-columns: auto;
`;

export const Container = styled.div`
  display: grid;
  padding: 25px 30px;
  grid-column-gap: 15px;
  grid-row-gap: 17px;
  grid-template-columns: 160px 200px auto;
  grid-template-rows: auto auto auto;
  border-radius: 20px;
  grid-template-areas:
    "Logo InputUser InputUser"
    "Logo InputP InputP" "Logo RecoverPassword Button";
  /* background: #00bdb440;
  backdrop-filter: blur(22px); */
  background: radial-gradient(circle, #9ca3af, #00bdb2, black 155%);

  box-shadow: 10px 7px 5px rgba(0, 0, 0, 0.7);

  @media screen and (max-width: 768px) {
    grid-column-gap: 20px;
    grid-template-columns: 1fr 100px;
    grid-template-rows: repeat(4, 1fr);

    grid-template-areas:
      "Logo Logo"
      "InputUser InputUser"
      "InputP InputP"
      "RecoverPassword Button";
  }
`;

export const ContainerLogo = styled.div`
  grid-area: Logo;
  background: url(${Logo});
  background-position: center;
  object-fit: cover;
  background-size: contain;
  background-repeat: no-repeat;
  @media screen and (max-width: 768px) {
    /* background-size: cover; */
  }
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
  /* Alinear al centro verticalmente */
  align-self: center;
  /* Alinear al centro horizontal  */
  /* justify-self: center; */

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
  .buttonEnter {
    /* background-color: #9ca3af; */
  }

  @media screen and (max-width: 768px) {
    align-self: center;
    justify-self: center;
  }
`;
