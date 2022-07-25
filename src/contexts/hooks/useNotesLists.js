import { useState } from 'react';

let listAllNotes;
let setListAllNotes;

//LECTURA

export function useNotesLists() {
  [listAllNotes, setListAllNotes] = useState([]);

  return {
    listAllNotes,
    setListAllNotes,
  };
}
