import { useState, useEffect } from "react";
import EventFirebase from "../../firebase-config";
const { firebase } = EventFirebase;

let notes, setNotes;
const noteaux = () => {
  firebase
    .database()
    .ref("notes")
    .on("value", (snapshot) => {
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
