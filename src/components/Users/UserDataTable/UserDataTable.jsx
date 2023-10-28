import React, { useContext } from 'react';

// MUI:
import { useMediaQuery } from '@mui/material';
// Manejo de Tablas:
import MUIDataTable from 'mui-datatables';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import { muiCache, getThemeForMUIDataTable } from '../../themeForMUIDataTable';
//Styles:
import { Background, BodyContainer } from './UserDataTableStyles';
//Contexts:
import { ContextAllUserData } from '../../../contexts/ContextAllUserData';
import { ContextBranchOffice } from './../../../contexts/ContextBranchOffice';
import { ContextUserData } from './../../../contexts/ContextUserData';
//Firebase Functions:
//States:
//Components:
//Others:
import { MUI_DATA_TABLE___TEXT_LABELS_ES } from '../../constantData';
import {
  getDataTableNecesary,
  // getColumnsByUserRole,
  isEdit,
  isDelete,
} from './functions';
import { rolesAndPermissions } from './../../rolesAndPermissions';

export const UserDataTable = () => {
  const isScreenMaxW_768 = useMediaQuery('(max-width:768px)'); // useMediaQuery para verificar si la pantalla es de 768px o menos
  // console.log('isScreenMaxW_768', isScreenMaxW_768);

  //ContextAllUserData:
  const allUserData = useContext(ContextAllUserData);
  console.log('allUserData', allUserData);

  //ContextBranchOffice:
  const branchOffice = useContext(ContextBranchOffice);

  //ContextUserData:
  const userData = useContext(ContextUserData);
  const { charge } = userData ? userData : {};
  console.log('charge', charge);

  const userCanUpdate = rolesAndPermissions[charge]?.usuarios?.actualizar;
  const userCanDelete = rolesAndPermissions[charge]?.usuarios?.eliminar;

  // json to array:
  let allUserDataList = [];
  for (let i in allUserData) allUserDataList.push(allUserData[i]);
  console.log('allUserDataList', allUserDataList);

  const data = getDataTableNecesary({ allUserDataList });
  console.log('data', data);

  const dataFilteredByBranch = data.filter(
    (user) =>
      user.branchNumberOrCode === branchOffice?.branchInformation?.branchNumber
  );
  console.log('*****dataFilteredByBranch', dataFilteredByBranch);

  const columns = [
    {
      name: 'identificationNumber',
      label: 'CI',
      //   options: {
      //     filter: false, // func para filtrar por la columna
      //     //sort: false, //funcionalidad para odernar la columna
      //     // searchable: false, // se indica si text de la columna podra encontrarse por el buscador
      //     // viewColumns: false, // func para añadir/quitar a la lista de columnas(de la barra de herramientas)
      //   },
    },
    {
      name: 'userFullName',
      label: 'Nombre Completo',
    },
    {
      name: 'charge',
      label: 'Cargo',
    },
    {
      name: 'branchOfficeName',
      label: 'Sucursal',
    },
    {
      name: 'mobile',
      label: 'Celular',
    },
    {
      name: 'status',
      label: 'Estado',
    },
    {
      name: 'btnEdit',
      label: 'Editar',
      options: {
        filter: false, // func para filtrar por la columna
        sort: false, //funcionalidad para odernar la columna
        print: false, //Esto deberia hacer que se omita esta columna para la impresion
      },
    },
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

  // FILTRAR COLUMNAS POR ROL DE USUARIO:
  // let columnsByUserRole = getColumnsByUserRole({ charge, columns });

  let columns_isEditResponse = userCanUpdate
    ? columns
    : isEdit({ charge, columns });

  let columns_isDeleteResponse = userCanDelete
    ? columns_isEditResponse
    : isDelete({ charge, columns_isEditResponse });

  let filteredColumnsByUserRole = columns_isDeleteResponse;

  const options = {
    filterType: 'multiselect', //cuadroDialogo filtro: checkbox , multiselect(movil bien), dropdown(movil regular)
    download: true, //opcion de descarga .csv
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
  };

  return (
    <>
      <Background>
        <BodyContainer>
          <CacheProvider value={muiCache}>
            <ThemeProvider theme={getThemeForMUIDataTable()}>
              <MUIDataTable
                title={'LISTA DE USUARIOS '}
                data={dataFilteredByBranch}
                columns={filteredColumnsByUserRole} // columns // columnsByUserRole
                options={options}
              />
            </ThemeProvider>
          </CacheProvider>
        </BodyContainer>
      </Background>
    </>
  );
};
