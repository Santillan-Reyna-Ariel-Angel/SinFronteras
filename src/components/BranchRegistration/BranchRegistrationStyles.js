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
  grid-template-columns: 200px 200px; //170px 170px
  grid-template-rows: auto;
  grid-row-gap: 15px;
  grid-column-gap: 10px;
  padding: 15px 20px;
  //sombreado:
  border: 4px solid #051e34; //contorno
  border-radius: 0px 0px 10px 10px;
  backdrop-filter: blur(18px);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
  grid-template-areas: 'DepartmentStyle LocalityStyle' 'TerminalStyle AddressStyle' 'BranchNameStyle BranchNumberStyle' 'AttentionScheduleText AttentionScheduleText' 'OpeningTimeStyle ClosingTimeStyle' 'BranchContactNumbersText BranchContactNumbersText' 'TelephoneStyle CellphoneStyle' 'Btn Btn';
  /* overflow: hidden; */
`;

export const DepartmentStyle = styled.div`
  grid-area: DepartmentStyle;
  .input {
    width: 100%;
  }
`;

export const LocalityStyle = styled.div`
  grid-area: LocalityStyle;
  .input {
    width: 100%;
  }
`;

export const TerminalStyle = styled.div`
  grid-area: TerminalStyle;
  .input {
    width: 100%;
  }
`;

export const AddressStyle = styled.div`
  grid-area: AddressStyle;
  .input {
    width: 100%;
  }
`;

export const BranchNameStyle = styled.div`
  grid-area: BranchNameStyle;
  .input {
    width: 100%;
  }
`;

export const BranchNumberStyle = styled.div`
  grid-area: BranchNumberStyle;
  .input {
    width: 100%;
  }
`;

export const AttentionScheduleText = styled.div`
  grid-area: AttentionScheduleText;
  /* justify-self: center; */
  text-align: center;
  /* padding: 5px 0px; */
  font-size: larger;
`;

export const OpeningTimeStyle = styled.div`
  grid-area: OpeningTimeStyle;
  .input {
    width: 100%;
  }
`;

export const ClosingTimeStyle = styled.div`
  grid-area: ClosingTimeStyle;
  .input {
    width: 100%;
  }
`;

export const BranchContactNumbersText = styled.div`
  grid-area: BranchContactNumbersText;

  /* justify-self: center; */
  text-align: center;
  /* padding: 5px 0px; */
  font-size: larger;
`;

export const TelephoneStyle = styled.div`
  grid-area: TelephoneStyle;
  .input {
    width: 100%;
  }
`;

export const CellphoneStyle = styled.div`
  grid-area: CellphoneStyle;
  .input {
    width: 100%;
  }
`;

export const Btn = styled.div`
  grid-area: Btn;
  justify-self: center;
`;
