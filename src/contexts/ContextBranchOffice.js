import { createContext } from "react";
import { useBranchOffice } from "./hooks/useBranchOffice";

export const ContextBranchOffice = createContext({});

export const ProviderBranchOffice = (props) => {
  const { branchOffice } = useBranchOffice();
  return (
    <ContextBranchOffice.Provider value={branchOffice}>
      {props.children}
    </ContextBranchOffice.Provider>
  );
};
