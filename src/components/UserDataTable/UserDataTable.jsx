import React, { useContext } from 'react';

// MUI:
// Manejo de Tablas:
import MUIDataTable from 'mui-datatables';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import { muiCache, getMuiTheme } from './themeDataTable';
//Styles:
import { Background, BodyContainer } from './UserDataTableStyles';
//Contexts:
import { ContextAllUserData } from './../../contexts/ContextAllUserData';
//Firebase Functions:
//States:
//Components:
//Others:
import { MUI_DATA_TABLE___TEXT_LABELS_ES } from './../constantData';
import { getDataTableNecesary } from './functions';

export const UserDataTable = () => {
  //ContextAllUserData:
  const allUserData = useContext(ContextAllUserData);
  console.log('allUserData', allUserData);

  // json to array:
  let allUserDataList = [];
  for (let i in allUserData) allUserDataList.push(allUserData[i]);
  console.log('allUserDataList', allUserDataList);

  //Datos necesarios para llenar la tabla:
  //   let allUserDataListDefault = [
  //     {
  //       identificationNumber: '123456',
  //       userFullName: 'jose perez',
  //       charge: 'chofer',
  //       branchOfficeName: 'sucursal 1',
  //       mobile: '67676767',
  //       status: 'activo',
  //       // btnSettlementForm: 'funcion',
  //     },
  //   ];

  const data = getDataTableNecesary({ allUserDataList });

  const columns = [
    {
      name: 'identificationNumber',
      label: 'CI',
    },
    {
      name: 'userFullName',
      label: 'Nombre Completo',
      //   options: {
      //     filter: false, // func para filtrar por la columna
      //     //sort: false, //funcionalidad para odernar la columna
      //   },
    },
    {
      name: 'charge',
      label: 'Cargo',
      //   options: {
      //     filter: false, // func para filtrar por la columna
      //     //sort: false, //funcionalidad para odernar la columna
      //   },
    },
    {
      name: 'branchOfficeName',
      label: 'Sucursal',
      //   options: {
      //     filter: false, // func para filtrar por la columna
      //     //sort: false, //funcionalidad para odernar la columna
      //     // searchable: false, // se indica si text de la columna podra encontrarse por el buscador
      //     // viewColumns: false, // func para añadir/quitar a la lista de columnas(de la barra de herramientas)
      //   },
    },
    {
      name: 'mobile',
      label: 'Celular',
    },
    {
      name: 'status',
      label: 'Estado',
    },

    // {
    //   name: 'btnSettlementForm',
    //   label: 'boton',
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
                title={'LISTA DE USUARIOS '}
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
