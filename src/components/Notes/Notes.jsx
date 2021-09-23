import React from "react";
import CreateNote from "./CreateNote";
import Note from "./Note";
import { ContextListsNotes } from "../../contexts/ContextListNotes";

const Notes = () => {
  return (
    <>
      <CreateNote />
      <ContextListsNotes>
        <Note />
      </ContextListsNotes>
    </>
  );
};

export default Notes;
