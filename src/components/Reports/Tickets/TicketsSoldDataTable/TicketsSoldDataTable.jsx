import React, { useContext, useState } from 'react';
//MUI:
// Manejo de Tablas:
import MUIDataTable from 'mui-datatables';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import {
  muiCache,
  getThemeForMUIDataTable,
} from '../../../themeForMUIDataTable';
//Styles:
import { Background, BodyContainer } from './TicketsSoldDataTableStyles';
//Contexts:
import { ContextBranchTripsMade } from '../../../../contexts/ContextBranchTripsMade';
import { ContextUserData } from './../../../../contexts/ContextUserData';
import { ContextBranchOffice } from './../../../../contexts/ContextBranchOffice';

//Firebase Functions:
//States:
//Components:
import { DialogBasic } from './../../../DialogBasic/DialogBasic';
import { PdfTicket } from './../../PdfGenerate/PdfTicket';
//Others:
import {
  billingContactList_x_everyTravel,
  billingContactAllList,
  ticketsSoldByBuyer,
  dataTableNecesary,
  // getTravelKeysList_todayTrips,
  getTravelKeysList_yesterdayAndTodayTrips,
  getFilteredDataByUserRole,
} from './functions';
import { MUI_DATA_TABLE___TEXT_LABELS_ES } from '../../../constantData';

export const TicketsSoldDataTable = () => {
  //ContextCompanyBuses:
  const branchTripsMade = useContext(ContextBranchTripsMade);
  // console.log('branchTripsMade', branchTripsMade);

  //ContextUserData:
  const userData = useContext(ContextUserData);
  const { identificationNumber, charge } = userData ? userData : {};

  //ContextBranchOffice:
  const branchOffice = useContext(ContextBranchOffice);
  const { travels } = branchOffice ? branchOffice : {};
  // console.log('travels', travels);

  // json to array:
  let branchTripsMadeArray = [];
  for (let i in branchTripsMade) branchTripsMadeArray.push(branchTripsMade[i]);
  // console.log('branchTripsMadeArray', branchTripsMadeArray);
  let travelsList = [];
  for (let i in travels) travelsList.push(travels[i]);
  // console.log('travelsList', travelsList);

  let billingContactList_x_everyTravelAux = billingContactList_x_everyTravel({
    branchTripsMadeArray,
  });

  let billingContactAllListAux = billingContactAllList({
    billingContactList_x_everyTravelAux,
  });

  let ticketsSoldByBuyerAux = ticketsSoldByBuyer({ billingContactAllListAux });

  //Datos necesarios para llenar la tabla:
  const data = dataTableNecesary({ ticketsSoldByBuyerAux });
  // console.log('data', data);

  let travelKeysList_yesterdayAndTodayTrips =
    getTravelKeysList_yesterdayAndTodayTrips({
      identificationNumber,
      travelsList,
    });
  console.log(
    'travelKeysList_yesterdayAndTodayTrips',
    travelKeysList_yesterdayAndTodayTrips
  );

  let filteredDataByUserRole = getFilteredDataByUserRole({
    charge,
    data,
    travelKeysList_yesterdayAndTodayTrips,
  });
  console.log('filteredDataByUserRole', filteredDataByUserRole);

  const [rowsSelectedState, setRowsSelectedState] = useState([]);
  const [rowsIndexList, setRowsIndexList] = useState([]);

  console.log('rowsSelectedState', rowsSelectedState);

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
        // sort: false, //funcionalidad para odernar la columna
        // searchable: false, // se indica si text de la columna podra encontrarse por el buscador
        // viewColumns: false, // func para añadir/quitar a la lista de columnas(de la barra de herramientas)
      },
    },
    {
      name: 'identificationNumber',
      label: 'CI Pasajero',
      options: {
        filter: false,
      },
    },
    {
      name: 'seatId',
      label: 'Asiento',
      options: {
        filter: false,
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

    // {
    //   name: 'btnTicket',
    //   label: 'Detalles',
    //   options: {
    //     filter: false,
    //     sort: false,
    //     print: false, //Esto deberia hacer que se omita esta columna para la impresion
    //   },
    // },

    //Boton v2:
    {
      name: 'btnTicketv2',
      label: 'Detalles',
      options: {
        filter: false,
        sort: false,
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
    rowsPerPage: 5, // Número de filas permitidas por página. Por defecto es 10
    rowsPerPageOptions: [5, 10, 15, 20, 30, 50, 100], //numero de filas(registros) por paginas
    searchOpen: true,
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
      const dataSelected = allRowsSelected.map((row) => data[row.dataIndex]);
      // console.log('dataSelected:', dataSelected);
      setRowsSelectedState(dataSelected);
    },

    print: false, //NO ES NECESARIO POR QUE TENEMOS UN BOTON PARA IMPRIMIR en "customToolbar"
    //customToolbar: Nos permite añadir un componente personalizado a la barra de herramientas.
    customToolbar: () => {
      return (
        <DialogBasic
          primaryBtnText="imprimir seleccionados"
          componentView={<PdfTicket ticketDataProps={rowsSelectedState} />}
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
                title={'LISTA DE PASAJES VENDIDOS'}
                data={filteredDataByUserRole} //data
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
