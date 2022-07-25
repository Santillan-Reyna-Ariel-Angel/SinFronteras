import { useState, useEffect } from 'react';
import { modulesFirebase } from './../../firebase-config.js';
import { ref, onValue, query, orderByChild, equalTo } from 'firebase/database';
const { fire_db } = modulesFirebase;

let userDat, setUserDat;
const userDataAux = () => {
  let userEmail = sessionStorage.getItem('userEmail');
  // console.log("sessionStorage_useUserData:", userEmail);

  if (userEmail !== null) {
    const response = query(
      ref(fire_db, 'users'),
      orderByChild('email'),
      equalTo(userEmail)
    );
    onValue(response, (userData) => {
      let userKey = Object.keys(userData.val())[0];
      setUserDat(userData.child(userKey).val());
    });
  }
};

export const useUserData = () => {
  [userDat, setUserDat] = useState();
  useEffect(() => {
    userDataAux();
  }, []);

  return {
    userDat,
  };
};
