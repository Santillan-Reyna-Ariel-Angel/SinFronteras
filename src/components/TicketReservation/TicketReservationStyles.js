import styled from 'styled-components';

export const Background = styled.div`
  display: grid;

  align-content: start; //center
  margin-top: 10%;

  justify-content: center; //centrea los elementos
  width: 100%; //opcional para llevarlo al medio de la pantalla

  left: 0;
  top: 0;

  /* En <DialogBasic /> : ya no es necesario margin-top */
`;
export const HeaderContainer = styled.div`
  display: grid;
  padding: 0px 0px;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas: 'HeaderTitle';

  color: white;
  border-radius: 10px 10px 0px 0px; //en vista: 10px 10px 0px 0px; en <BasicDialog/> : 0px 0px 0px 0px;
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

export const BodyContainer = styled.form`
  display: grid;
  background-color: #00bdb2;
  grid-template-columns: 340px; //  o  probar auto o xfr
  grid-template-rows: auto;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  padding: 15px 20px;
  //sombreado:
  border: 4px solid #051e34; //contorno
  border-radius: 0px 0px 10px 10px; //en vista: 0px 0px 10px 10px; en <BasicDialog/> : 0px 0px 0px 0px;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  grid-template-areas: 'Travels' 'Seats' 'BuyerId' 'FullNameBuyer' 'Btn';

  @media screen and (max-width: 768px) {
    /* grid-template-columns: 200px; //  o  probar auto o xfr */
    /* padding: 10px 15px; */
  }
`;

export const Travels = styled.div`
  grid-area: Travels;

  .input {
    width: 100%;
  }
`;

export const Seats = styled.div`
  grid-area: Seats;

  .input {
    width: 100%;
  }
`;

export const BuyerId = styled.div`
  grid-area: BuyerId;
`;

export const FullNameBuyer = styled.div`
  grid-area: FullNameBuyer;
`;
export const Btn = styled.div`
  grid-area: Btn;
  justify-self: center;
`;
