import styled from 'styled-components';
import Bus from './../ContornosX.png';

export const Background = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  margin-top: 40px;
  background: url(${Bus});
  background-size: contain;
  background-repeat: no-repeat;
`;

export const Container = styled.div`
  width: auto;
  padding: 2px 0px 2px 60px;

  /* grid-template-rows: auto auto auto auto; */
  /* grid-template-areas: 'RightWindowSeat' 'Halls' 'AisleSeat' 'LeftWindowSeat'; */

  grid-template-rows: auto 50px auto auto;
  grid-template-areas: 'RightWindowSeat' 'empty' 'AisleSeat' 'LeftWindowSeat';
  grid-template-columns: auto;
`;
export const Empty = styled.div`
  grid-area: empty;
  height: 50px;
`;

export const ContainerTopSeats = styled.div`
  grid-area: RightWindowSeat;
`
export const ContainerCenterSeats = styled.div`
  grid-area: AisleSeat;
`
export const ContainerButtomSeats = styled.div`
  grid-area: LeftWindowSeat;
`

// export const HallsStyled = styled.div`
//   grid-area: Halls;
//   margin-bottom: 20px;
// `;

// export const RightWindowSeatStyled = styled.div`
//   grid-area: RightWindowSeat;
//   margin-bottom: 20px;
// `;
