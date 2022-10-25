import { useState, useEffect } from 'react';
import { modulesFirebase } from './../../firebase-config.js';
import { ref, onValue } from 'firebase/database';
const { fire_db } = modulesFirebase;

let allUsers, setAllUsers;

const allUserDataAux = () => {
  let userEmail = sessionStorage.getItem('userEmail');

  if (userEmail !== null) {
    const response = ref(fire_db, 'users');
    onValue(response, (allUsers) => {
      setAllUsers(allUsers.val());
    });
  }
};

export const useAllUserData = () => {
  [allUsers, setAllUsers] = useState();
  useEffect(() => {
    allUserDataAux();
  }, []);

  return {
    allUsers,
  };
};
