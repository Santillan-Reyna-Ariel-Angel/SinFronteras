import { createContext } from "react";
import { useBranchOfficesBD } from "./hooks/useBranchOfficesBD";

export const ContextBranchOffices = createContext({});

export const ProviderBranchOffices = (props) => {
  const { branchOffices } = useBranchOfficesBD();
  return (
    <ContextBranchOffices.Provider value={branchOffices}>
      {props.children}
    </ContextBranchOffices.Provider>
  );
};
