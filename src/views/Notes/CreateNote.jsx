import React from "react";
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
const CreateNote = () => {
  return (
    <>
      <NoteContainer>
        <Form>
          <HeaderTitle>Nueva Nota:</HeaderTitle>
          <Title>
            <TextField
              required
              fullWidth
              id="standard-required"
              label="Titulo"
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
            />
          </BodyNote>
          <ButtonSave>
            <Button variant="contained" color="primary">
              Guardar
            </Button>
          </ButtonSave>
        </Form>
      </NoteContainer>
    </>
  );
};

export default CreateNote;
