import { useState, useEffect } from "react";
import EventFirebase from "../../firebase-config";
const { firebase } = EventFirebase;

let data = sessionStorage.getItem("userEmail");

let branchOffice, setBranchOffice;

// const referencia = () => {
//   let ref = firebase
//     .database()
//     .ref("brachOffices")
//     .orderByChild("branchInformation/emailsWithAccess");
//   return ref;
// };
const branchOfficeAux = async () => {
  console.log("sessionStorage:", data);
  // const referenceBD = firebase
  //   .database()
  //   .ref("brachOffices")
  //   .orderByChild("branchInformation/emailsWithAccess");
  // referenceBD
  //   .orderByChild("email")
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
  //     setBranchOffice(snapshot.val());
  //     }
  //   });

  // firebase
  //   .database()
  //   .ref("branchOffices")
  //   .child("branchInformation/emailsWithAccess")
  //   .orderByChild("email")
  //   .equalTo(data)
  //   .on("value", (snapshot) => {
  //     console.log("snapshot.val()", snapshot.val());
  //     setBranchOffice(snapshot.val());
  //   });

  // let algo = referencia();
  // algo.orderByChild("email").equalTo(data);
  // algo.on("value", (snapshot) => {
  //   console.log("snapshot.val()", snapshot.val());
  //   setBranchOffice(snapshot.val());
  // });

  // firebase
  //   .database()
  //   .ref("branchOffices")
  //   .on("value", (snapshot) => {
  //     // console.log("snapshot.val()", snapshot.val());
  //     Object.keys(snapshot.val()).map((key) => {
  //       Object.keys(
  //         firebase
  //           .database()
  //           .ref(`branchOffices/${key}/branchInformation/emailsWithAccess`)
  //       ).map((code) => {
  //         let f = firebase
  //           .database()
  //           .ref(
  //             `branchOffices/${key}/branchInformation/emailsWithAccess/${code}/email`
  //           )
  //           // .child("email")
  //           .equalTo(data);
  //         console.log("f", f);
  //       });

  //       // .orderByChild("email")
  //       // .equalTo(data)
  //     });
  //     setBranchOffice(snapshot.val());
  //   });

  let mainRoute, emailPathWithAccess;
  firebase
    .database()
    .ref("branchOffices")
    .on("value", (snapshot) => {
      Object.keys(snapshot.val()).map((key) => {
        firebase
          .database()
          .ref(`branchOffices/${key}/branchInformation/emailsWithAccess`)
          .orderByChild("email")
          .equalTo(data)
          .on("value", (snapshot) => {
            snapshot.forEach((code) => {
              // console.log("code.key:", code.key);
              mainRoute = `branchOffices/${key}/`;
              emailPathWithAccess = `${mainRoute}branchInformation/emailsWithAccess/${code.key}/email`;
              console.log("mainRoute:", mainRoute);
              console.log("emailPathWithAccess:", emailPathWithAccess);
            });
          });
      });
      firebase
        .database()
        .ref(mainRoute)
        .on("value", (snapshot) => {
          console.log("mainRoutesnapshot.val():", snapshot.val());
          setBranchOffice(snapshot.val());
        });
    });

  // firebase
  //   .database()
  //   .ref("branchOffices/code1")
  //   .on("value", (snapshot) => {
  //     console.log("snapshot.val()", snapshot.val());
  //     setBranchOffice(snapshot.val());
  //   });
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
