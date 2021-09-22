import React from "react";
import CreateNote from "./CreateNote";
import Note from "./Note";
import { ContextListsNotes } from "./../../Context/ContextListNotes";
import { users } from "./../../Context/ContextUsers";
//Contexts
import { ContextoUsuario } from "./../../Context/ContextUsers";
const Notes = () => {
  return (
    <>
      <CreateNote />
      <ContextoUsuario.Provider value={users}>
        <ContextListsNotes>
          <Note />
        </ContextListsNotes>
      </ContextoUsuario.Provider>
    </>
  );
};

export default Notes;
