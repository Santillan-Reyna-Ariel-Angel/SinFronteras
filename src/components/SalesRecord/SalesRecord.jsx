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

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
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
//Styles Manejo de Tablas:
const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

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
        // searchable: false, // se indica si text de la columna podra encontrarse por el buscador
        // viewColumns: false, // func para añadir/quitar a la lista de columnas(de la barra de herramientas)
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
        print: false, //Esto deberia hacer que se omita esta columna para la impresion
      },
    },
  ];
  const options = {
    filterType: 'multiselect', //cuadroDialogo filtro: checkbox , multiselect(movil bien), dropdown(movil regular)
    download: false, //opcion de descarga .csv
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
    tableBodyHeight: 'auto', // "50px", "100%"
    // viewColumns: false, // func para mostrar/oculta columnas
    elevation: 0, //ancho de sombrea de la tabla (0-24)
    responsive: 'vertical', //simple(imp bien) vertical(imp bien) standard(imp mal) //IMPORTENTE: ESTO AFECTA A LA IMPRESION
  };

  //Styles Manejo de Tablas:
  const getMuiTheme = () =>
    createTheme({
      components: {
        MuiTableCell: {
          //desde aqui controlaremos el padding de cada(todas) celda
          styleOverrides: {
            root: {
              paddingTop: '5px',
              paddingBottom: '5px',
              paddingLeft: '5px',
              paddingRight: '5px',
            },
          },
        },
        MUIDataTableBodyCell: {
          //desde aqui controlaremos el color de cada(todas) celda
          styleOverrides: {
            root: {
              backgroundColor: '#9ca3af', //#051E34 , #00bdb2 rgb(102, 157, 246)
            },
          },
        },
      },
    });

  return (
    <>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={'Registro de Ventas'}
            data={data}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};
