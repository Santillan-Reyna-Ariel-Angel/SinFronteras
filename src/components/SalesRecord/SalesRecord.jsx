import React, { useContext } from 'react';

//MUI:
// import {
//   TextField,
// } from '@mui/material/';
// Manejo de fechas:
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import {
//   LocalizationProvider,
//   TimePicker,
//   DatePicker,
// } from '@mui/x-date-pickers/';
// Manejo de Tablas:
import MUIDataTable from 'mui-datatables';
//Styles:
//Contexts:
import { ContextBranchTripsMade } from './../../contexts/ContextBranchTripsMade';

//Firebase Functions:
//States:
//Components:
//Others:

export const SalesRecord = () => {
  //ContextCompanyBuses:
  const branchTripsMade = useContext(ContextBranchTripsMade);
  // console.log('branchTripsMade', branchTripsMade);

  // json to array:
  let branchTripsMadeArray = [];
  for (let i in branchTripsMade) branchTripsMadeArray.push(branchTripsMade[i]);
  // console.log('branchTripsMadeArray', branchTripsMadeArray);

  let billingContactList_x_everyTravel = branchTripsMadeArray
    .filter((travel_x) => travel_x.passengers) //filtramos solo los viajes que tengan pasajeros
    .map((data) => data.passengers);
  // console.log(
  //   'billingContactList_x_everyTravel',
  //   billingContactList_x_everyTravel
  // );

  //billingContactAllList: Array objetos que sera la data de la tabla:
  let billingContactAllList = [];
  billingContactList_x_everyTravel.map((arrayOf_billingContact_x) => {
    for (let i in arrayOf_billingContact_x)
      billingContactAllList.push(arrayOf_billingContact_x[i]);
  });
  // console.log('billingContactAllList', billingContactAllList);

  let dataTableNecesary = [];
  let dataNecesaryAux1 = billingContactAllList.map((billingContact) => {
    let buyer = billingContact.billingContactInformation.nameOrSocialReason;
    let passengersAll = billingContact.ticketsSalesData;
    // json to array:
    let passengersList = [];
    for (let i in passengersAll) passengersList.push(passengersAll[i]);
    // console.log('passengersList', passengersList);

    return { buyer, passengersList };
  });
  // console.log('dataNecesaryAux1', dataNecesaryAux1);

  let dataNecesaryAux2 = dataNecesaryAux1.map((sale) => {
    let buyer = sale.buyer;

    let dataNecesary = sale.passengersList.map((passenger) => {
      let passengerData = {
        buyer,
        passenger: passenger.passengerFullName,
        identificationNumber: passenger.identificationNumber,
        ticketNumber: passenger.ticketNumber,
        destiny: passenger.destiny,
        travelDate: passenger.travelDate,
      };

      dataTableNecesary.push(passengerData);

      return passengerData;
    });

    return dataNecesary;
  });
  // console.log('dataNecesaryAux2', dataNecesaryAux2);
  console.log('dataTableNecesary', dataTableNecesary);

  //alternativa para unir array es usando concat(): const array3 = array1.concat(array2);

  const columns2 = [
    {
      name: 'buyer',
      label: 'Comprador',
      // options: {
      //   filter: true,
      //   sort: true,
      // },
    },
    {
      name: 'passenger',
      label: 'Pasajero',
      // options: {
      //   filter: true,
      //   sort: false,
      // },
    },
    {
      name: 'identificationNumber',
      label: 'CI Pasajero',
    },
    {
      name: 'ticketNumber',
      label: 'Codigo ticket',
    },
    {
      name: 'destiny',
      label: 'Destino',
    },
    {
      name: 'travelDate',
      label: 'Fecha Viaje',
    },
  ];

  const options = {
    filterType: 'checkbox',
  };

  return (
    <>
      <MUIDataTable
        title={'Registro de Ventas'}
        data={dataTableNecesary}
        columns={columns2}
        options={options}
      />
    </>
  );
};
