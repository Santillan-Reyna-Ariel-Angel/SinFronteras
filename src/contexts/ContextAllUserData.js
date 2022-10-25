import { createContext } from 'react';
import { useAllUserData } from './hooks/useAllUserData';

export const ContextAllUserData = createContext({});

export const ProviderAllUserData = (props) => {
  const { allUsers } = useAllUserData();
  return (
    <ContextAllUserData.Provider value={allUsers}>
      {props.children}
    </ContextAllUserData.Provider>
  );
};
