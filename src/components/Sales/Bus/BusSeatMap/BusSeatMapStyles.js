import styled from 'styled-components';
import Bus from './../ContornosX.png';
import Driver4 from '../../../../sources/img/bus/driver4-v2.png';

export const Background = styled.div`
  width: max-content; //50px
  height: max-content; //150px,max-content,fit-content
  /* height: 200px; */
  left: 0;
  top: 0;

  /* background: url(${Bus}); */
  background-size: contain;
  background-repeat: no-repeat;
  border: 4px solid #051e34; //contorno del bus
  border-radius: 15px;

  // *Opciones Claros:rgba(71, 98, 130, 0.2) || rgb(102, 157, 246) || rgba(255,255,255,0.8) || rgba(255,255,255,0.5) || fuertes: rgb(5, 30, 52)
  background-color: rgba(102, 157, 246, 0.5);
`;

export const Container = styled.div`
  display: grid;
  width: auto;
  padding: 0px 0px 0px 0px; // separa los el conductor y asientos del contorno del bus
  margin: 0px 0px 4px 0px;

  grid-template-columns: 50px auto;
  grid-template-rows: auto auto auto auto auto;
  grid-template-areas: 'Copilot TopSeats' 'Copilot TopSeatsCenter' 'Copilot Hall' 'Driver ButtomSeatsCenter' 'Driver ButtomSeats';

  @media screen and (max-width: 768px) {
    margin: 0px 4px 4px -8px;
  }
`;

export const CopilotStyled = styled.div`
  grid-area: Copilot;
  /* background-color: gray; */
`;

export const DriverStyled = styled.div`
  grid-area: Driver;
  background: url(${Driver4});
  /* background-size: 'contain'; //cover */
  background-repeat: no-repeat; // impedimos que se repita la imagen
  background-position: center center; //centreamos horizontal y verticalmente
  transform: scale(0.7) rotate(90deg);

  @media screen and (max-width: 768px) {
    transform: scale(0.5) rotate(90deg);
  }
`;

export const ContainerTopSeats = styled.div`
  grid-area: TopSeats;
  margin-bottom: -10px;
  //:last-child para el ultimo elemento
  @media screen and (max-width: 768px) {
    margin-bottom: -12px;
    margin-left: -10px;
  }
`;

export const ContainerTopSeatsCenter = styled.div`
  grid-area: TopSeatsCenter;
  margin-bottom: -10px;
  //:last-child para el ultimo elemento
  @media screen and (max-width: 768px) {
    margin-bottom: -12px;
    margin-left: -10px;
  }
`;

export const ContainerHall = styled.div`
  grid-area: Hall;
  height: 30px;
  /* background-color: gray; */

  @media screen and (max-width: 768px) {
    height: 20px;
  }
`;

export const ContainerButtomSeatsCenter = styled.div`
  grid-area: ButtomSeatsCenter;
  margin-bottom: -10px;
  @media screen and (max-width: 768px) {
    margin-bottom: -12px;
    margin-left: -10px;
  }
`;
export const ContainerButtomSeats = styled.div`
  grid-area: ButtomSeats;
  margin-bottom: -10px;
  @media screen and (max-width: 768px) {
    margin-bottom: -12px;
    margin-left: -10px;
  }
`;
