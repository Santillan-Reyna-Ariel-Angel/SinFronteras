import React, { useContext } from 'react';

// MUI:
import { useMediaQuery } from '@mui/material';
// Manejo de Tablas:
import MUIDataTable from 'mui-datatables';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import { muiCache, getThemeForMUIDataTable } from '../../themeForMUIDataTable';
//Styles:
import { Background, BodyContainer } from './TicketReservationTableStyles';
//Contexts:
import { ContextBranchOffice } from './../../../contexts/ContextBranchOffice';
import { ContextUserData } from './../../../contexts/ContextUserData';
import { ContextBranchTripsMade } from './../../../contexts/ContextBranchTripsMade';
//Firebase Functions:
//States:
//Components:
// import { DialogBasic } from './../../DialogBasic/DialogBasic';
// import { PdfUsersList } from './../../Reports/PdfGenerate/PdfUsersList';
//Others:
import { MUI_DATA_TABLE___TEXT_LABELS_ES } from '../../constantData';
import { getDataTableNecesary, getReserveSeatsByUser } from './functions';

export const TicketReservationTable = () => {
  const isScreenMaxW_768 = useMediaQuery('(max-width:768px)'); // useMediaQuery para verificar si la pantalla es de 768px o menos
  // console.log('isScreenMaxW_768', isScreenMaxW_768);

  //ContextBranchOffice:
  const branchOffice = useContext(ContextBranchOffice);
  const {
    branchInformation: { branchNumber },
  } = branchOffice ? branchOffice : { branchInformation: { branchNumber: '' } };
  // console.log('branchNumber', branchNumber);

  //ContextUserData:
  const userData = useContext(ContextUserData);
  const { identificationNumber } = userData
    ? userData
    : { identificationNumber: '' };
  // console.log('identificationNumber', identificationNumber);

  // ContextBranchTripsMade:
  const branchTripsMade = useContext(ContextBranchTripsMade);
  // console.log('branchTripsMade', branchTripsMade);

  let tripMadeKeyList =
    branchTripsMade !== undefined && branchTripsMade !== null
      ? Object.keys(branchTripsMade)
      : [];
  // console.log('tripMadeKeyList', tripMadeKeyList);

  let reserveSeatsList = tripMadeKeyList
    .map((tripMadeKey) =>
      branchTripsMade[tripMadeKey].reserveSeats
        ? branchTripsMade[tripMadeKey].reserveSeats
        : 'emptyReserveSeats'
    )
    .filter((reserveSeats) => reserveSeats !== 'emptyReserveSeats');
  // console.log('reserveSeatsList', reserveSeatsList);

  const data = getDataTableNecesary({ reserveSeatsList, branchNumber });
  console.log('data', data);

  const dataFilteredByUser = getReserveSeatsByUser({
    data,
    identificationNumber,
  });
  console.log('dataFilteredByUser', dataFilteredByUser);

  const columns = [
    {
      name: 'identificationNumberUser',
      label: 'Usuario CI',
      //   options: {
      //     filter: false, // func para filtrar por la columna
      //     //sort: false, //funcionalidad para odernar la columna
      //     // searchable: false, // se indica si text de la columna podra encontrarse por el buscador
      //     // viewColumns: false, // func para añadir/quitar a la lista de columnas(de la barra de herramientas)
      //   },
    },
    {
      name: 'userFullName',
      label: 'Nombre usuario',
    },
    {
      name: 'identificationNumberBuyer',
      label: 'CI comprador',
    },
    {
      name: 'buyerFullName',
      label: 'Nombre comprador',
    },
    {
      name: 'reserveSeats',
      label: 'Asientos',
    },
    // {
    //   name: 'btnEdit',
    //   label: 'Editar',
    //   options: {
    //     filter: false, // func para filtrar por la columna
    //     sort: false, //funcionalidad para odernar la columna
    //     print: false, //Esto deberia hacer que se omita esta columna para la impresion
    //   },
    // },
    {
      name: 'btnDelete',
      label: 'Eliminar',
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
    rowsPerPage: isScreenMaxW_768 ? 3 : 5, // Número de filas permitidas por página. Por defecto es 10
    rowsPerPageOptions: isScreenMaxW_768 ? [3, 6, 9, 12] : [5, 10, 15], //numero de filas(registros) por paginas
    searchOpen: false,
    // searchAlwaysOpen: true, //se tendra el buscador siempre abierto(pero tabla el titulo de la tabla)
    // selectableRows: 'none', //single, multiple //indica si las filas pueden ser selecionadas
    selectableRowsHideCheckboxes: true, //muestra o no los check box
    tableBodyHeight: 'auto', // "50px", "100%"
    // viewColumns: false, // func para mostrar/oculta columnas
    elevation: 0, //ancho de sombrea de la tabla (0-24)
    responsive: 'vertical', //simple(imp bien) vertical(imp bien) standard(imp mal) //IMPORTENTE: ESTO AFECTA A LA IMPRESION

    //CAMBIAR IDIOMA:
    textLabels: { ...MUI_DATA_TABLE___TEXT_LABELS_ES },

    print: false, //NO ES NECESARIO POR QUE TENEMOS UN BOTON PARA IMPRIMIR en "customToolbar"
    //customToolbar: Nos permite añadir un componente personalizado a la barra de herramientas.
    // customToolbar: () => {
    //   return (
    //     <DialogBasic
    //       primaryBtnText="imp. usuarios"
    //       componentView={
    //         <PdfUsersList usuariosDataProps={usuariosDataForImp} />
    //       }
    //     />
    //   );
    // },
  };

  return (
    <>
      <Background>
        <BodyContainer>
          <CacheProvider value={muiCache}>
            <ThemeProvider theme={getThemeForMUIDataTable()}>
              <MUIDataTable
                title={'LISTA DE RESERVAS '}
                data={dataFilteredByUser} //dataFilteredByUser, data
                columns={columns} // columns // columnsByUserRole , filteredColumnsByUserRole
                options={options}
              />
            </ThemeProvider>
          </CacheProvider>
        </BodyContainer>
      </Background>
    </>
  );
};
