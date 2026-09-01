import { useState, useEffect } from 'react';
import { modulesFirebase } from './../../firebase-config.js';
import { ref, onValue } from 'firebase/database';
const { fire_db } = modulesFirebase;

let generalCompanyData, setGeneralCompanyData;

const generalCompanyDataAux = () => {
  let userEmail = sessionStorage.getItem('userEmail');

  if (userEmail !== null) {
    const response = ref(fire_db, 'generalCompanyData');
    onValue(
      response,
      (generalCompanyData) => {
        setGeneralCompanyData(generalCompanyData.val());
      },
      {
        onlyOnce: true, //esto es equivalente al once
      }
    );
  }
};

export const useGeneralCompanyData = () => {
  [generalCompanyData, setGeneralCompanyData] = useState();
  useEffect(() => {
    generalCompanyDataAux();
  }, []);

  return {
    generalCompanyData,
  };
};
