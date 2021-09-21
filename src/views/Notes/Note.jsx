import React, { useContext } from "react";
// import TextField from "@material-ui/core/TextField";
import { IconButton, TextField } from "@material-ui/core";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import {
  NoteContainer,
  NoteContent,
  Title,
  BodyNote,
  ButtonEdit,
  ButtonDelete,
} from "./NoteStyles";

import { Context } from "../../Context/ContextListNotes";

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
