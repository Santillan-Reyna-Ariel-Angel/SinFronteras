import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  BodyNote,
  NoteContainer,
  Title,
  ButtonSave,
  Form,
  HeaderTitle,
} from "./createNotesStyles";

import {
  saveNote,
  updateNote,
  deleteNote,
  readAllNotes,
  readAllNotes2,
  readSpecificNote,
} from "../../events/firebaseEvents";

import { useNotesLists } from "../../contexts/hooks/useNotesLists";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [bodyNote, setBodyNote] = useState("");
  const [id, setId] = useState(1);

  const saveNewNote = async () => {
    if (title !== "" && bodyNote !== "") {
      saveNote(id, title, bodyNote);
      console.log(id);
      setId(id + 1);
    } else {
      console.log("Completar campos");
    }
  };

  const readNoteBD = () => {
    readSpecificNote(3);
  };

  const readAllNotesBD = () => {
    // readAllNotes();
    readAllNotes2(2);
  };

  const updateNoteBD = () => {
    console.log(title, bodyNote);
    if (title !== "" && bodyNote !== "") {
      updateNote(1, title, bodyNote);
    } else {
      console.log("Completar campos");
    }
  };

  const deleteNoteBD = () => {
    if (id > 1) {
      deleteNote(4);
      setId(id - 1);
      console.log(id);
    } else {
      console.log("No existen datos");
    }
  };
  return (
    <>
      <NoteContainer>
        <Form>
          <HeaderTitle>Nueva Nota</HeaderTitle>
          <Title>
            <TextField
              required
              fullWidth
              id="standard-required"
              label="Titulo"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </Title>
          <BodyNote>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              label="Nota:"
              multiline
              rows={4}
              variant="outlined"
              onChange={(event) => {
                setBodyNote(event.target.value);
              }}
            />
          </BodyNote>
          <ButtonSave>
            <Button
              variant="contained"
              color="primary"
              // onClick={() => saveNewNote()}
              // onClick={() => readNoteBD()}
              // onClick={() => updateNoteBD()}
              // onClick={() => deleteNoteBD()}
              onClick={() => readAllNotesBD()}
            >
              Guardar
            </Button>
          </ButtonSave>
        </Form>
      </NoteContainer>
    </>
  );
};

export default CreateNote;
