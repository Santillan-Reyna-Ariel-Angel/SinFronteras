import styled from "styled-components";
import backgroundImage from "./../../../sources/img/Flota2.jpg";

export const Background = styled.div`
  display: grid;
  /* position: absolute; */
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  margin-top: 40px;
  justify-content: center;
  align-content: center;
  grid-template-columns: auto;

  /* background: url(${backgroundImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover; */
  /* object-fit: contain; */
`;

export const Container = styled.form`
  display: grid;
  padding: 15px 15px;
  grid-column-gap: 5px;
  grid-template-columns: 150px 200px 150px auto;
  grid-template-rows: auto;
  border-radius: 10px;
  grid-template-areas: "Origin Destination Date BtnSearch";
  /* background: radial-gradient(circle, #9ca3af, #00bdb2, black 155%); */
  /* box-shadow: 10px 7px 5px rgba(0, 0, 0, 0.7); */

  /* color: #ffffff; */
  /* background: #ffffff2e; */
  background: #00bdb2;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  overflow: hidden;
`;

export const InputOrigin = styled.div`
  grid-area: Origin;
  .input {
    width: 100%;
  }
`;

export const InputDestination = styled.div`
  grid-area: Destination;
  .input {
    width: 100%;
  }
`;

export const InputDate = styled.div`
  grid-area: Date;
  .input {
    width: 100%;
  }
`;

export const ButtonSearch = styled.div`
  grid-area: BtnSearch;
  align-self: center;
  justify-self: center;
  .input {
    width: 100%;
  }
`;
