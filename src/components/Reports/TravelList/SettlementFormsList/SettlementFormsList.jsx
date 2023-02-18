import React, { useContext } from 'react';

// MUI:
// Manejo de Tablas:
import MUIDataTable from 'mui-datatables';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import {
  muiCache,
  getThemeForMUIDataTable,
} from './../../../themeForMUIDataTable';
//Styles:
import { Background, BodyContainer } from './SettlementFormsListStyles';
//Contexts:
import { ContextBranchTripsMade } from './../../../../contexts/ContextBranchTripsMade';
//Firebase Functions:
//States:
//Components:
//Others:
import {
  billingContactList_x_everyTravel,
  billingContactAllList,
  ticketsSoldByBuyer,
  getDataTableNecesary,
  travelKey,
} from './functions';
import { MUI_DATA_TABLE___TEXT_LABELS_ES } from './../../../constantData';

export const SettlementFormsList = () => {
  let settlementData = {
    companyName: '', //Sin Fronteras
    formCode: '', //004121
    origin: '', //Sucre
    destiny: '', //Santa Cruz

    travelIncome: {
      incomeTickets: [
        {
          numTickets: 0, //2
          priceTicket: 0, //100
          totalPrice: 0, //200
        },
      ],
      totalAmountDiscounts: 0,
      totalAmountIncome: 0, //2430
      totalAmountTickets: 0, //2430
    },

    travelExpenses: {
      busEnrollment: '',
      expenses: {
        diesel: '0',
        laborUnion: '0',
        otherDescription: '',
        others: '0',
        toll: '0',
        viaticos: '0',
        washed: '0',
      },
      totalExpenses: 0, // 402 //Por default numerico
      tripMadeKey: '',
    },

    totalSettlement: 0, //2078
    travelDate: '', // 24/01/2021  //TravelDate?
  };
  console.log('Obj settlementData:', settlementData);

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

  let billingContactAllListAux = billingContactAllList({
    billingContactList_x_everyTravelAux,
  });

  let ticketsSoldByBuyerAux = ticketsSoldByBuyer({ billingContactAllListAux });

  //New getData:
  let travelExpensesArray = branchTripsMadeArray.map((data) => {
    let dataAux = {
      travelExpenses: data.travelExpenses,
    };
    return dataAux;
  });
  console.log('travelExpensesArray', travelExpensesArray);

  let uniqueCollection = new Set();
  //IMPORTANTE: si no se tiene "ticketsSoldByBuyerAux" (por que no hay ningun pasaje vendido),  NO SE PODRA MOSTRAR EL VIAJE CREADO EN LA TABLA.
  ticketsSoldByBuyerAux.map((data) => {
    let travelDate = data.passengersList[0].travelDate;
    let departureTime = data.passengersList[0].departureTime;
    let busEnrollment = data.passengersList[0].busEnrollment;

    let dataAux = {
      companyName: data.passengersList[0].companyName,
      formCode: travelKey({ travelDate, departureTime, busEnrollment }),
      origin: data.passengersList[0].origin,
      destiny: data.passengersList[0].destiny,
      travelDate: travelDate,
      departureTime: departureTime,
    };

    uniqueCollection.add(JSON.stringify(dataAux)); // JSON.stringify(obj) convierte un {} a string

    return dataAux;
  });

  const uniqueCollectionArrayStrings = Array.from(uniqueCollection); // Convierte el objeto Se (new Set()) en un Array
  // console.log('uniqueCollectionArrayStrings', uniqueCollectionArrayStrings);
  const uniqueCollectionArrayObjs = uniqueCollectionArrayStrings.map((data) =>
    JSON.parse(data)
  ); //JSON.parse(stringObj) convierte un string a un {}
  // console.log('uniqueCollectionArrayObjs', uniqueCollectionArrayObjs);

  let settlementDataList = uniqueCollectionArrayObjs.map((data) => {
    let travelExpensesList = travelExpensesArray.filter(
      (data2) => data.formCode === data2.travelExpenses.tripMadeKey
    );
    // console.log('travelExpensesList', travelExpensesList);
    return { ...data, ...travelExpensesList[0] };
  });
  console.log('settlementDataList', settlementDataList);
  //New getData Fin (considerar llevarlo todo a una funcion que reciva : branchTripsMadeArray). Incluso se tambien podria estar en la funcion "newSettlementDataList"

  //intento 06-12-2022:
  let newSettlementDataList = settlementDataList.map((settlementData) => {
    let { formCode } = settlementData;

    let tripMade = branchTripsMadeArray.filter(
      (tripMade) => tripMade.tripMadeKey === formCode
    );

    let {
      travelIncome,
      travelExpenses: { totalExpenses },
    } = tripMade[0];

    //crear funcion para crear: totalSettlement y adicionarlo dentro del obj
    let totalSettlement =
      parseFloat(travelIncome.totalAmountIncome) - parseFloat(totalExpenses);

    return { totalSettlement, ...settlementData, travelIncome };
  });
  console.log('newSettlementDataList', newSettlementDataList);

  //Datos necesarios para llenar la tabla:
  const data = getDataTableNecesary({ newSettlementDataList });
  console.log('data', data);

  const columns = [
    // {
    //   name: 'formCode',
    //   label: 'Codigo',
    // },
    {
      name: 'busEnrollment',
      label: 'Bus',
    },
    {
      name: 'destiny',
      label: 'Destino',
      //   options: {
      //     filter: false, // func para filtrar por la columna
      //     //sort: false, // funcionalidad para odernar la columna
      //     // searchable: false, // se indica si text de la columna podra encontrarse por el buscador
      //     // viewColumns: false, // func para añadir/quitar a la lista de columnas(de la barra de herramientas)
      //   },
    },
    {
      name: 'totalAmountIncome',
      label: 'Total Ingreso',
    },
    {
      name: 'totalExpenses',
      label: 'Total Egreso',
    },
    {
      name: 'totalSettlement',
      label: 'Total Liquidacion',
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
      name: 'btnExpenses',
      label: 'Egresos',
      options: {
        filter: false,
        sort: false,
        print: false, // Esto deberia hacer que se omita esta columna para la impresion
      },
    },
    {
      name: 'btnSettlementForm',
      label: 'Planilla Liquidacion',
      options: {
        filter: false,
        sort: false,
        print: false, // Esto deberia hacer que se omita esta columna para la impresion
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
    rowsPerPage: 5, // Número de filas permitidas por página. Por defecto es 10
    rowsPerPageOptions: [5, 10, 15, 20, 30, 50, 100], //numero de filas(registros) por paginas
    searchOpen: true,
    // searchAlwaysOpen: true, //se tendra el buscador siempre abierto(pero tabla el titulo de la tabla)
    // selectableRows: 'none', //single, multiple //indica si las filas pueden ser selecionadas
    selectableRowsHideCheckboxes: true, //muestra o no los check box
    tableBodyHeight: 'auto', // "50px", "100%"
    // viewColumns: false, // func para mostrar/oculta columnas
    elevation: 0, //ancho de sombrea de la tabla (0-24)
    responsive: 'vertical', //simple(imp bien) vertical(imp bien) standard(imp mal) //IMPORTENTE: ESTO AFECTA A LA IMPRESION

    //CAMBIAR IDIOMA:
    textLabels: { ...MUI_DATA_TABLE___TEXT_LABELS_ES },
  };

  return (
    <>
      <Background>
        <BodyContainer>
          <CacheProvider value={muiCache}>
            <ThemeProvider theme={getThemeForMUIDataTable()}>
              <MUIDataTable
                title={'LISTA DE VIAJES'} //LISTA PLANILLAS DE LIQUIDACION
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
