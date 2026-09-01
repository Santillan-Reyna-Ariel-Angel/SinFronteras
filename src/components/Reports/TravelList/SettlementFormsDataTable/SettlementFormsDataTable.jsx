import React, { useContext, useState } from 'react';

// MUI:
import { useMediaQuery } from '@mui/material';
// Manejo de Tablas:
import MUIDataTable from 'mui-datatables';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import {
  muiCache,
  getThemeForMUIDataTable,
} from '../../../themeForMUIDataTable';
//Styles:
import { Background, BodyContainer } from './SettlementFormsDataTableStyles';
import './../../../print-global-styles.css'; // IMPORTANTE: Se importa los estilos de impresión (AFECTA A TODA LA APLICAION, DE OTRA FORMA EL MENU Y LA CABECERA SON TRANSPARENTES)

//Contexts:
import { ContextBranchTripsMade } from '../../../../contexts/ContextBranchTripsMade';
import { ContextUserData } from './../../../../contexts/ContextUserData';
import { ContextAllUserData } from './../../../../contexts/ContextAllUserData';

//Firebase Functions:
//States:
//Components:
import { DialogBasic } from './../../../DialogBasic/DialogBasic';
import { PdfSettlementForms } from './../../PdfGenerate/PdfSettlementForms';
//Others:
import {
  billingContactList_x_everyTravel,
  billingContactAllList,
  ticketsSoldByBuyer,
  getDataTableNecesary,
  travelKey,
  getFilteredDataByUserRole,
  getFilteredColumnsByUserRole,
  getManifestDataForPdf,
} from './functions';
import { MUI_DATA_TABLE___TEXT_LABELS_ES } from '../../../constantData';
import { rolesAndPermissions } from './../../../rolesAndPermissions';

