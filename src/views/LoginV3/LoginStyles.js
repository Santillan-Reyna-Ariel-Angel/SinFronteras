import styled from "styled-components";
import backgroundImage from "./../../sources/img/Flota2.jpg";
import Logo from "./../../sources/img/LogoSF.png";

export const Styles = styled.div`
  .container {
    display: grid;
    padding: 10px 30px;
    grid-column-gap: 15px;
    grid-row-gap: 17px;
    grid-template-columns: 200px 200px auto;
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
      grid-template-columns: 1fr 100px;
      grid-template-rows: repeat(4, 1fr);

      grid-template-areas:
        "Logo Logo"
        "InputUser InputUser"
        "InputP InputP"
        "RecoverPassword Button";
    }
  }

  .container > div {
    background-color: transparent;
    text-align: center;
    /* Lo siguiwente deberia quitarse; pero la imagen se llega a cortar al hacerlo  */
    padding: 10px 0px;
  }

  .element1 {
    /* grid-row: 1/4; */
    grid-area: Logo;
    background: url(${Logo});
    background-size: cover;
    background-position: center;
  }

  .element2 {
    /* grid-column: span 2; */
    grid-area: InputUser;
  }

  .element3 {
    /* grid-column: span 2;
     */
    grid-area: InputP;
  }

  .element4 {
    /* Alinear horizontal y verticalmente */
    grid-area: RecoverPassword;
    align-self: center;
    justify-self: center;
  }

  .element5 {
    grid-area: Button;
  }
  .link {
    color: red;
    font-weight: bold;
    text-decoration: none;
  }
  .link:hover {
    color: #c2510b;
  }

  .input {
    width: 100%;
  }
`;

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
  /* :hover{
    ....
  } */
  /* grid-template-rows: auto auto auto; */
`;
