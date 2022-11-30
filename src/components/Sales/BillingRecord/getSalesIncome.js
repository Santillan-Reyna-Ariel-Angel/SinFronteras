import { travelKey } from '../Events/Functions/TripsMadeGenerateKeys.js'; // ./TripsMadeGenerateKeys.js

let ticketsSalesData = [
  {
    branchNumber: 'code1',
    branchPhone: '64-64646',
    busEnrollment: 'bus-001',
    companyName: 'Sin Fronteras',
    departureTime: '20:30',
    destiny: 'yacuiba',
    identificationNumber: '7481801',
    issuingUser: 'santillan reyna ariel angel',
    lane: '0',
    legend: 'Gracias por su compra, le deseamos un buen viaje.',
    origin: 'sucre',
    passengerFullName: 'Salinas Guzman Marco Antonio',
    seatId: '7',
    seatPrice: 55,
    ticketNumber: 'suc-code1_15-11-2022_7481801',
    travelDate: '20/11/2022',
    typeOfDocument: 'Carnet Identidad',
    typeOfSeat: 'semi-cama',
  },
  {
    branchNumber: 'code1',
    branchPhone: '64-64646',
    busEnrollment: 'bus-001',
    companyName: 'Sin Fronteras',
    departureTime: '20:30',
    destiny: 'yacuiba',
    identificationNumber: '44444555',
    issuingUser: 'santillan reyna ariel angel',
    lane: '0',
    legend: 'Gracias por su compra, le deseamos un buen viaje.',
    origin: 'sucre',
    passengerFullName: 'Chanchi Jose',
    seatId: '10',
    seatPrice: 60,
    ticketNumber: 'suc-code1_15-11-2022_44444555',
    travelDate: '20/11/2022',
    typeOfDocument: 'Carnet Identidad',
    typeOfSeat: 'semi-cama',
  },
  {
    branchNumber: 'code1',
    branchPhone: '64-64646',
    busEnrollment: 'bus-006',
    companyName: 'Sin Fronteras',
    departureTime: '21:30',
    destiny: 'c. santa cruz',
    identificationNumber: '7589632',
    issuingUser: 'santillan reyna ariel angel',
    lane: '0',
    legend: 'Gracias por su compra, le deseamos un buen viaje.',
    origin: 'sucre',
    passengerFullName: 'Aguilar Gustavo',
    seatId: '20',
    seatPrice: 100,
    ticketNumber: 'suc-code1_14-11-2022_7589632',
    travelDate: '20/11/2022',
    typeOfDocument: 'Carnet Identidad',
    typeOfSeat: 'cama',
  },
  {
    branchNumber: 'code1',
    branchPhone: '64-64646',
    busEnrollment: 'bus-006',
    companyName: 'Sin Fronteras',
    departureTime: '21:30',
    destiny: 'c. santa cruz',
    identificationNumber: '7481901',
    issuingUser: 'santillan reyna ariel angel',
    lane: '0',
    legend: 'Gracias por su compra, le deseamos un buen viaje.',
    origin: 'sucre',
    passengerFullName: 'Santillan Quispe Javier Angel',
    seatId: '7',
    seatPrice: 100,
    ticketNumber: 'suc-code1_15-11-2022_7481901',
    travelDate: '20/11/2022',
    typeOfDocument: 'Carnet Identidad',
    typeOfSeat: 'cama',
  },
  {
    branchNumber: 'code1',
    branchPhone: '64-64646',
    busEnrollment: 'bus-006',
    companyName: 'Sin Fronteras',
    departureTime: '21:30',
    destiny: 'c. santa cruz',
    identificationNumber: '7481902',
    issuingUser: 'santillan reyna ariel angel',
    lane: '0',
    legend: 'Gracias por su compra, le deseamos un buen viaje.',
    origin: 'sucre',
    passengerFullName: 'Santillan Reyna Cristian Andres',
    seatId: '12',
    seatPrice: 95,
    ticketNumber: 'suc-code1_15-11-2022_7481902',
    travelDate: '20/11/2022',
    typeOfDocument: 'Carnet Identidad',
    typeOfSeat: 'cama',
  },
];

