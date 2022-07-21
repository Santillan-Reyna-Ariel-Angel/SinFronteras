// travel_19-7-2022_15-30_1000-asd

const travelKey = ({
  travelDate = '19/7/2022',
  departureTime = '15:30',
  enrollment = '1000-asd',
}) => {
  let travelDateAux = travelDate.replaceAll('/', '-');
  let departureTimeAux = departureTime.replaceAll(':', '-');

  let travelKey = `travel_${travelDateAux}_${departureTimeAux}_${enrollment}`;
  console.log('travelKey:', travelKey);
};
travelKey({});
