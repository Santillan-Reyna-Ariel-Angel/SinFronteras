//tripMadeKeyData sera un dato que llegara por parametro
// let tripMadeKeyData = {
//   occupiedSeat: {
//     0: 'vendido-74747472',
//     7: 'vendido-74747472',
//     10: 'vendido-74747472',
//     17: 'preventa-74747472',
//     29: 'preventa-74747472',
//   },
//   passengers: {
//     'billingContact_15-11-2022_16-31_7481801': {
//       billingContactInformation: {
//         ciOrNit: '7481801',
//         countryCode: '+591 (BO)',
//         email: 'marco@gmail.com',
//         mobile: '7896354',
//         nameOrSocialReason: 'Salinas Guzman Marco Antonio',
//       },
//       saleDate: '15/11/2022',
//       salesAmountData: {
//         amountTotal: '30.00',
//         description: 'Familia',
//         discount: 25,
//         discountCheckbox: true,
//         subtotal: 55,
//       },
//       ticketsSalesData: {
//         passenger_7481801: {
//           branchNumber: 'code1',
//           branchPhone: '64-64646',
//           busEnrollment: 'bus-001',
//           companyName: 'Sin Fronteras',
//           departureTime: '20:30',
//           destiny: 'yacuiba',
//           identificationNumber: '7481801',
//           issuingUser: 'santillan reyna ariel angel',
//           lane: '0',
//           legend: 'Gracias por su compra, le deseamos un buen viaje.',
//           origin: 'sucre',
//           passengerFullName: 'Salinas Guzman Marco Antonio',
//           seatId: '7',
//           seatPrice: 55,
//           ticketNumber: 'suc-code1_15-11-2022_7481801',
//           travelDate: '30/11/2022',
//           typeOfDocument: 'Carnet Identidad',
//           typeOfSeat: 'semi-cama',
//         },
//       },
//       timeOfSale: '16:31',
//     },
//     'billingContact_15-11-2022_23-52_44444555': {
//       billingContactInformation: {
//         ciOrNit: '44444555',
//         countryCode: '+591 (BO)',
//         email: 'jose@gmail.com',
//         mobile: '7946435',
//         nameOrSocialReason: 'Chanchi Jose',
//       },
//       saleDate: '15/11/2022',
//       salesAmountData: {
//         amountTotal: '30.00',
//         description: 'amigo',
//         discount: 30,
//         discountCheckbox: true,
//         subtotal: 60,
//       },
//       ticketsSalesData: {
//         passenger_44444555: {
//           branchNumber: 'code1',
//           branchPhone: '64-64646',
//           busEnrollment: 'bus-001',
//           companyName: 'Sin Fronteras',
//           departureTime: '20:30',
//           destiny: 'yacuiba',
//           identificationNumber: '44444555',
//           issuingUser: 'santillan reyna ariel angel',
//           lane: '0',
//           legend: 'Gracias por su compra, le deseamos un buen viaje.',
//           origin: 'sucre',
//           passengerFullName: 'Chanchi Jose',
//           seatId: '10',
//           seatPrice: 60,
//           ticketNumber: 'suc-code1_15-11-2022_44444555',
//           travelDate: '30/11/2022',
//           typeOfDocument: 'Carnet Identidad',
//           typeOfSeat: 'semi-cama',
//         },
//       },
//       timeOfSale: '23:52',
//     },
//   },
//   travelExpenses: {
//     busEnrollment: 'bus-001',
//     expenses: {
//       diesel: '500',
//       laborUnion: '10',
//       otherDescription: 'Se compro jabon liquido alcohol',
//       others: '10',
//       toll: '10',
//       viaticos: '150',
//       washed: '50',
//     },
//     totalExpenses: 730,
//     tripMadeKey: 'travel_30-11-2022_20-30_bus-001',
//   },
//   travelIncome: {
//     totalAmountIncome: 0,
//     totalAmountTickets: 0,
//   },
// };

export const getTravelIncomeBd = (tripMadeKeyData) => {
  if (tripMadeKeyData !== undefined) {
    let {
      travelIncome,
      travelExpenses: { tripMadeKey },
    } = tripMadeKeyData;
    // console.log('travelIncome', travelIncome);

    //VERIFICAR SI EXISTE LA PROPIEDAD incomeTickets:
    let existingProperty = travelIncome.hasOwnProperty('incomeTickets'); //false= No se tienen ningun registro de venta
    // console.log('existingProperty', existingProperty);

    let travelIncomeData; //var que contendra toda la data
    //crea incomeTickets de ser nacesario:
    if (existingProperty === false) {
      travelIncomeData = {
        ...travelIncome,
        incomeTickets: existingProperty ? travelIncome.incomeTickets : [],
      };
    } else {
      travelIncomeData = {
        ...travelIncome,
      };
    }

    let getTravelIncomeBd = {
      travelIncome: travelIncomeData,
      tripMadeKey: tripMadeKey,
    };

    // console.log('getTravelIncomeBd', getTravelIncomeBd);
    return getTravelIncomeBd;
  } else {
    console.log('tripMadeKeyData:', tripMadeKeyData);

    let getTravelIncomeBd = {};
    // console.log('getTravelIncomeBd', getTravelIncomeBd);
    return getTravelIncomeBd;
  }
};
// getTravelIncomeBd(tripMadeKeyData); //tripMadeKeyData
