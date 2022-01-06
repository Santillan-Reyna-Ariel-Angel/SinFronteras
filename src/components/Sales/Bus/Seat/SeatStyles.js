import styled from 'styled-components';
import Bus from './../ContornosX.png';
import Driver4 from '../../../../sources/img/bus/driver4.png';

export const Background = styled.div`
  width: max-content; //50px
  height: max-content; //150px,max-content,fit-content
  /* height: 200px; */
  left: 0;
  top: 0;
  margin-top: 40px;
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
  padding: 0px 10px 4px 3px;

  /* grid-template-rows: auto auto auto auto; */
  /* grid-template-areas: 'RightWindowSeat' 'Halls' 'AisleSeat' 'LeftWindowSeat'; */

  grid-template-columns: 70px auto;
  grid-template-rows: auto auto auto auto auto;
  grid-template-areas: 'Copilot TopSeats' 'Copilot TopSeatsCenter' 'Copilot Hall' 'Driver ButtomSeatsCenter' 'Driver ButtomSeats';
`;

export const CopilotStyled = styled.div`
  grid-area: Copilot;
  /* background-color: gray; */
`;

export const DriverStyled = styled.div`
  grid-area: Driver;
  margin-left: -20px;
  background: url(${Driver4});
  /* background-size: 'contain'; //cover */
  background-repeat: 'no-repeat';
  /* background-position: 'center'; */
  /* object-fit: 'cover'; */
  transform: scale(0.5) rotate(90deg);

  /* background-color: gray; */
`;

export const ContainerTopSeats = styled.div`
  grid-area: TopSeats;
  margin-left: -20px;
  //:last-child para el ultimo elemento
`;

export const ContainerTopSeatsCenter = styled.div`
  grid-area: TopSeatsCenter;
  margin-left: -20px;
  //:last-child para el ultimo elemento
`;

export const ContainerHall = styled.div`
  grid-area: Hall;
  height: 25px;
  margin-left: -20px;
  /* background-color: gray; */
`;

export const ContainerButtomSeatsCenter = styled.div`
  grid-area: ButtomSeatsCenter;
  margin-left: -20px;
`;
export const ContainerButtomSeats = styled.div`
  grid-area: ButtomSeats;
  margin-left: -20px;
`;

// export const HallsStyled = styled.div`
//   grid-area: Halls;
//   margin-bottom: 20px;
// `;

// export const RightWindowSeatStyled = styled.div`
//   grid-area: RightWindowSeat;
//   margin-bottom: 20px;
// `;
