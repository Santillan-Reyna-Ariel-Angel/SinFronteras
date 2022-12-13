import { ref, update } from 'firebase/database';
import { modulesFirebase } from '../../../firebase-config.js';
//Modulos Firebase:
const { fire_db } = modulesFirebase;

export const updateTravelExpenses = ({ travelExpensesData, branchNumber }) => {
  // let { tripMadeKey, busEnrollment, expenses, totalExpenses } =
  //   travelExpensesData;

  let { tripMadeKey } = travelExpensesData;

  //update, por que al crear el viaje(createTripSchedule) YA CREA travelExpenses{} con defaultData.
  update(
    ref(
      fire_db,
      `tripsMade/branch_${branchNumber}/${tripMadeKey}/travelExpenses/`
    ),
    {
      // busEnrollment,
      // expenses,
      // totalExpenses,

      ...travelExpensesData,
    }
  );
};
