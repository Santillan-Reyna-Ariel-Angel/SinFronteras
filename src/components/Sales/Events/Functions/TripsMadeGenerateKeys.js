// Notas:
// hora UTC Bolivia: 'UTC-4'

export const travelKey = ({
  travelDate = '19/7/2022',
  departureTime = '15:30',
  busEnrollment = '2269KUN',
}) => {
  //  travel_fechaViaje_horaViaje_matricula => travel_19-7-2022_15-30_2269KUN

  let travelDateAux = travelDate.replaceAll('/', '-');
  let departureTimeAux = departureTime.replaceAll(':', '-');

  let travelKey = `travel_${travelDateAux}_${departureTimeAux}_${busEnrollment}`;
  //console.log('travelKey:', travelKey);
  return travelKey;
};

export const billingContactKey = ({
  saleDate = '19/7/2022',
  hourOfSale = '10',
  minuteOfSale = '00',
  ciOrNit = '7481911',
}) => {
  // billingContact_fechaVenta_horaVenta_ciOrNit => billingContact_19-7-2022_10-30_7481911

  let saleDateAux = saleDate.replaceAll('/', '-');
  let timeOfSale = `${hourOfSale}-${minuteOfSale}`;

  let billingContactKey = `billingContact_${saleDateAux}_${timeOfSale}_${ciOrNit}`;
  //console.log('billingContactKey:', billingContactKey);
  return billingContactKey;
};
