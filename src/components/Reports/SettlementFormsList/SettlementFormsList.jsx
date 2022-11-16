import React, { useContext } from 'react';

// MUI:
// Manejo de Tablas:
import MUIDataTable from 'mui-datatables';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import { muiCache, getMuiTheme } from './themeDataTable';
//Styles:
import { Background, BodyContainer } from './SettlementFormsListStyles';
//Contexts:
import { ContextBranchTripsMade } from './../../../contexts/ContextBranchTripsMade';
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

export const SettlementFormsList = () => {
  let settlementData = {
    companyName: '', //Sin Fronteras
    formCode: '', //004121
    origin: '', //Sucre
    destiny: '', //Santa Cruz
    incomeTickets: [
      {
        numTickets: 2,
        priceTicket: 100,
        totalPrice: 200,
      },
    ],
    totalAmountTickets: 2430,
    totalAmountIncome: 2430,
    //travelExpenses.jsx :
    busEnrollment: '',
    tripMadeKey: '',
    expenses: {
      diesel: '0',
      toll: '0',
      viaticos: '0',
      washed: '0',
      laborUnion: '0',
      others: '0',
      otherDescription: '',
    },
    totalExpenses: 402, //Por default numerico

    TotalSettlement: 2078,
    date: '', //  24/01/2021 //TravelDate?
  };
  console.log('settlementData:', settlementData);

  //ContextCompanyBuses:
  const branchTripsMade = useContext(ContextBranchTripsMade);
  console.log('branchTripsMade', branchTripsMade);

  // json to array:
  let branchTripsMadeArray = [];
  for (let i in branchTripsMade) branchTripsMadeArray.push(branchTripsMade[i]);
  console.log('branchTripsMadeArray', branchTripsMadeArray);

  let billingContactList_x_everyTravelAux = billingContactList_x_everyTravel({
    branchTripsMadeArray,
  });
  console.log(
    'billingContactList_x_everyTravelAux',
    billingContactList_x_everyTravelAux
  );

  let billingContactAllListAux = billingContactAllList({
    billingContactList_x_everyTravelAux,
  });
  console.log('billingContactAllListAux', billingContactAllListAux);

  let ticketsSoldByBuyerAux = ticketsSoldByBuyer({ billingContactAllListAux });
  console.log('ticketsSoldByBuyerAux', ticketsSoldByBuyerAux);

  //New getData:
  let travelExpensesArray = branchTripsMadeArray.map((data) => {
    let dataAux = {
      formCode: data.travelExpenses.tripMadeKey,
      totalExpenses: data.travelExpenses.totalExpenses,
    };
    return dataAux;
  });
  console.log('travelExpensesArray', travelExpensesArray);

  let uniqueCollection = new Set();
  ticketsSoldByBuyerAux.map((data) => {
    let dataAux = {
      destiny: data.passengersList[0].destiny,
      date: data.passengersList[0].travelDate,
    };

    uniqueCollection.add(JSON.stringify(dataAux)); // JSON.stringify(obj) convierte un {} a string

    return dataAux;
  });

  const uniqueCollectionArrayStrings = Array.from(uniqueCollection); // Convierte el objeto Se (new Set()) en un Array
  console.log('uniqueCollectionArrayStrings', uniqueCollectionArrayStrings);
  const uniqueCollectionArrayObjs = uniqueCollectionArrayStrings.map((data) =>
    JSON.parse(data)
  ); //JSON.parse(stringObj) convierte un string a un {}
  console.log('uniqueCollectionArrayObjs', uniqueCollectionArrayObjs);

  //Datos necesarios para llenar la tabla:
  const data = [
    {
      formCode: '004121',
      destiny: 'Santa Cruz',
      totalAmountIncome: 2430,
      totalExpenses: 402,
      TotalSettlement: 2078,
      date: '24/01/2021', //TravelDate?
      departureTime: '08:30',
    },
  ];
  const columns = [
    {
      name: 'formCode',
      label: 'Codigo',
    },
    {
      name: 'destiny',
      label: 'Destino',
      //   options: {
      //     filter: false, // func para filtrar por la columna
      //     //sort: false, //funcionalidad para odernar la columna
      //   },
    },
    {
      name: 'totalAmountIncome',
      label: 'Total Ingreso',
      //   options: {
      //     filter: false, // func para filtrar por la columna
      //     //sort: false, //funcionalidad para odernar la columna
      //   },
    },
    {
      name: 'totalExpenses',
      label: 'Total Egreso',
      //   options: {
      //     filter: false, // func para filtrar por la columna
      //     //sort: false, //funcionalidad para odernar la columna
      //     // searchable: false, // se indica si text de la columna podra encontrarse por el buscador
      //     // viewColumns: false, // func para añadir/quitar a la lista de columnas(de la barra de herramientas)
      //   },
    },
    {
      name: 'TotalSettlement',
      label: 'Total Liquidacion',
    },
    {
      name: 'date',
      label: 'Fecha Viaje',
    },
    {
      name: 'departureTime',
      label: 'Hora Viaje',
    },
    // {
    //   name: 'btnTicket',
    //   label: 'Detalles',
    //   options: {
    //     filter: false, // func para filtrar por la columna
    //     sort: false, //funcionalidad para odernar la columna
    //     print: false, //Esto deberia hacer que se omita esta columna para la impresion
    //   },
    // },
  ];
  const options = {
    filterType: 'multiselect', //cuadroDialogo filtro: checkbox , multiselect(movil bien), dropdown(movil regular)
    download: false, //opcion de descarga .csv
    downloadOptions: { filename: 'RegistroDeVentas.csv' },
    // jumpToPage: true, // para navegar a una paginas especifica
    // onRowClick: (rowData) => {
    //   console.log('rowData', rowData); // nos regresa info de la fila cliqueada
    // },
    rowsPerPageOptions: [5, 10, 15, 20, 25, 30, 50, 100], //numero de filas(registros) por paginas
    searchOpen: true,
    // searchAlwaysOpen: true, //se tendra el buscador siempre abierto(pero tabla el titulo de la tabla)
    // selectableRows: 'none', //single, multiple //indica si las filas pueden ser selecionadas
    selectableRowsHideCheckboxes: true, //muestra o no los check box
    tableBodyHeight: 'auto', // "50px", "100%"
    // viewColumns: false, // func para mostrar/oculta columnas
    elevation: 0, //ancho de sombrea de la tabla (0-24)
    responsive: 'vertical', //simple(imp bien) vertical(imp bien) standard(imp mal) //IMPORTENTE: ESTO AFECTA A LA IMPRESION
  };

  return (
    <>
      <Background>
        <BodyContainer>
          <CacheProvider value={muiCache}>
            <ThemeProvider theme={getMuiTheme()}>
              <MUIDataTable
                title={'LISTA PLANILLAS DE LIQUIDACION'}
                data={data}
                columns={columns}
                options={options}
              />
            </ThemeProvider>
          </CacheProvider>
        </BodyContainer>
      </Background>
    </>
  );
};
