import { useState, useEffect } from 'react';
/*cod fire v9:*/
import { modulesFirebase } from './../../firebase-config.js';
import { ref, onValue } from 'firebase/database';
const { fire_db } = modulesFirebase;

let notes, setNotes;
const noteaux = () => {
  /*cod fire v9:*/
  const response = ref(fire_db, 'notes');
  onValue(response, (snapshot) => {
    // console.log(snapshot.val());
    setNotes(snapshot.val());
  });
};
export const useListarConOn = () => {
  [notes, setNotes] = useState();
  useEffect(() => {
    noteaux();
  }, []);

  return {
    notes,
  };
};

// Copiar objetos profundamente
// let data2 = {};
// data2 = JSON.parse(JSON.stringify(data));

//OTRA FORMA DE COPIAR UN OBJETO:
// let notes = {};
// Object.getOwnPropertyNames(snapshot.val()).forEach(function (val) {
//       console.log(val + " : " + snapshot.val()[val]);
//       notes = {
//         ...notes,
//         [val]: snapshot.val()[val],
//       };
//     });
