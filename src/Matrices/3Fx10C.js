const array = [
  [
    'F0C0',
    'F0C1',
    'F0C2',
    'F0C3',
    'F0C4',
    'F0C5',
    'F0C6',
    'F0C7',
    'F0C8',
    'F0C9',
  ],
  [
    'F1C0',
    'F1C1',
    'F1C2',
    'F1C3',
    'F1C4',
    'F1C5',
    'F1C6',
    'F1C7',
    'F1C8',
    'F1C9',
  ],
  [
    'F2C0',
    'F2C1',
    'F2C2',
    'F2C3',
    'F2C4',
    'F2C5',
    'F2C6',
    'F2C7',
    'F2C8',
    'F2C9',
  ],
];

const copy = array;

// console.log(copy);

// const ultimos = copy.map((fila) => {
//   return fila[fila.length - 1];
// });
// console.log(ultimos);

// const BusMap = copy.map((fila) => {
//   if (fila.indexOf() === 1) {
//     fila.map((element) => {
//       return (fila[element] = 'p');
//     });
//   } else {
//     fila.map((element) => {
//       return (fila[element] = 'v');
//     });
//   }
// });

// const BusMap = copy.findIndex((fila, indice) => {
//   if (indice === 1 || indice === '1') {
//     return fila.map((element) => {
//       return (fila[element] = 'p');
//     });
//   } else {
//     return fila.map((element) => {
//       return (fila[element] = 'v');
//     });
//   }
// });

const BusMap = copy.findIndex((fila, indice) => {
  if (indice === 2) {
    return fila.forEach((elemento) => (elemento = 'p'));
    // return fila.map((element) => {
    //   return (element = 'p');
    // });
  } else {
    return fila.forEach((elemento) => (elemento = 'p'));
    // return fila.map((element) => {
    //   return (element = 'v');
    // });
  }
});
console.log(BusMap);
