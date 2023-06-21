import { useState, useEffect } from 'react';
import { modulesFirebase } from '../../firebase-config.js';
import { ref, onValue } from 'firebase/database';
const { fire_db } = modulesFirebase;

let allUsersForLogin, setAllUsersForLogin;

const allUserDataForLoginAux = () => {
  const response = ref(fire_db, 'users');
  onValue(response, (allUsersForLogin) => {
    setAllUsersForLogin(allUsersForLogin.val());
  });
};

export const useAllUserDataForLogin = () => {
  [allUsersForLogin, setAllUsersForLogin] = useState();
  useEffect(() => {
    allUserDataForLoginAux();
  }, []);

  return {
    allUsersForLogin,
  };
};
