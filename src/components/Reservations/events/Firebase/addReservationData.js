import { set, ref } from 'firebase/database';
import { modulesFirebase } from './../../../../firebase-config.js';
import { currentDateTime_ddMMyyyy_HHmm } from './../../../globalFunctions.js';

export const addReservationData = ({
  branchNumber,
  travelKey,
  buyerData,
  seats,
  userData,
}) => {
  const { fire_db } = modulesFirebase;

  let reservationCreationDateTime = currentDateTime_ddMMyyyy_HHmm();

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
      },
      seats: seats,
      userData: userData,
      tripMadeKey: travelKey,
    }
  );
};
