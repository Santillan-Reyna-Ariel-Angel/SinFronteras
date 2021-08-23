import styled from "styled-components";
import Fondo from "./../../sources/img/Flota2.jpg";

export const Background = styled.div`
  position: absolute;
  display: grid;
  /* background: green; */
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  background: url(${Fondo});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  justify-content: center;
  align-content: center;

  grid-template-columns: 500px;
  grid-template-rows: auto auto auto;
`;

export const Form = styled.form`
  /* position: relative; */
  .Container {
    /* height: 500px;
    width: 700px; */
    display: grid;
    background-color: red;
    padding: 10px;
    grid-gap: 5px;

    grid-template-columns: 4fr 6fr;
    /* grid-template-rows: 1fr 1fr 1fr; */
  }

  .Container > div {
    background: white;
    text-align: center;
    padding: 10px;
  }

  .Container div .Element1 {
    grid-row: 1/ 1 / span 2 / span 1;
  }
`;

export const Form2 = styled.div`
  .container {
    display: grid;
    background-color: red;
    padding: 15px;
    grid-gap: 5px;
    grid-template-columns: auto auto auto;
  }

  .container > div {
    background-color: aqua;
    text-align: center;
    padding: 10px;
  }

  .element1 {
    grid-row: 1/4;
  }

  .element2 {
    grid-column: span 2;
  }

  .element3 {
    grid-column: span 2;
  }
`;
