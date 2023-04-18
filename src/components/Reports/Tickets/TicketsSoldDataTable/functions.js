import { PrintTicketsSold } from './../TicketsSold/PrintTicketsSold';
import { DialogBasic } from './../../../DialogBasic/DialogBasic';
import {
  dateFormat,
  getNextDate_ddMMYYYY,
  travelKeyGlobal,
} from './../../../globalFunctions';

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

  billingContactList_x_everyTravelAux.forEach((arrayOf_billingContact_x) => {
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
  // console.log('ticketsSoldByBuyer', ticketsSoldByBuyer);

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
        busEnrollment,
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
        busEnrollment,
        //boton "ticket" de la tabla "LISTA DE PASAJES VENDIDOS":
        btnTicket: (
          <DialogBasic
            primaryBtnText="ticket"
            componentView={<PrintTicketsSold ticketDataProps={passenger} />}
          />
        ),
      };

      dataTableNecesary.push(passengerData);

      return passengerData;
    });

    return dataNecesary;
  });

  console.log('dataTableNecesary', dataTableNecesary);

  return dataTableNecesary;
};

export const getTravelKeysList_yesterdayAndTodayTrips = ({
  identificationNumber,
  travelsList,
}) => {
  let todayDate = new Date();

  const formattedTodayDate = dateFormat({
    date: todayDate,
    format: 'dd/mm/yyyy',
  }); // esto es mucho mejor que usar: todayDate.toLocaleDateString();
  // console.log('formattedTodayDate: ', formattedTodayDate);

  let travelsFiltered = travelsList.filter(
    (travel) =>
      travel.bus.identificationNumberDriver === identificationNumber &&
      (travel.travelDate === formattedTodayDate ||
        getNextDate_ddMMYYYY(travel.travelDate) === formattedTodayDate) //filtramos los viajes DEL DIA ANTERIOR Y DEL DIA ACTUAL
  );

  let travelKeysList = travelsFiltered.map((travel) => {
    let { travelDate, departureTime, busEnrollment } = travel;

    let travelKey = travelKeyGlobal({
      travelDate,
      departureTime,
      busEnrollment,
    });

    return travelKey;
  });

  return travelKeysList;
};

export const getFilteredDataByUserRole = ({
  charge,
  data,
  travelKeysList_yesterdayAndTodayTrips,
}) => {
  let newData = [];
  if (charge === 'chofer') {
    data.forEach((passenger) => {
      let { travelDate, departureTime, busEnrollment } = passenger;

      let travelKey_passenger = travelKeyGlobal({
        travelDate,
        departureTime,
        busEnrollment,
      });

      travelKeysList_yesterdayAndTodayTrips.forEach((travelKey) => {
        if (travelKey === travelKey_passenger) {
          newData.push(passenger);
        }
      });
    });
  } else {
    newData = data;
  }

  return newData;
};
