import { update, ref } from 'firebase/database';
import { modulesFirebase } from './../../../../firebase-config.js';

let defaultTravelIncomeBd = {
  travelIncome: {
    incomeTickets: [],
    totalAmountIncome: 0,
    totalAmountTickets: 0,
  },
  tripMadeKey: 'travel_30-11-2022_21-30_bus-006',
};
let updateTravelIncomeBd = {
  travelIncome: {
    incomeTickets: [
      {
        numTickets: 1,
        priceTicket: '96',
        totalPrice: 96,
      },
      {
        numTickets: 1,
        priceTicket: '94',
        totalPrice: 94,
      },
    ],
    totalAmountIncome: 150,
    totalAmountTickets: 190,
  },
  tripMadeKey: 'travel_30-11-2022_21-30_bus-006',
};
let branchNumber = 'code1';
export const updateTravelIncome = ({ branchNumber, updateTravelIncomeBd }) => {
  const { fire_db } = modulesFirebase;
  let { travelIncome, tripMadeKey } = updateTravelIncomeBd;

  update(
    ref(
      fire_db,
      `tripsMade/branch_${branchNumber}/${tripMadeKey}/travelIncome/`
    ),
    { ...travelIncome }
  );
};

updateTravelIncome({ branchNumber, updateTravelIncomeBd });
