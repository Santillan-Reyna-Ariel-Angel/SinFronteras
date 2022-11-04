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
import {
  billingContactList_x_everyTravel,
  billingContactAllList,
  ticketsSoldByBuyer,
  dataTableNecesary,
} from './functions';

export const SalesRecord = () => {
  //ContextCompanyBuses:
  const branchTripsMade = useContext(ContextBranchTripsMade);
  // console.log('branchTripsMade', branchTripsMade);

  // json to array:
  let branchTripsMadeArray = [];
  for (let i in branchTripsMade) branchTripsMadeArray.push(branchTripsMade[i]);
  // console.log('branchTripsMadeArray', branchTripsMadeArray);

  let billingContactList_x_everyTravelAux = billingContactList_x_everyTravel({
    branchTripsMadeArray,
  });

  let billingContactAllListAux = billingContactAllList({
    billingContactList_x_everyTravelAux,
  });

  let ticketsSoldByBuyerAux = ticketsSoldByBuyer({ billingContactAllListAux });

  //Datos necesarios para llenar la tabla:
  const data = dataTableNecesary({ ticketsSoldByBuyerAux });
  const columns = [
    {
      name: 'buyer',
      label: 'Comprador',
      // options: {
      //   filter: true,
      //   sort: true,
      // },
    },
    {
      name: 'passengerFullName',
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
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
};
