import { createContext } from 'react';
import { useAllUserDataForLogin } from './hooks/useAllUserDataForLogin';

export const ContextAllUserDataForLogin = createContext({});

export const ProviderAllUserDataForLogin = (props) => {
  const { allUsersForLogin } = useAllUserDataForLogin();
  return (
    <ContextAllUserDataForLogin.Provider value={allUsersForLogin}>
      {props.children}
    </ContextAllUserDataForLogin.Provider>
  );
};
