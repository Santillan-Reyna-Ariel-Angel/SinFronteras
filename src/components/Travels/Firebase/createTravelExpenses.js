import { ref, set } from 'firebase/database';
import { modulesFirebase } from './../../../firebase-config.js';
//Modulos Firebase:
const { fire_db } = modulesFirebase;

export const createTravelExpenses = ({ travelExpensesData, branchNumber }) => {
  let { tripMadeKey, busEnrollment, expenses, totalExpenses } =
    travelExpensesData;

  set(
    ref(
      fire_db,
      `tripsMade/branch_${branchNumber}/${tripMadeKey}/travelExpenses/`
    ),
    {
      busEnrollment,
      expenses,
      totalExpenses,
    }
  );
};
