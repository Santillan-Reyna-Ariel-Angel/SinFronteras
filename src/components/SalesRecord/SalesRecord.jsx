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
  console.log('branchTripsMadeArray', branchTripsMadeArray);

  let billingContactList_x_everyTravel = branchTripsMadeArray
    .filter((travel_x) => travel_x.passengers) //filtramos solo los viajes que tengan pasajeros
    .map((data) => data.passengers);
  console.log(
    'billingContactList_x_everyTravel',
    billingContactList_x_everyTravel
  );

  //billingContactAllList: Array objetos que sera la data de la tabla:
  let billingContactAllList = [];
  billingContactList_x_everyTravel.map((arrayOf_billingContact_x) => {
    for (let i in arrayOf_billingContact_x)
      billingContactAllList.push(arrayOf_billingContact_x[i]);
  });
  console.log('billingContactAllList', billingContactAllList);

  const columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'company',
      label: 'Company',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'city',
      label: 'City',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'state',
      label: 'State',
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const data = [
    { name: 'Joe James', company: 'Test Corp', city: 'Yonkers', state: 'NY' },
    { name: 'John Walsh', company: 'Test Corp', city: 'Hartford', state: 'CT' },
    { name: 'Bob Herm', company: 'Test Corp', city: 'Tampa', state: 'FL' },
    {
      name: 'James Houston',
      company: 'Test Corp',
      city: 'Dallas',
      state: 'TX',
    },
  ];

  const options = {
    filterType: 'checkbox',
  };

  return (
    <>
      <MUIDataTable
        title={'Employee List'}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
};
