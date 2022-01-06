import styled from "styled-components";

export const Background = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  justify-content: center;
  align-content: center;

  grid-template-columns: auto;
`;

export const Container = styled.form`
  display: grid;
  background-color: #00bdb2;
  /* background: radial-gradient(circle, #9ca3af, #00bdb2, black 155%); */
  grid-template-columns: 250px 250px;
  grid-template-rows: auto;
  grid-row-gap: 15px;
  grid-column-gap: 10px;
  padding: 15px 25px;
  border-radius: 20px;
  grid-template-areas: "InputNames InputSurnames" "InputCi InputAddress" "InputMobile InputEmail" "InputDateOfBirdth InputSex" "InputBranchOffice InputBranchOffice" "InputCharge InputCharge" "InputStatus InputStatus" "BtnToRegistrer BtnToRegistrer";
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
