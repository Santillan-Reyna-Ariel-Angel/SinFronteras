import styled from "styled-components";

import backgroundImage from "./../../../sources/img/background.jpg";

export const ContainerLogin = styled.div`
  position: absolute;
  display: grid;
  width: 100%;
  left: 0;
  top: 0;
  min-height: 100vh;

  background: url(${backgroundImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  grid-template-columns: 500px;
  grid-template-rows: auto;

  justify-content: center;
  align-content: center;
  grid-template-areas: "loginForm";

  @media screen and (max-width: 600px) {
    grid-template-columns: 0.8fr;
    grid-template-rows: 300px;
  }
`;

export const Form = styled.form`
  position: relative;
  color: #ffffff;
  grid-area: loginForm;

  display: grid;
  grid-template-columns: 0.8fr;
  grid-template-rows: repeat(4, 1fr);

  grid-gap: 1rem;

  justify-content: center;

  padding: 10px 0 10px 0;

  background: #ffffff2e;
  backdrop-filter: blur(18px);

  p {
    font-size: 17px;
  }

  input {
    padding: 8px;
    border: 0;
    border-bottom: 3px solid #a0cdf3;
    outline: none;
    background: transparent;
    color: #ffffff;
  }

  border-radius: 10px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);

  overflow: hidden;
`;

export const ContainerButtonSubmit = styled.div`
  display: grid;
  grid-template-columns: auto 150px;

  button {
    border: 0;
    border-radius: 30px;
    color: #ffffff;
    background: #a0cdf3;
    cursor: pointer;
  }
  a {
    color: #ffffff !important;
  }

  @media screen and (max-width: 600px) {
    
    grid-template-columns: auto;
    grid-template-rows: repeat(2, auto);

    a {
      text-align: center;
      text-decoration: none;
    }
  }
`;
