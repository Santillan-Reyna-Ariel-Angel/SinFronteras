import { useState, useEffect } from 'react';
import { modulesFirebase } from './../../firebase-config.js';
import { ref, onValue } from 'firebase/database';
const { fire_db } = modulesFirebase;

let companyBuses, setCompanyBuses;

const companyBusesAux = () => {
  let userEmail = sessionStorage.getItem('userEmail');

  if (userEmail !== null) {
    const response = ref(fire_db, 'companyBuses');
    onValue(
      response,
      (companyBuses) => {
        setCompanyBuses(companyBuses.val());
      },
      {
        onlyOnce: true, //esto es equivalente al once. CONSIDERAR QUITAR TODO EL JSON PARA QUE SIEMPRE ESTE EN ESCUCHA
      }
    );
  }
};

export const useCompanyBuses = () => {
  [companyBuses, setCompanyBuses] = useState();
  useEffect(() => {
    companyBusesAux();
  }, []);

  return {
    companyBuses,
  };
};
