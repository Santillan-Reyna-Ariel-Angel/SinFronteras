import styled from 'styled-components';
import Logo from './../../../../sources/img/LogoSF2.png';

export const Background = styled.div`
  display: grid;
  left: 0;
  top: 0;
  justify-content: center; //centrea los elementos
  /* align-content: center; //junta los elementos vertical */
  /* grid-template-columns: auto; */
  padding: 5px 0px; // o margin: 5px 0px;
`;

export const BodyContainer = styled.div`
  display: grid;
  /* background-color: #00bdb2; */
  grid-template-columns: 170px 170px;
  grid-template-rows: auto;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  padding: 10px 15px;
  //sombreado:
  border: 4px solid #051e34; //contorno
  border-radius: 0px;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  grid-template-areas: 'LogoContainer GeneralInformation' 'Route Route' 'PassengerInformation BusInformation' 'Legend Legend';
  /* overflow: hidden; */
`;

export const LogoContainer = styled.div`
  display: grid;
  grid-area: LogoContainer;
  grid-template-columns: auto;
  grid-template-rows: 1fr;
  grid-template-areas: 'LogoPng' 'CompanyName';
  grid-row-gap: 0px;
`;

export const LogoPng = styled.div`
  grid-area: LogoPng;
  height: 100px;
  background: url(${Logo});
  background-position: center;
  object-fit: cover;
  background-size: contain;
  background-repeat: no-repeat;
`;
export const CompanyName = styled.div`
  grid-area: CompanyName;
  text-align: center;
  font-size: large;
  font-weight: bold;
`;

export const GeneralInformation = styled.div`
  grid-area: GeneralInformation;
  p {
    margin: 0px;
  }
  span {
    font-weight: bold;
  }
`;

export const Route = styled.div`
  grid-area: Route;
  text-align: center;
  font-size: x-large;
  font-weight: bold;
`;

export const PassengerInformation = styled.div`
  grid-area: PassengerInformation;
  p {
    margin: 0px;
  }
  span {
    font-weight: bold;
  }
`;

export const BusInformation = styled.div`
  grid-area: BusInformation;
  /* text-align: center; */
  p {
    margin: 0px;
  }
  span {
    font-weight: bold;
  }
  .seat {
    font-size: xx-large;
    font-weight: bold;
    text-align: center;
  }
  .typeSeat {
    text-align: center;
  }
  .price {
    margin-top: 17px;
    /* vertical-align: bottom; */
    /* display: flex;
    flex-wrap: wrap;
    align-content: flex-end; */
    /* display: flex;
    align-items: flex-end; */
    /* display: flex;
    align-items: center;
    align-self: flex-end; */
  }
`;

export const Legend = styled.div`
  grid-area: Legend;
  text-align: center;
  font-weight: bold;
  p {
    margin: 0px;
  }
`;
