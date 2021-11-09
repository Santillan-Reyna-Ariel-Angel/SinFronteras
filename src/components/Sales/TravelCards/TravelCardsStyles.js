import styled from 'styled-components';

export const Background = styled.div`
  /* height: 100%; */
  left: 0;
  top: 0;
  margin-top: 40px;
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
`;

export const ContainerCardBody = styled.div`
  display: grid;
  padding: 10px 10px;
  grid-template-areas: 'Bus TextDepartureTime BtnSeeBus' 'TypeOfBus DepartureTime BtnSeeBus';
  grid-template-rows: auto;

  border-radius: 0px 0px 10px 10px;
  background: #00bdb2;
  /* background: rgb(102, 157, 246); */
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  overflow: hidden;
`;

export const BusStyle = styled.div`
  grid-area: Bus;
  align-self: center;
  justify-self: center;
`;

export const TextDepartureTimeStyle = styled.div`
  grid-area: TextDepartureTime;
  padding: 0px 15px;
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
