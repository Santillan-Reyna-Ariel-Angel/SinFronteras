import styled from "styled-components";

export const NoteContainer = styled.div`
  display: grid;
  grid-template-columns: 250px;
  grid-template-rows: auto;

  grid-template-areas: "NoteContend";
`;

export const NoteContent = styled.div`
  display: grid;
  grid-area: NoteContend;
  padding: 15px 20px;
  grid-row-gap: 10px;
  grid-template-areas: "Title Title" "BodyNote BodyNote" "ButtonEdit ButtonDelete";

  background-color: #00bdb2;
  border-radius: 15px;
`;

export const Title = styled.div`
  grid-area: Title;
  text-align: center;
  font-size: x-large;
`;

export const BodyNote = styled.div`
  grid-area: BodyNote;
  font-size: small;
`;

export const ButtonEdit = styled.div`
  text-align: center;
  grid-area: ButtonEdit;
`;

export const ButtonDelete = styled.div`
  text-align: center;
  grid-area: ButtonDelete;
`;
