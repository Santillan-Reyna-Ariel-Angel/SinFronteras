import { ref, set } from 'firebase/database';
import { modulesFirebase } from './../../../../firebase-config.js';
//Generar Key:
import {
  billingContactKey,
  travelKey,
} from './../Functions/TripsMadeGenerateKeys.js';
//functions:
import { dateFormat, timeFormat } from './../Functions/functions';

//Modulos Firebase:
const { fire_db } = modulesFirebase;

export const saveTripsMade = ({
  billingContactInformation,
  salesAmountData,
  ticketsSalesData,
}) => {
  //Fecha y Hora de venta:
  let NewDate = new Date();
  let saleDate = dateFormat({ date: NewDate, format: 'dd/mm/yyyy' });
  let timeOfSale = timeFormat({ newTime: NewDate, format: ':' });

  //Datos para Keys:
  let { travelDate, departureTime, busEnrollment, branchNumber } =
    ticketsSalesData[0];
  let { ciOrNit } = billingContactInformation;

  //travelKey = 'travel_19-7-2022_15-30_2269KUN';
  let travelKeyAux = travelKey({ travelDate, departureTime, busEnrollment });

  //billingContactKey = 'billingContact_19-7-2022_10-30_7481911';
  let billingContactKeyAux = billingContactKey({
    saleDate,
    timeOfSale,
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
      timeOfSale: timeOfSale,
    }
  );
};

//saveTripsMade({});
