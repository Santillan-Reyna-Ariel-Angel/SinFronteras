import { createContext } from "react";
import { useUserData } from "./hooks/useUserData";

export const ContextUserData = createContext({});

export const ProviderUserData = (props) => {
  const { userDat } = useUserData();
  return (
    <ContextUserData.Provider value={userDat}>
      {props.children}
    </ContextUserData.Provider>
  );
};
