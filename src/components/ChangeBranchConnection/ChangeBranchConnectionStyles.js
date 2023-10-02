import styled from 'styled-components';

export const Background = styled.div`
  display: grid;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  align-content: center; //junta los elementos vertical
  justify-content: center; //centrea los elementos orizontalmente
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

  @media screen and (max-width: 768px) {
    grid-template-columns: 250px;
    justify-content: center;
  }
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
  grid-template-columns: 300px;
  grid-template-rows: auto;
  grid-row-gap: 15px;
  grid-column-gap: 10px;
  padding: 15px 20px;
  //sombreado:
  border: 4px solid #051e34; //contorno
  border-radius: 0px 0px 10px 10px;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  grid-template-areas: 'CurrentConnectionText' 'ChangeConnectionText' 'ChangeConnectionStyle' 'Btn';
  /* overflow: hidden; */

  @media screen and (max-width: 768px) {
    grid-template-columns: 250px;
  }
`;

export const CurrentConnectionText = styled.div`
  grid-area: CurrentConnectionText;
  text-align: center;
  font-size: larger;
  /* font-weight: bold; */
`;

export const ChangeConnectionText = styled.div`
  grid-area: ChangeConnectionText;
  /* text-align: center; */
  font-size: larger;
  /* font-weight: bold; */
`;

export const ChangeConnectionStyle = styled.div`
  grid-area: ChangeConnectionStyle;
  .input {
    width: 100%;
  }
`;

export const Btn = styled.div`
  grid-area: Btn;
  justify-self: center;
`;
