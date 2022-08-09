import { update, ref } from 'firebase/database';
import { modulesFirebase } from './../../../../firebase-config.js';
import { travelKey } from './../Functions/TripsMadeGenerateKeys.js';

export const updateOccupiedSeat = ({
  branchNumber,
  dataBusTravel,
  seatId,
  seatState,
  identificationNumberUser,
}) => {
  const { fire_db } = modulesFirebase;
  let {
    travelDate,
    departureTime,
    bus: { enrollment: busEnrollment },
  } = dataBusTravel;

  // travelKeyAux = 'travel_7-8-2022_21-30_bus-006';
  let travelKeyAux = travelKey({ travelDate, departureTime, busEnrollment });

  //Actualiza el estado del asiento a "vendido" en la BD segun "seatId":
  update(
    ref(
      fire_db,
      `tripsMade/branch_${branchNumber}/${travelKeyAux}/occupiedSeat/`
    ),
    { [seatId]: `${seatState}-${identificationNumberUser}` } //el valor al actualizar cada asiento
  );
};

//updateOccupiedSeat({});
