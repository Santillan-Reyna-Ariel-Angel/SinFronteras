import Button from '@mui/material/Button';
import { ReactToPrintComponent2 } from './../Sales/Tickets/Tickets3/ReactToPrintComponent/ReactToPrintComponent2';
import { PlainModalButton } from './../PlainModalButton/PlainModalButton';

//alternativa para unir array es usando concat(): const array3 = array1.concat(array2);

export const billingContactList_x_everyTravel = ({ branchTripsMadeArray }) => {
  let billingContactList_x_everyTravel = branchTripsMadeArray
    .filter((travel_x) => travel_x.passengers) //filtramos solo los viajes que tengan pasajeros
    .map((data) => data.passengers);
  // console.log(
  //   'billingContactList_x_everyTravel',
  //   billingContactList_x_everyTravel
  // );

  return billingContactList_x_everyTravel;
};

export const billingContactAllList = ({
  billingContactList_x_everyTravelAux,
}) => {
  let billingContactAllList = [];
  billingContactList_x_everyTravelAux.map((arrayOf_billingContact_x) => {
    for (let i in arrayOf_billingContact_x)
      billingContactAllList.push(arrayOf_billingContact_x[i]);
  });
  //   console.log('billingContactAllList', billingContactAllList);

  return billingContactAllList;
};

export const ticketsSoldByBuyer = ({ billingContactAllListAux }) => {
  let ticketsSoldByBuyer = billingContactAllListAux.map((billingContact) => {
    let buyer = billingContact.billingContactInformation.nameOrSocialReason;
    let passengersAll = billingContact.ticketsSalesData;
    // json to array:
    let passengersList = [];
    for (let i in passengersAll) passengersList.push(passengersAll[i]);
    // console.log('passengersList', passengersList);

    return { buyer, passengersList };
  });
  console.log('ticketsSoldByBuyer', ticketsSoldByBuyer);

  return ticketsSoldByBuyer;
};

export const dataTableNecesary = ({ ticketsSoldByBuyerAux }) => {
  let dataTableNecesary = [];

  ticketsSoldByBuyerAux.map((sale) => {
    let buyer = sale.buyer;

    let dataNecesary = sale.passengersList.map((passenger) => {
      let {
        passengerFullName,
        identificationNumber,
        seatId,
        // ticketNumber,
        destiny,
        travelDate,
        departureTime,
      } = passenger;

      let passengerData = {
        buyer,
        passengerFullName,
        identificationNumber,
        seatId,
        // ticketNumber,
        destiny,
        travelDate,
        departureTime,
        btn: (
          <PlainModalButton
            primaryBtnText="ver ticket"
            dialogTitle=""
            dialogText=""
            closeBtnText="cancelar"
            continueBtnText="ok"
            componentView={
              <ReactToPrintComponent2 ticketDataProps={passenger} />
            }
          />
        ), //<Button variant="contained">Contained</Button>, // <ReactToPrintComponent2 />,
      };

      dataTableNecesary.push(passengerData);

      return passengerData;
    });

    return dataNecesary;
  });

  console.log('dataTableNecesary', dataTableNecesary);

  return dataTableNecesary;
};
