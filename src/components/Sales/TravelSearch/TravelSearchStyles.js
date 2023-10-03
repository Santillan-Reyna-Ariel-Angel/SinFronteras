import styled from 'styled-components';

export const Background = styled.div`
  left: 0;
  top: 0;
  margin-top: 20px;
`;

export const Container = styled.form`
  display: grid;
  padding: 15px 15px;
  grid-column-gap: 5px;
  grid-template-columns: 200px 200px 150px;
  grid-template-rows: auto;
  border: 4px solid #051e34; //contorno
  border-radius: 10px;
  grid-template-areas: 'Origin Destination Date';

  /* background: #ffffff2e; */
  background: #00bdb2;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  overflow: hidden;

  @media screen and (max-width: 768px) {
    padding: 12px 10px;
    grid-row-gap: 10px;
    grid-column-gap: 0px;
    grid-template-columns: 175px;
    grid-template-areas:
      'Origin'
      'Destination'
      'Date';
  }
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
