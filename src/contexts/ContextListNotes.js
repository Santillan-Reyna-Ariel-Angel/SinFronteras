import React, { createContext } from "react";

import { useNotesLists } from "./hooks/useNotesLists";

export const Context = createContext([]);

export const ContextListsNotes = (props) => {
  const Hook = useNotesLists();
  return <Context.Provider value={Hook}>{props.children}</Context.Provider>;
};
