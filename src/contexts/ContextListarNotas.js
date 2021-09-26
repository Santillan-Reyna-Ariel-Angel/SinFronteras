import { createContext } from "react";
import { useListarConOn } from "./hooks/useListarNotas";

export const ContextListarNotas = createContext({});

export const ProviderListarNotas = (props) => {
  const { notes } = useListarConOn();
  return (
    <ContextListarNotas.Provider value={notes}>
      {props.children}
    </ContextListarNotas.Provider>
  );
};
