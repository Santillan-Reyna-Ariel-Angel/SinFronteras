import { createContext } from "react";
import { useListarConOn } from "./hooks/useListarNotas";

// const HookListarNotas = () => {
//   const { notes } = useListarConOn();
//   return notes;
// };
// const hook = HookListarNotas();
// export const ContextListarNotas = createContext(hook);

export const useListarNotas = () => {
  const { notes } = useListarConOn();
  // console.log("useListarnoteas:", notes);
  return notes;
};

export const ContextListarNotas = createContext(useListarNotas);

//OTROS EJEMPLOS:
// export const Context = createContext([]);
// export const ContextListsNotes = (props) => {
//   const Hook = useNotesLists();
//   return <Context.Provider value={Hook}>{props.children}</Context.Provider>;
// };
