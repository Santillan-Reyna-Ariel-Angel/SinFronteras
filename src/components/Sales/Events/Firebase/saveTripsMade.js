import { ref, set } from 'firebase/database';
import { modulesFirebase } from './../../../../firebase-config.js';
//Generar Key:
import {
  billingContactKey,
  travelKey,
} from './../Functions/TripsMadeGenerateKeys.js';

import { dataForPassengerTickets } from '../../Tickets/datos.js';
//Modulos Firebase:
const { fire_db } = modulesFirebase;

let BCI = {
  invoiceCheckbox: false,
  ciOrNit: '00000000',
  nameOrSocialReason: '',
  email: '',
  countryCode: '',
  mobile: '',
};

let SAD = {
  subtotal: 0,
  discountCheckbox: false,
  discount: '',
  description: '',
  amountTotal: 0,
};

export const saveTripsMade = ({
  billingContactInformation = BCI,
  salesAmountData = SAD,
  ticketsSalesData = dataForPassengerTickets,
}) => {
  //Fecha y Hora de venta:
  let date = new Date();
  let saleDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  let hourOfSale = date.getHours();
  let minuteOfSale =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  //Datos para Keys:
  let { travelDate, departureTime, busEnrollment, branchNumber } =
    ticketsSalesData[0];
  let { ciOrNit } = billingContactInformation;

  //travelKey = 'travel_19-7-2022_15-30_2269KUN';
  let travelKeyAux = travelKey({ travelDate, departureTime, busEnrollment });

  //billingContactKey = 'billingContact_19-7-2022_10-30_7481911';
  let billingContactKeyAux = billingContactKey({
    saleDate,
    hourOfSale,
    minuteOfSale,
    ciOrNit,
  });

  //arrayToJson:
  let ticketsSalesDataAux = {};
  ticketsSalesData.forEach((passenger) => {
    let passengerKey = `passenger_${passenger.identificationNumber}`;

    ticketsSalesDataAux = {
      ...ticketsSalesDataAux,
      [passengerKey]: passenger,
    };
  });

  //Enviar Datos a BD:
  set(
    ref(
      fire_db,
      `tripsMade/branch_${branchNumber}/${travelKeyAux}/passengers/${billingContactKeyAux}/`
    ),
    {
      billingContactInformation: billingContactInformation,
      salesAmountData: salesAmountData,
      ticketsSalesData: ticketsSalesDataAux,
      saleDate: saleDate,
      timeOfSale: `${hourOfSale}:${minuteOfSale}`,
    }
  );
};

//saveTripsMade({});
