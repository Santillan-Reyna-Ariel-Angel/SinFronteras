// const obtenerSalida = (sale, bd) => {
//   // Crear un array para almacenar los resultados
//   let salida = [];

//   // Recorrer los elementos del array bd
//   for (let i = 0; i < bd.length; i++) {
//     // Buscar un elemento en el array sale con el mismo valor de priceTicket
//     let indiceSale = sale.findIndex((e) => e.priceTicket === bd[i].priceTicket);

//     // Si se encuentra, actualizar el valor de numTickets y totalPrice en el elemento de sale
//     // y eliminar el elemento de bd
//     if (indiceSale !== -1) {
//       sale[indiceSale].numTickets += bd[i].numTickets;
//       sale[indiceSale].totalPrice += bd[i].totalPrice;
//       bd.splice(i, 1);
//       i--;
//     }
//     // Si no se encuentra, añadir el elemento de bd al array salida
//     else {
//       salida.push(bd[i]);
//     }
//   }

//   // Añadir los elementos restantes del array sale al array salida
//   salida.push(...sale);

//   // Devolver el array salida
//   return salida;
// };

console.log('v2: obtenerSalida()');

const obtenerSalida = (sale, bd) => {
  // Crear un array para almacenar los resultados
  let salida = [];

  // Recorrer los elementos del array bd utilizando el método forEach()
  bd.forEach((elementoBd) => {
    // Buscar un elemento en el array sale con el mismo valor de priceTicket
    let elementoSale = sale.find(
      (e) => e.priceTicket === elementoBd.priceTicket
    );

    // Si se encuentra, actualizar el valor de numTickets y totalPrice en el elemento de sale
    // y eliminar el elemento de bd
    if (elementoSale !== undefined) {
      elementoSale.numTickets += elementoBd.numTickets;
      elementoSale.totalPrice += elementoBd.totalPrice;
      bd = bd.filter((e) => e.priceTicket !== elementoBd.priceTicket);
    }
    // Si no se encuentra, añadir el elemento de bd al array salida
    else {
      salida.push(elementoBd);
    }
  });

  // Añadir los elementos restantes del array sale al array salida
  salida.push(...sale);

  // Devolver el array salida
  return salida;
};

// let sale = [
//   {
//     numTickets: 2,
//     priceTicket: '96',
//     totalPrice: 192,
//   },
//   {
//     numTickets: 2,
//     priceTicket: '100',
//     totalPrice: 200,
//   },
// ];

let sale = [
  {
    numTickets: 2,
    priceTicket: '96',
    totalPrice: 192,
  },
  {
    numTickets: 2,
    priceTicket: '100',
    totalPrice: 200,
  },
  {
    numTickets: 2,
    priceTicket: '80',
    totalPrice: 160,
  },
  {
    numTickets: 1,
    priceTicket: '94',
    totalPrice: 94,
  },
];

let bd = [
  {
    numTickets: 1,
    priceTicket: '96',
    totalPrice: 96,
  },
  {
    numTickets: 1,
    priceTicket: '94',
    totalPrice: 94,
  },
];

let salida = obtenerSalida(sale, bd);

console.log(salida); // [{ numTickets: 3, priceTicket: '96', totalPrice: 288 }, { numTickets: 1, priceTicket: '94', totalPrice: 94 }, { numTickets: 2, priceTicket: '100', totalPrice: 200 }]
