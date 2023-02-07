import styled from 'styled-components';

export const Background = styled.div`
  //Se usan los 3 o se usara margin:
  display: grid;
  align-content: center; //junta los elementos vertical
  justify-content: center; //centrea los elementos
  width: 100%; //opcional para llevarlo al medio de la pantalla

  left: 0;
  top: 0;
  /* grid-template-columns: auto; */

  //Note:
  /* En vista: si eliminamos margin-top, tendremos que añadir 2 <br/> despues de <Background> */
  /* En <DialogBasic /> : ya no es necesario margin-top */
  /* margin-top: 40px; */
`;
export const HeaderContainer = styled.div`
  display: grid;
  padding: 0px 0px;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas: 'HeaderTitle';

  color: white;
  border-radius: 0px 0px 0px 0px; //en vista: 10px 10px 0px 0px; en <BasicDialog/> : 0px 0px 0px 0px;
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
  grid-template-columns: 250px 250px; //probar auto o xfr
  grid-template-rows: auto;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  padding: 15px 20px;
  //sombreado:
  border: 4px solid #051e34; //contorno
  border-radius: 0px 0px 0px 0px; //en vista: 0px 0px 10px 10px; en <BasicDialog/> : 0px 0px 0px 0px;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  grid-template-areas: 'InputNames InputSurnames' 'InputCi InputAddress' 'InputMobile InputEmail' 'InputDateOfBirdth InputSex' 'InputBranchOffice InputBranchOffice' 'InputCharge InputCharge' 'InputStatus InputStatus' 'BtnToRegistrer BtnToRegistrer';
`;

export const InputNames = styled.div`
  grid-area: InputNames;
  .input {
    width: 100%;
  }
`;
export const InputSurnames = styled.div`
  grid-area: InputSurnames;

  .input {
    width: 100%;
  }
`;

export const InputCi = styled.div`
  grid-area: InputCi;

  .input {
    width: 100%;
  }
`;

export const InputAddress = styled.div`
  grid-area: InputAddress;

  .input {
    width: 100%;
  }
`;

export const InputMobile = styled.div`
  grid-area: InputMobile;

  .input {
    width: 100%;
  }
`;

export const InputEmail = styled.div`
  grid-area: InputEmail;

  .input {
    width: 100%;
  }
`;

export const InputDateOfBirdth = styled.div`
  grid-area: InputDateOfBirdth;

  .input {
    width: 100%;
  }
`;

export const InputSex = styled.div`
  grid-area: InputSex;

  .input {
    width: 100%;
  }
`;

export const InputBranchOffice = styled.div`
  grid-area: InputBranchOffice;

  .input {
    width: 50%;
  }
`;

export const InputCharge = styled.div`
  grid-area: InputCharge;

  .input {
    width: 50%;
  }
`;

export const InputStatus = styled.div`
  grid-area: InputStatus;

  .input {
    width: 50%;
  }
`;

export const BtnToRegistrer = styled.div`
  grid-area: BtnToRegistrer;
  justify-self: center;
`;
