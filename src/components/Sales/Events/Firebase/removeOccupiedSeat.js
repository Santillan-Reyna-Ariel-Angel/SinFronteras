import { remove, ref } from 'firebase/database';
import { modulesFirebase } from './../../../../firebase-config.js';
import { travelKey } from './../Functions/TripsMadeGenerateKeys.js';

export const removeOccupiedSeat = ({ branchNumber, dataBusTravel, seatId }) => {
  const { fire_db } = modulesFirebase;
  let {
    travelDate,
    departureTime,
    // bus: { enrollment: busEnrollment }, // busEnrollment se saca directamente de dataBusTravel
    busEnrollment,
  } = dataBusTravel;

  // travelKeyAux = 'travel_31-7-2022_21-30_bus-006';
  let travelKeyAux = travelKey({ travelDate, departureTime, busEnrollment });

  //Eliminar asiento en BD segun "seatId":
  remove(
    ref(
      fire_db,
      `tripsMade/branch_${branchNumber}/${travelKeyAux}/occupiedSeat/${seatId}/`
    )
  );
};

//removeOccupiedSeat({});
