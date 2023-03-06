import { createContext } from 'react';
import { useAllBranchOffices } from './hooks/useAllBranchOffices';

export const ContextAllBranchOffices = createContext({});

export const ProviderAllBranchOffices = (props) => {
  const { allBranchOffices } = useAllBranchOffices();
  return (
    <ContextAllBranchOffices.Provider value={allBranchOffices}>
      {props.children}
    </ContextAllBranchOffices.Provider>
  );
};
