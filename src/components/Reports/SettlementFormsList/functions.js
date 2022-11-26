import { ReactToPrintComponent2 } from './../../Sales/Tickets/Tickets3/ReactToPrintComponent/ReactToPrintComponent2';
import { PlainModalButton } from './../../PlainModalButton/PlainModalButton';

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

    return []; //opcional,  para que no marque problemas(advertencias) la funcion
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
        btnTicket: (
          <PlainModalButton
            primaryBtnText="ticket"
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

export const getTravelIncomeList = (branchTripsMadeArray) => {
  let travelIncomeList = branchTripsMadeArray.map((data) => {
    let {
      travelIncome,
      travelExpenses: { tripMadeKey },
    } = data;

    let existingProperty = travelIncome.hasOwnProperty('incomeTickets'); // Se verifica si existe la propiedad, false=Np se tienen ningun registro de venta
    // console.log('existingProperty', existingProperty);

    let travelIncomeData; //La data para ser devuelta
    if (existingProperty === false) {
      travelIncomeData = {
        ...travelIncome,
        incomeTickets: existingProperty ? travelIncome.incomeTickets : [],
      };
    } else {
      travelIncomeData = {
        ...travelIncome,
      };
    }

    return { travelIncome: travelIncomeData, tripMadeKey: tripMadeKey };
  });

  return travelIncomeList;
};
