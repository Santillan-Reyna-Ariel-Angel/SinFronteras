import { useState, useEffect } from 'react';
import EventFirebase from './../../firebase-config';
const { firebase } = EventFirebase;

let generalCompanyData, setGeneralCompanyData;

const generalCompanyDataAux = () => {
  let userEmail = sessionStorage.getItem('userEmail');

  if (userEmail !== null) {
    firebase
      .database()
      .ref('generalCompanyData')
      .once('value', (generalCompanyData) => {
        setGeneralCompanyData(generalCompanyData.val());
      });
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
