import React, { useContext } from 'react';

//MUI:
// Manejo de Tablas:
import MUIDataTable from 'mui-datatables';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import { muiCache, getMuiTheme } from './themeDataTable';
//Styles:
import { Background, BodyContainer } from './ListOfTicketsSoldStyles';
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
import { MUI_DATA_TABLE___TEXT_LABELS_ES } from './../../constantData';

export const ListOfTicketsSold = () => {
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
    rowsPerPageOptions: [5, 10, 15, 20, 25, 30, 50, 100], //numero de filas(registros) por paginas
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
            <ThemeProvider theme={getMuiTheme()}>
              <MUIDataTable
                title={'LISTA DE PASAJES VENDIDOS'}
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
