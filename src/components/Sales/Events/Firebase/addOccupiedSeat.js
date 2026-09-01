import { set, ref } from 'firebase/database';
import { modulesFirebase } from './../../../../firebase-config.js';
import { travelKey } from './../Functions/TripsMadeGenerateKeys.js';

export const addOccupiedSeat = ({
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
    //  bus: { enrollment: busEnrollment }, // busEnrollment se saca directamente de dataBusTravel
    busEnrollment,
  } = dataBusTravel;

  // travelKeyAux = 'travel_31-7-2022_21-30_bus-006';
  let travelKeyAux = travelKey({ travelDate, departureTime, busEnrollment });

  //Enviar Datos a BD:
  set(
    ref(
      fire_db,
      `tripsMade/branch_${branchNumber}/${travelKeyAux}/occupiedSeat/${seatId}/`
    ),
    `${seatState}-${identificationNumberUser}` //el valor que tendra cada asiento al crearse
  );
};

//addOccupiedSeat({});
