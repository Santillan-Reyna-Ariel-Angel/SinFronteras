import React, { useContext } from "react";
import { IconButton, TextField } from "@mui/material";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import {
  NoteContainer,
  NoteContent,
  Title,
  BodyNote,
  ButtonEdit,
  ButtonDelete,
} from "./NoteStyles";

//contexts
import { Context } from "../../contexts/ContextListNotes";

const Note = () => {
  const { listAllNotes } = useContext(Context);
  console.log(listAllNotes, "Hola");

  return (
    <>
      <ul>
        {Object.keys(listAllNotes).map((key) => {
          return <li key={key}>{listAllNotes[key].title}</li>;
        })}
      </ul>

      <NoteContainer>
        <NoteContent>
          <Title>Title</Title>
          <BodyNote>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              // label="Nota:"
              value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
              magni veniam ipsam iste consectetur, aut provident dolor nisi
              tempore ad quam qui doloribus distinctio delectus quos animi quis!
              Iste, impedit?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
              magni veniam ipsam iste consectetur, aut provident dolor nisi
              tempore ad quam qui doloribus distinctio delectus quos animi quis!
              Iste, impedit?"
              multiline
              rows={5}
              variant="outlined"
            />
          </BodyNote>
          <ButtonEdit>
            <IconButton aria-label="delete">
              <CreateRoundedIcon />
            </IconButton>
          </ButtonEdit>
          <ButtonDelete>
            <IconButton aria-label="delete">
              <DeleteForeverRoundedIcon />
            </IconButton>
          </ButtonDelete>
        </NoteContent>
      </NoteContainer>
    </>
  );
};

export default Note;
