import styled from 'styled-components';

export const Background = styled.div`
  display: grid;
  left: 0;
  top: 0;
  justify-content: center; //centrea los elementos
  /* align-content: center; //junta los elementos vertical */
  /* grid-template-columns: auto; */
`;
export const HeaderContainer = styled.div`
  display: grid;
  padding: 0px 0px;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas: 'HeaderTitle';

  color: white;
  border-radius: 10px 10px 0px 0px;
  background: #051e34;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  overflow: hidden;
`;

export const HeaderTitle = styled.div`
  grid-area: HeaderTitle;
  text-align: center;
  padding: 5px 0px;
  font-size: larger;
`;

export const BodyContainer = styled.div`
  display: grid;
  background-color: #00bdb2;
  grid-template-columns: 170px 170px;
  grid-template-rows: auto;
  grid-row-gap: 15px;
  grid-column-gap: 10px;
  padding: 15px 20px;
  //sombreado:
  border: 4px solid #051e34; //contorno
  border-radius: 0px 0px 10px 10px;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  grid-template-areas: 'DptOriginStyle LocOriginStyle' 'TravelDateStyle DepartureTimeStyle' 'DptDestinationStyle LocDestinationStyle' 'BusEnrollmentStyle BusEnrollmentStyle' 'IdNumberDriverStyle IdNumberDriverStyle' 'LaneStyle LaneStyle' 'Btn Btn';
  /* overflow: hidden; */
`;

export const DptOriginStyle = styled.div`
  grid-area: DptOriginStyle;
  .input {
    width: 100%;
  }
`;

export const LocOriginStyle = styled.div`
  grid-area: LocOriginStyle;
  .input {
    width: 100%;
  }
`;

export const TravelDateStyle = styled.div`
  grid-area: TravelDateStyle;
  .input {
    width: 100%;
  }
`;

export const DepartureTimeStyle = styled.div`
  grid-area: DepartureTimeStyle;
  .input {
    width: 100%;
  }
`;

export const DptDestinationStyle = styled.div`
  grid-area: DptDestinationStyle;
  .input {
    width: 100%;
  }
`;

export const LocDestinationStyle = styled.div`
  grid-area: LocDestinationStyle;
  .input {
    width: 100%;
  }
`;

export const BusEnrollmentStyle = styled.div`
  grid-area: BusEnrollmentStyle;
  .input {
    width: 50%;
  }
`;

export const IdNumberDriverStyle = styled.div`
  grid-area: IdNumberDriverStyle;
  .input {
    width: 100%;
  }
`;

export const LaneStyle = styled.div`
  grid-area: LaneStyle;
  .input {
    width: 50%;
  }
`;

export const Btn = styled.div`
  grid-area: Btn;
  justify-self: center;
`;

// export const ServicesText = styled.div`
//   grid-area: ServicesText;
//   text-align: center;
//   font-size: larger;
//   font-weight: bold;
// `;

// export const NumberOfFloorsText = styled.div`
//   grid-area: NumberOfFloorsText;
//   text-align: center;
//   font-size: larger;
//   font-weight: bold;
// `;
