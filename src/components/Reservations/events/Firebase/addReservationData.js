import { set, ref } from 'firebase/database';
import { modulesFirebase } from './../../../../firebase-config.js';
import {
  currentDateTime_ddMMyyyy_HHmm,
  addMinutesToCurrentDateTime,
} from './../../../globalFunctions.js';

export const addReservationData = ({
  branchNumber,
  travelKey,
  buyerData,
  seats,
  userData,
  travelInfo,
}) => {
  const { fire_db } = modulesFirebase;

  let reservationCreationDateTime = currentDateTime_ddMMyyyy_HHmm();
  let reservationTimeLimitDateTime = addMinutesToCurrentDateTime(
    buyerData.reservationTime
  );

  // Datos para nodo reservas:
  set(
    ref(
      fire_db,
      `tripsMade/branch_${branchNumber}/${travelKey}/reserveSeats/${buyerData.ciOrNit}/`
    ),
    {
      buyerData: {
        ...buyerData,
        reservationCreationDateTime,
        reservationTimeLimitDateTime,
      },
      seats: seats,
      userData: userData,
      tripMadeKey: travelKey,
      travelInfo,
    }
  );
};
