import styled from "styled-components";
import backgroundImage from "./../../sources/img/Flota2.jpg";
import Logo from "./../../sources/img/LogoSF.png";

export const Styles = styled.div`
  .background {
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
    /* grid-template-rows: auto auto auto; */
  }

  .container {
    display: grid;
    padding: 10px 30px;
    grid-column-gap: 15px;
    grid-row-gap: 17px;
    grid-template-columns: 200px 200px auto;
    grid-template-rows: auto auto auto;
    border-radius: 20px;

    /* background: #00bdb440;
  backdrop-filter: blur(22px); */
    background: radial-gradient(circle, #9ca3af, #00bdb2, black 155%);

    box-shadow: 10px 7px 5px rgba(0, 0, 0, 0.7);
  }

  .container > div {
    background-color: transparent;
    text-align: center;
    /* Lo siguiwente deberia quitarse; pero la imagen se llega a cortar al hacerlo  */
    padding: 10px 0px;
  }

  .element1 {
    grid-row: 1/4;
    background: url(${Logo});
    background-size: cover;
    background-position: center;
  }

  .element2 {
    grid-column: span 2;
  }

  .element3 {
    grid-column: span 2;
  }

  .element4 {
    /* Alinear horizontal y verticalmente */
    align-self: center;
    justify-self: center;
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