let salesAmountData = {
  amountTotal: '30.00',
  description: 'Familia',
  discount: 100, //25
  discountCheckbox: true,
  subtotal: 55,
};

const countRepeatedArray = (dataArray) => {
  //Ejemplo dataArray:
  //   let dataArray = ['D', 'A', 'V', 'I', 'D'];

  let countRepeatedToJson = dataArray.reduce((count, element) => {
    count[element] = (count[element] || 0) + 1;
    return count;
  }, {});

  //   console.log('countRepeatedToJson', countRepeatedToJson);
  return countRepeatedToJson;
};
// countRepeatedArray(['D', 'A', 'V', 'I', 'D']);

const getKeyAndValueJson = (json) => {
  // Ejemplo de un JSON con distintos valores:
  //   let json = { valor1: 1, valor2: [1, 2, 3, 4], valor3: '3' };

  let keyAndValueArray = [];

  // Obteniendo todas las claves del JSON
  for (let clave in json) {
    // hasOwnProperty: Para controlar que el json realmente tenga esa propiedad
    if (json.hasOwnProperty(clave)) {
      //   console.log(`clave = ${clave} - valor = ${json[clave]}`);
      keyAndValueArray.push({ keyCode: clave, value: json[clave] });
    }
  }

  //   console.log('keyAndValueArray', keyAndValueArray);
  return keyAndValueArray;
};
// getKeyAndValueJson({ valor1: 1, valor2: [1, 2, 3, 4], valor3: '3' });

const incomeTicketsList = ({ ticketsSalesData }) => {
  let incomeTicketsList = [];

  let seatsPriceList = ticketsSalesData.map(
    (ticketData) => ticketData.seatPrice
  );

  let numTickets = countRepeatedArray(seatsPriceList);
  //   console.log('numTickets', numTickets);

  let keyAndValueList = getKeyAndValueJson(numTickets);
  //   console.log('keyAndValueList', keyAndValueList);

  keyAndValueList.map((data) => {
    let incomeTickets = {
      numTickets: data.value,
      priceTicket: data.keyCode,
      totalPrice: parseFloat(data.keyCode) * parseFloat(data.value),
    };

    incomeTicketsList.push(incomeTickets);

    return []; //opcional,  para que no marque problemas(advertencias) la funcion
  });

  //   console.log('incomeTicketsList', incomeTicketsList);
  return incomeTicketsList;
};

const soldTicketsDiscount = (salesAmountData) => {
  let { discount } =
    salesAmountData !== undefined ? salesAmountData : { discount: 0 };

  if (discount === '') {
    return 0;
  } else {
    return discount;
  }
};

export const getSalesIncome = ({ ticketsSalesData, salesAmountData }) => {
  let { travelDate, departureTime, busEnrollment } = ticketsSalesData[0];
  let tripMadeKey = travelKey({
    travelDate,
    departureTime,
    busEnrollment,
  });

  let incomeTicketsArray = incomeTicketsList({ ticketsSalesData });
  // console.log('incomeTicketsArray', incomeTicketsArray);

  let totalPriceList = incomeTicketsArray.map((data) => data.totalPrice);
  //   console.log('totalPriceList', totalPriceList);

  //reduce() para sumar los elemntos de "totalPriceList" y sacar totalAmountTickets;
  const initialValue = 0;
  let totalAmountTickets = totalPriceList.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );
  //   console.log('totalAmountTickets', totalAmountTickets);

  let totalAmountIncome =
    totalAmountTickets - parseFloat(soldTicketsDiscount(salesAmountData));
  //   console.log('totalAmountIncome', totalAmountIncome);

  let salesIncome = {
    incomeTickets: incomeTicketsArray,
    totalAmountTickets: totalAmountTickets,
    totalAmountIncome: totalAmountIncome,
    tripMadeKey: tripMadeKey,
  };

  console.log('salesIncome', salesIncome);
  return salesIncome;
};
getSalesIncome({ ticketsSalesData, salesAmountData });
