import { getDatabase, ref, set } from 'firebase/database';

// import { dataForPassengerTickets } from '../../Tickets/datos.js';

let BCI = {
  invoiceCheckbox: false,
  ciOrNit: '',
  nameOrSocialReason: '',
  email: '',
  countryCode: '',
  mobile: '',
};

let SAD = {
  subtotal: 100,
  discountCheckbox: false,
  discount: '',
  description: '',
  amountTotal: 100,
};

const saveTripsMade = ({
  branchNumber = '1',
  travelKey = 'travel_19-7-2022_15-30_2269KUN',
  billingContactKey = 'billingContact_19-7-2022_10-30_7481911',
  billingContactInformation = BCI,
  salesAmountData = SAD,
  // ticketsSalesData = dataForPassengerTickets,
}) => {
  const db = getDatabase();
  set(
    ref(
      db,
      `tripsMade/branch_${branchNumber}/${travelKey}/passengers/${billingContactKey}/`
    ),
    {
      billingContactInformation: billingContactInformation,
      salesAmountData: salesAmountData,
      // ticketsSalesData: ticketsSalesData,
    }
  );
};

saveTripsMade({});
