import { useState, useEffect } from 'react';
/*cod fire v9:*/
import {
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
  // child,
} from 'firebase/database';
import { modulesFirebase } from './../../firebase-config.js';
//Functions:
import { saveDataSessionStorage } from './../saveDataSessionStorage';

const { fire_db } = modulesFirebase;

let branchOffice, setBranchOffice;

const branchOfficeAux = () => {
  let userEmail = sessionStorage.getItem('userEmail');
  // console.log("sessionStorage_useBranchOffice:", userEmail);

  if (userEmail !== null) {
    const response = query(
      ref(fire_db, 'users'),
      orderByChild('email'),
      equalTo(userEmail)
    );
    onValue(response, (userData) => {
      // console.log("userData", userData.val());

      let userKey = Object.keys(userData.val())[0];
      // console.log("userKey", userKey);

      let branchOfficeKey = userData
        .child(userKey)
        .child('branchNumberOrCode')
        .val();
      // console.log("branchOfficeKey", branchOfficeKey);

      let branchOffice_x = ref(fire_db, `branchOffices/${branchOfficeKey}/`);
      //let newRef = ref(fire_db, 'branchOffices');
      //let childAux = child(newRef, branchOfficeKey);
      onValue(branchOffice_x, (branchOffice) => {
        // console.log("branchOffice.val()", branchOffice.val());
        setBranchOffice(branchOffice.val());

        //GUARDAR INFO EN sessionStorage:
        saveDataSessionStorage({
          dataName: 'branchOffice',
          newDataValue: branchOffice.val(),
        });
      });
    });
  }
};

export const useBranchOffice = () => {
  [branchOffice, setBranchOffice] = useState();
  useEffect(() => {
    branchOfficeAux();
  }, []);

  return {
    branchOffice,
  };
};
