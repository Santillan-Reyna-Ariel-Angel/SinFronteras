import { set, ref } from 'firebase/database';
import { modulesFirebase } from '../../../../../firebase-config.js';

export const addReservationData = ({
  branchNumber,
  travelKey,
  buyerData,
  seats,
  userData,
}) => {
  const { fire_db } = modulesFirebase;

  // Datos para nodo reservas:
  set(
    ref(
      fire_db,
      `tripsMade/branch_${branchNumber}/${travelKey}/reserveSeats/${buyerData.ciOrNit}/`
    ),
    {
      buyerData: buyerData,
      seats: seats,
      userData: userData,
    }
  );
};
