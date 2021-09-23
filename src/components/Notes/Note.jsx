import React, { useContext } from "react";
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

//contexts
import { Context } from "../../contexts/ContextListNotes";
import { ContextoUsuario } from "../../contexts/ContextUsers";

const Note = () => {
  const { listAllNotes } = useContext(Context);
  console.log(listAllNotes, "Hola");

  const U = useContext(ContextoUsuario);

  return (
    <>
      <ul>
        {Object.keys(listAllNotes).map((key) => {
          return <li key={key}>{listAllNotes[key].title}</li>;
        })}
      </ul>
      {/* Uso de Context ejemplo 2 */}
      <ContextoUsuario.Consumer>
        {(value) => {
          return value.map((usuario) => {
            return <p>{usuario.correo}</p>;
          });
        }}
      </ContextoUsuario.Consumer>

      {/* Uso de Context ejemplo 3  */}
      {U.map((element) => {
        return <p>{element.firtsname}</p>;
      })}
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
