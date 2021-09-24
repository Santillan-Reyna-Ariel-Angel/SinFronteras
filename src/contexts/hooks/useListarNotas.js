import { useState } from "react";
import EventFirebase from "../../firebase-config";
const { app } = EventFirebase;

// export const ListarNotasBD = () => {
//   let notas;
//   try {
//     const note = app.database().ref();
//     note
//       .child("notes")
//       .get()
//       .then((element) => {
//         if (element.exists()) {
//           console.log("Element.val(): ", element.val());
//           notas = element.val();
//         } else {
//           console.log("Datos no dispinobles!!");
//         }
//       });
//     console.log("Hola soy notas:", notas);
//     return notas;
//   } catch (error) {
//     console.log("Lectura erronea!!!", error);
//   }
// };

// export const ListarNotasBD1 = () => {
//   const notas = app.database().ref("notes/");
//   notas.on("value", (snapshot) => {
//     snapshot.val();
//     console.log(snapshot.val());
//   });
//   return notas;
// };

// export const ListarNotasBD2 = () => {
//   const notas = app.database().ref("notes/");
//   return notas.on("value", (snapshot) => {
//     console.log(snapshot.val());
//     return snapshot.val();
//   });
// };

// export const ListarNotasBD3 = () => {
//   const notas = app
//     .database()
//     .ref("notes/")
//     .on("value", (snapshot) => {
//       snapshot.val();
//     });
//   //   setNotes(notas);
//   return notas;
// };

// export const ListarNotasBD4 = () => {
//   const notas = app
//     .database()
//     .ref("notes/")
//     .on("value", (snapshot) => {
//       return snapshot.val();
//     });
//   //   setNotes(notas);
//   return notas;
// };

// export const ListarNotasBD_B1 = () => {
//   const notas = app.database().ref();
//   notas
//     .child("notes")
//     .get()
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log(snapshot.val());
//       } else {
//         console.log("Datos no dispinobles!!");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   return notas;
// };

// export const ListarNotasBD_B2 = () => {
//   const notas = app.database().ref();
//   return notas
//     .child("notes")
//     .get()
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log(snapshot.val());
//       } else {
//         console.log("Datos no dispinobles!!");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// export const data = app.database().ref().child("notes").get();

// export const ListarNotasBD_B3 = () => {
//   let not = [];
//   const notas = app.database().ref();
//   notas
//     .child("notes")
//     .get()
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log(snapshot.val()[0].id);
//         not[snapshot.val()[0].id] = snapshot.val();
//       } else {
//         console.log("Datos no dispinobles!!");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   return not;
// };

// export const ListarNotasBD_B4 = () => {
//   const notas = app.database().ref();
//   const not = [
//     {
//       ...notas
//         .child("notes")
//         .get()
//         .then((snapshot) => {
//           return snapshot.val();
//         }),
//     },
//   ];
//   return not;
// };

// export const ListarNotasBD_C1 = () => {
//   const algo = app
//     .database()
//     .ref("notes")
//     .once("value")
//     .then((snapshot) => {
//       console.log(snapshot.val());
//       return snapshot.val();
//     });
//   return algo;
// };
// const datas = [];
// export const ListarNotasBD_C2 = () => {
//   app
//     .database()
//     .ref("notes")
//     .once("value")
//     .then((snapshot) => {
//       console.log(snapshot.val());
//       datas[0] = snapshot.val();
//     });

//   return datas;
// };
