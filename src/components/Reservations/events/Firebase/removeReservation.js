import { remove, ref } from 'firebase/database';
import { modulesFirebase } from './../../../../firebase-config.js';

export const removeReservation = ({
  branchNumber,
  travelKey,
  seatsList,
  buyerId,
}) => {
  const { fire_db } = modulesFirebase;

  seatsList.forEach((seatId) => {
    //Eliminar asiento en BD segun "seatId":
    remove(
      ref(
        fire_db,
        `tripsMade/branch_${branchNumber}/${travelKey}/occupiedSeat/${seatId}/`
      )
    );
  });

  //Eliminar del nodo reserveSeats
  remove(
    ref(
      fire_db,
      `tripsMade/branch_${branchNumber}/${travelKey}/reserveSeats/${buyerId}/`
    )
  );
};
