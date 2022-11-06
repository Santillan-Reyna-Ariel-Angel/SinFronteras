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
      options: {
        filter: false, // func para filtrar por la columna
        //sort: false, //funcionalidad para odernar la columna
      },
    },
    {
      name: 'identificationNumber',
      label: 'CI Pasajero',
      options: {
        filter: false, // func para filtrar por la columna
        //sort: false, //funcionalidad para odernar la columna
      },
    },
    {
      name: 'seatId',
      label: 'Asiento',
      options: {
        filter: false, // func para filtrar por la columna
        //sort: false, //funcionalidad para odernar la columna
      },
    },
    // {
    //   name: 'ticketNumber',
    //   label: 'Codigo ticket',
    // },
    {
      name: 'destiny',
      label: 'Destino',
    },
    {
      name: 'travelDate',
      label: 'Fecha Viaje',
    },
    {
      name: 'departureTime',
      label: 'Hora Viaje',
    },

    {
      name: 'btnTicket',
      label: 'Detalles',
      options: {
        filter: false, // func para filtrar por la columna
        sort: false, //funcionalidad para odernar la columna
      },
    },
  ];
  const options = {
    filterType: 'checkbox',
    download: false, //opcoon de descarga .csv
    downloadOptions: { filename: 'RegistroDeVentas.csv' },
    // jumpToPage: true, // para navegar a una paginas especifica
    // onRowClick: (rowData) => {
    //   console.log('rowData', rowData); // nos regresa info de la fila cliqueada
    // },
    rowsPerPageOptions: [10, 15, 20, 30, 50, 100], //numero de filas(registros) por paginas
    searchOpen: true,
    // searchAlwaysOpen: true, //se tendra el buscador siempre abierto(pero tabla el titulo de la tabla)
    // selectableRows: 'none', //single, multiple //indica si las filas pueden ser selecionadas

    selectableRowsHideCheckboxes: true, //muestra o no los check box
    ////////////////////////////////
    // IMPORTANTE SEGUIR REVISANDO DESDE LO SIGUIENTE:
    // tableBodyHeight:""
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
