// Notas:
// hora UTC Bolivia: 'UTC-4'
// console.log(d.toLocaleDateString());
// console.log(d.getHours()); //Al sacar hora del sistema, se corre el riesgo de que podria ser cambiado por el usuario y seria mas complejo una busqueda

const travelKey = ({
  travelDate = '19/7/2022',
  departureTime = '15:30',
  enrollment = '2269KUN',
}) => {
  //  travel_fecha_hora_matricula => travel_19-7-2022_15-30_2269KUN

  let travelDateAux = travelDate.replaceAll('/', '-');
  let departureTimeAux = departureTime.replaceAll(':', '-');

  let travelKey = `travel_${travelDateAux}_${departureTimeAux}_${enrollment}`;
  console.log('travelKey:', travelKey);
};
travelKey({});

const generateKeys = ({
  travelDate = '19/7/2022',
  identificationNumber = '7481911',
}) => {
  // passenger_fecha_horaVenta_ci => passenger_19-7-2022_10-30_7481911
  // billingContact_fecha_horaVenta_ci => billingContact_19-7-2022_10-30_7481911

  let travelDateAux = travelDate.replaceAll('/', '-');
  let date = new Date();
  let timeOfSale = `${date.getHours()}-${date.getMinutes()}`;

  let billingContactKey = `billingContact_${travelDateAux}_${timeOfSale}_${identificationNumber}`;
  let passengerKey = `passenger_${travelDateAux}_${timeOfSale}_${identificationNumber}`;
  console.log('billingContactKey:', billingContactKey);
  console.log('passengerKey:', passengerKey);
  return { billingContactKey, passengerKey };
};
generateKeys({});
