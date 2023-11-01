import { set, ref } from 'firebase/database';
import { modulesFirebase } from '../../../../firebase-config.js';

export const addReserveSeat = ({
  branchNumber,
  travelKey,
  seatId,
  seatState,
  identificationNumberUser,
}) => {
  const { fire_db } = modulesFirebase;

  //Enviar Datos a BD:
  set(
    ref(
      fire_db,
      `tripsMade/branch_${branchNumber}/${travelKey}/occupiedSeat/${seatId}/`
    ),
    `${seatState}-${identificationNumberUser}` //el valor que tendra cada asiento al crearse
  );
};

// addReserveSeat({
//   branchNumber,
//   dataBusTravel,
//   seatId,
//   seatState: 'preventa',
//   identificationNumberUser,
// });
