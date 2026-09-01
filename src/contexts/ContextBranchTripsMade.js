import { createContext } from 'react';
import { useBranchTripsMade } from './hooks/useBranchTripsMade';

export const ContextBranchTripsMade = createContext({});

export const ProviderBranchTripsMade = (props) => {
  const { branchTripsMade } = useBranchTripsMade();
  return (
    <ContextBranchTripsMade.Provider value={branchTripsMade}>
      {props.children}
    </ContextBranchTripsMade.Provider>
  );
};
