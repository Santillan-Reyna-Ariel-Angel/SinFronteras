import { createContext } from 'react';
import { useCompanyBuses } from './hooks/useCompanyBuses';

export const ContextCompanyBuses = createContext({});

export const ProviderCompanyBuses = (props) => {
  const { companyBuses } = useCompanyBuses();
  return (
    <ContextCompanyBuses.Provider value={companyBuses}>
      {props.children}
    </ContextCompanyBuses.Provider>
  );
};
