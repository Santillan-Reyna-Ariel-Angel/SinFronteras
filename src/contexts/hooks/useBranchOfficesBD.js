import { useState, useEffect } from "react";
import EventFirebase from "../../firebase-config";
const { firebase } = EventFirebase;

let branchOffices, setBranchOffices;
const branchOfficesAux = () => {
  firebase
    .database()
    .ref("branchOffices")
    .on("value", (snapshot) => {
      console.log(snapshot.val());
      setBranchOffices(snapshot.val());
    });
};
export const useBranchOfficesBD = () => {
  [branchOffices, setBranchOffices] = useState();
  useEffect(() => {
    branchOfficesAux();
  }, []);

  return {
    branchOffices,
  };
};
