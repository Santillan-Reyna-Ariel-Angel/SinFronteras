import { createContext } from 'react';
import { useGeneralCompanyData } from './hooks/useGeneralCompanyData';

export const ContextGeneralCompanyData = createContext({});

export const ProviderGeneralCompanyData = (props) => {
  const { generalCompanyData } = useGeneralCompanyData();
  return (
    <ContextGeneralCompanyData.Provider value={generalCompanyData}>
      {props.children}
    </ContextGeneralCompanyData.Provider>
  );
};
