import { DialogBasic } from '../../../DialogBasic/DialogBasic';
import { TravelExpenses } from '../../../Travels/TravelExpenses/TravelExpenses';
// import { PrintSettlementForm } from '../SettlementForm/PrintSettlementForm';
import {
  dateFormat,
  //  travelKeyGlobal
  getNextDate_ddMMYYYY,
} from './../../../globalFunctions';
import { PdfSettlementForms } from './../../PdfGenerate/PdfSettlementForms';
import { PdfPassengerManifest } from './../../PdfGenerate/PdfPassengerManifest';

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

export const getDataTableNecesary = ({ newSettlementDataList }) => {
  let dataTableNecesary = newSettlementDataList.map((settlementData) => {
    return {
      formCode: settlementData.formCode,
      busEnrollment: settlementData.travelExpenses.busEnrollment,
      destiny: settlementData.destiny,
      totalAmountIncome: settlementData.travelIncome.totalAmountIncome,
      totalExpenses: settlementData.travelExpenses.totalExpenses,
      totalSettlement: settlementData.totalSettlement,
      travelDate: settlementData.travelDate, // '24/01/2021',
      departureTime: settlementData.departureTime,
      identificationNumberDriver: settlementData.identificationNumberDriver,

      btnExpenses: (
        <DialogBasic
          primaryBtnText="act. egresos"
          componentView={
            <TravelExpenses tripMadeKey={settlementData.formCode} />
          }
        />
      ),
      // btnSettlementForm: (
      //   <DialogBasic
      //     primaryBtnText="ver planilla"
      //     componentView={
      //       <PrintSettlementForm settlementFormData={settlementData} />
      //     }
      //   />
      // ),

      //new boton:
      btnSettlementFormv2: (
        <DialogBasic
          primaryBtnText="ver planilla"
          componentView={
            <PdfSettlementForms settlementFormsProps={settlementData} />
          }
        />
      ),

      //new boton:
      btnPassengerManifest: (
        <DialogBasic
          primaryBtnText=" pasajeros"
          componentView={<PdfPassengerManifest passengerManifestProps={null} />}
        />
      ),
    };
  });
  // console.log('dataTableNecesary', dataTableNecesary);

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

export const getFilteredDataByUserRole = ({
  charge,
  identificationNumber,
  data,
}) => {
  if (charge === 'chofer') {
    let todayDate = new Date();

    const formattedTodayDate = dateFormat({
      date: todayDate,
      format: 'dd/mm/yyyy',
    });
    // console.log('formattedTodayDate: ', formattedTodayDate);

    let travelsYesterdayAndTodayList = data.filter(
      (travel) =>
        travel.identificationNumberDriver === identificationNumber &&
        (travel.travelDate === formattedTodayDate ||
          getNextDate_ddMMYYYY(travel.travelDate) === formattedTodayDate) //getNextDate_ddMMYYYY(travel.travelDate) para que muestre los viajes del dia anterior
    );

    return travelsYesterdayAndTodayList;
  } else {
    return data;
  }
};

export const getFilteredColumnsByUserRole = ({ charge, columns }) => {
  let columnsFilteredByUserRole = [];

  if (charge === 'chofer') {
    columnsFilteredByUserRole = columns.filter(
      (column) => column.name !== 'btnSettlementForm'
    );
  } else {
    // otros usuarios:
    columnsFilteredByUserRole = columns;
  }

  return columnsFilteredByUserRole;
};
