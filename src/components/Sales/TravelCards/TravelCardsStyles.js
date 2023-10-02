import styled from 'styled-components';

export const Background = styled.div`
  left: 0;
  top: 0;
  max-width: fit-content;
  min-width: fit-content;

  @media screen and (max-width: 768px) {
    max-width: 222px;
    min-width: fit-content;
  }
`;

export const Container = styled.div`
  display: grid;
  padding: 0px 0px;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas: 'Route';

  color: white;
  border-radius: 10px 10px 0px 0px;
  background: #051e34;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  overflow: hidden;
`;

export const RouteStyle = styled.div`
  grid-area: Route;
  text-align: center;
  padding: 5px 0px;
  font-size: larger;

  @media screen and (max-width: 768px) {
    padding: 0px 0px; // controla el padig del titulo de la tarjeta
  }
`;

export const ContainerCardBody = styled.div`
  display: grid;
  padding: 10px 10px;
  grid-template-areas: 'Bus TextDepartureTime BtnSeeBus' 'TypeOfBus DepartureTime BtnSeeBus';
  grid-template-rows: auto;

  border: 4px solid #051e34; //contorno
  border-radius: 0px 0px 10px 10px;
  background: #00bdb2;
  /* background: rgb(102, 157, 246); */
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  overflow: hidden;

  @media screen and (max-width: 768px) {
    padding: 3px 5px; // controla el padding del cuerpo de la tarjeta
  }
`;

export const BusStyle = styled.div`
  grid-area: Bus;
  align-self: center;
  justify-self: center;
`;

export const TextDepartureTimeStyle = styled.div`
  grid-area: TextDepartureTime;
  padding: 0px 8px;
  align-self: center;
  justify-self: center;
  div {
    display: flex;
    align-items: center;
  }
`;
export const BtnSeeBusStyle = styled.div`
  grid-area: BtnSeeBus;
  align-self: center;
  justify-self: center;
`;
export const TypeOfBusStyle = styled.div`
  grid-area: TypeOfBus;
  /* align-self: center;
  justify-self: center; */
  text-align: center;
`;
export const DepartureTimeStyle = styled.div`
  grid-area: DepartureTime;
  /* align-self: center;
  justify-self: center; */
  text-align: center;
`;
