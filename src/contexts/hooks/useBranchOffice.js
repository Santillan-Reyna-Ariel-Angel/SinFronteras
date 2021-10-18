import { useState, useEffect } from "react";
import EventFirebase from "../../firebase-config";
const { firebase } = EventFirebase;

let data = sessionStorage.getItem("userEmail");

let branchOffice, setBranchOffice;

const branchOfficeAux = async () => {
  data = "jesus.tn79@gmail.com";
  console.log("sessionStorage:", data);
  console.log("usuario: " + data);
  const referenceBD = firebase
    .database()
    .ref("brachOffices")
    .orderByChild("branchInformation/emailsWithAccess/code1")
    // referenceBD
    // .ref("code1")
    // .where(`email`, "==", data)
    // .orderByChild("email")
    .equalTo(data, "email")
    .on("value", (snapshot) => {
      console.log("snapshot.val()", snapshot.val());
      setBranchOffice(snapshot.val());
    });
  console.log("holis");
  console.log(await referenceBD);
  console.log("====");
  // firebase
  //   .database()
  //   .ref("brachOffices")
  //   .orderByChild("branchInformation/emailsWithAccess/email")
  //   .equalTo(data)
  //   .on("value", (snapshot) => {
  //     console.log("snapshot.val()", snapshot.val());
  //     setBranchOffice(snapshot.val());
  //   });

  // firebase
  //   .database()
  //   .ref("brachOffices")
  //   .orderByChild("branchInformation/emailsWithAccess")
  //   .equalTo(data)
  //   .on("value", (snapshot) => {
  //     console.log("snapshot.val()", snapshot.val());
  //     setBranchOffice(snapshot.val());
  //   });

  // firebase
  //   .database()
  //   .ref("branchOffices")
  //   .on("value", (snapshot) => {
  //     console.log("snapshot.val()", snapshot.val());
  //     // console.log(Object.keys(snapshot).length);
  //     if (
  //       snapshot
  //         .val()
  //         .branchInformation.emailsWithAccess.orderByChild("email") === data
  //     ) {
  //       console.log("asd");
  //     }

  //     setBranchOffice(snapshot.val());
  //   });

  firebase
    .database()
    .ref("branchOffices/code1")
    .on("value", (snapshot) => {
      console.log("snapshot.val()", snapshot.val());
      setBranchOffice(snapshot.val());
    });
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
