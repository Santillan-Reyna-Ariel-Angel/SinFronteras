import styled from 'styled-components';

export const Background = styled.div`
  left: 0;
  top: 0;
  /* bottom: 0; */
  margin-top: 40px;
  max-width: fit-content;
  min-width: fit-content;
`;

export const Container = styled.div`
  display: grid;
  padding: 0px 0px;
  grid-template-columns: auto;
  grid-template-rows: auto;
  border-radius: 10px 10px 10px 0px;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  /* overflow: hidden; */
`;
