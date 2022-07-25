import styled from "styled-components";

export const NoteContainer = styled.div`
  display: grid;

  grid-template-columns: 300px;
  grid-template-rows: auto;

  grid-template-areas: "loginForm";
  /* justify-content: center;
  align-content: center; */
`;
export const Form = styled.form`
  grid-area: loginForm;
  display: grid;
  padding: 15px 20px;
  grid-row-gap: 13px;

  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, auto);

  grid-template-areas: "HeaderTitle" "Title" "BodyNote" "ButtonSave";

  background-color: #00bdb2;
  border-radius: 15px;
`;

export const HeaderTitle = styled.div`
  grid-area: HeaderTitle;
  text-align: center;
  font-size: x-large;
`;

export const Title = styled.div`
  grid-area: Title;
  /* background-color: red; */
`;

export const BodyNote = styled.div`
  grid-area: BodyNote;
  /* background-color: yellow; */
  background-color: #9ca3af;
`;

export const ButtonSave = styled.div`
  grid-area: ButtonSave;
`;
