// Notas:
// hora UTC Bolivia: 'UTC-4'

export const travelKey = ({
  travelDate = '00/00/0000',
  departureTime = '00:00',
  busEnrollment = '0000MATRICULA',
}) => {
  //  travel_fechaViaje_horaViaje_matricula => travel_19-7-2022_15-30_2269KUN

  let travelDateAux = travelDate.replaceAll('/', '-');
  let departureTimeAux = departureTime.replaceAll(':', '-');

  let travelKey = `travel_${travelDateAux}_${departureTimeAux}_${busEnrollment}`;
  //console.log('travelKey:', travelKey);
  return travelKey;
};

export const billingContactKey = ({
  saleDate = '00/00/0000',
  timeOfSale = '00:00',
  ciOrNit = '00000000',
}) => {
  // billingContact_fechaVenta_horaVenta_ciOrNit => billingContact_19-7-2022_10-30_7481911

  let saleDateAux = saleDate.replaceAll('/', '-');
  let timeOfSaleAux = timeOfSale.replaceAll(':', '-');

  let billingContactKey = `billingContact_${saleDateAux}_${timeOfSaleAux}_${ciOrNit}`;
  //console.log('billingContactKey:', billingContactKey);
  return billingContactKey;
};