// SettlementFormsDataTable por SettlementFormsList
export const SettlementFormsDataTable = () => {
  const isScreenMaxW_768 = useMediaQuery('(max-width:768px)'); // useMediaQuery para verificar si la pantalla es de 768px o menos
  // console.log('isScreenMaxW_768', isScreenMaxW_768);

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

  //ContextUserData:
  const userData = useContext(ContextUserData);
  const { charge, identificationNumber } = userData ? userData : {};

  //ContextAllUserData:
  const allUserData = useContext(ContextAllUserData);
  const allUserDataAux = allUserData ? allUserData : {};
  // console.log('allUserDataAux', allUserDataAux);

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
  // console.log('settlementDataList', settlementDataList);
  //New getData Fin (considerar llevarlo todo a una funcion que reciva : branchTripsMadeArray). Incluso se tambien podria estar en la funcion "newSettlementDataList"

  // Asignado nueva data:
  let newSettlementDataList = settlementDataList.map((settlementData) => {
    let { formCode } = settlementData;

    let tripMade = branchTripsMadeArray.filter(
      (tripMade) => tripMade.tripMadeKey === formCode
    );

    let {
      travelIncome,
      travelExpenses: { totalExpenses },
      identificationNumberDriver = '',
      //newData for Manifest:
      passengers,
      tripMadeKey,
    } = tripMade[0];

    //New Data for Manifest:
    //   Datos del conductor:
    let { names, surnames } = allUserDataAux[identificationNumberDriver];
    let fullNameDriver = `${names} ${surnames}`;

    let manifestDataForPdf = getManifestDataForPdf({
      tripMadeKey,
      passengers,
      fullNameDriver,
    });
    // console.log('manifestDataForPdf', manifestDataForPdf);

    //crear funcion para crear: totalSettlement y adicionarlo dentro del obj
    let totalSettlement =
      parseFloat(travelIncome.totalAmountIncome) - parseFloat(totalExpenses);

    return {
      totalSettlement,
      ...settlementData,
      travelIncome,
      identificationNumberDriver,
      manifestDataForPdf,
    };
  });
  console.log('newSettlementDataList', newSettlementDataList);

  //Datos necesarios para llenar la tabla:
  const data = getDataTableNecesary({ newSettlementDataList });
  console.log('data', data);

  let filteredDataByUserRole = getFilteredDataByUserRole({
    charge,
    identificationNumber,
    data,
  });
  console.log('filteredDataByUserRole', filteredDataByUserRole);

  const [rowsSelectedState, setRowsSelectedState] = useState([]);
  const [rowsIndexList, setRowsIndexList] = useState([]);

  console.log('rowsSelectedState', rowsSelectedState);

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
      label: 'T. Ingreso',
    },
    {
      name: 'totalExpenses',
      label: 'T. Egreso',
    },
    {
      name: 'totalSettlement',
      label: 'T. Liquidacion',
    },
    {
      name: 'travelDate',
      label: 'F. Viaje',
    },
    {
      name: 'departureTime',
      label: 'Hr. Viaje',
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
    // {
    //   name: 'btnSettlementForm',
    //   label: 'Planilla Liquidacion',
    //   options: {
    //     filter: false,
    //     sort: false,
    //     print: false, // Esto deberia hacer que se omita esta columna para la impresion
    //   },
    // },

    //new boton:
    {
      name: 'btnSettlementFormv2',
      label: 'Planilla Liquidacion',
      options: {
        filter: false,
        sort: false,
        print: false, // Esto deberia hacer que se omita esta columna para la impresion
      },
    },

    // manifiesto test:
    {
      name: 'btnPassengerManifest',
      label: 'Manif. Pasajeros',
      options: {
        filter: false,
        sort: false,
        print: false, // Esto deberia hacer que se omita esta columna para la impresion
      },
    },
  ];

  // FILTRAR COLUMNAS POR ROL DE USUARIO:
  let userCanViewSettlementForm =
    rolesAndPermissions[charge]?.planillaLiquidacion?.leer;

  let filteredColumnsByUserRole = userCanViewSettlementForm
    ? columns
    : getFilteredColumnsByUserRole({
        charge,
        columns,
      });
  console.log('filteredColumnsByUserRole', filteredColumnsByUserRole);

  const options = {
    filterType: 'multiselect', //cuadroDialogo filtro: checkbox , multiselect(movil bien), dropdown(movil regular)
    download: false, //opcion de descarga .csv
    downloadOptions: { filename: 'ListaDeViajes.csv' },
    // jumpToPage: true, // para navegar a una paginas especifica
    // onRowClick: (rowData) => {
    //   console.log('rowData', rowData); // nos regresa info de la fila cliqueada
    // },
    rowsPerPage: isScreenMaxW_768 ? 3 : 5, // Número de filas permitidas por página. Por defecto es 10
    rowsPerPageOptions: isScreenMaxW_768 ? [3, 6, 9, 12] : [5, 10, 15], //numero de filas(registros) por paginas
    searchOpen: false,
    // searchAlwaysOpen: true, //se tendra el buscador siempre abierto(pero tabla el titulo de la tabla)
    tableBodyHeight: 'auto', // "50px", "100%"
    // viewColumns: false, // func para mostrar/oculta columnas
    elevation: 0, //ancho de sombrea de la tabla (0-24)
    responsive: 'vertical', //simple(imp bien) vertical(imp bien) standard(imp mal) //IMPORTENTE: ESTO AFECTA A LA IMPRESION

    //CAMBIAR IDIOMA:
    textLabels: { ...MUI_DATA_TABLE___TEXT_LABELS_ES },

    // MANEJAR CHECKS DE DATA TABLE:
    selectableRowsHideCheckboxes: false, //muestra o no los check box
    rowsSelected: rowsIndexList, // [0, 1] marca los checkbox de las filas selecionadas
    selectableRowsHeader: true, //muestra o no el checkbox de la cabecera
    selectToolbarPlacement: 'none', // "replace" | "above" | "none" // posicion de la barra de herramientas de selecion
    selectableRows: 'multiple', //single, multiple //indica si las filas pueden ser selecionadas
    selectableRowsOnClick: false, //seleciona la fila al hacer click en cualquier parte de la fila
    onRowSelectionChange: (rowsSelected, allRowsSelected) => {
      const indexList = allRowsSelected.map((row) => row.dataIndex);
      // console.log('indexList', indexList);
      setRowsIndexList(indexList);

      //Se utiliza "newSettlementDataList" envez de "data", por que "data" NO TIENE todos los datos necesarios para el pdf
      const dataSelected = allRowsSelected.map(
        (row) => newSettlementDataList[row.dataIndex]
      );
      // console.log('dataSelected:', dataSelected);
      setRowsSelectedState(dataSelected);
    },

    print: false, //NO ES NECESARIO POR QUE TENEMOS UN BOTON PARA IMPRIMIR en "customToolbar"
    //customToolbar: Nos permite añadir un componente personalizado a la barra de herramientas.
    customToolbar: () => {
      return (
        <DialogBasic
          primaryBtnText="imp. seleccionados"
          componentView={
            <PdfSettlementForms settlementFormsProps={rowsSelectedState} />
          }
        />
      );
    },
  };

  return (
    <>
      <Background>
        <BodyContainer>
          <CacheProvider value={muiCache}>
            <ThemeProvider theme={getThemeForMUIDataTable()}>
              <MUIDataTable
                title={'LISTA DE VIAJES'} //LISTA PLANILLAS DE LIQUIDACION
                data={filteredDataByUserRole} // data
                columns={filteredColumnsByUserRole} // columns
                options={options}
              />
            </ThemeProvider>
          </CacheProvider>
        </BodyContainer>
      </Background>
    </>
  );
};
