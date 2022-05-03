import React from 'react';
//Styles
import Button from '@mui/material/Button';
// import { Background, Container } from './PassengerRegistrationTableStyles';
//x-data-grid
// *esEs: es el idioma español que se puede añadir a la <DataGrid/>
import { DataGrid, esES } from '@mui/x-data-grid';
import { BillingRecord } from '../BillingRecord/BillingRecord';

const PassengerRegistrationTable = ({ rowsState, setRowsState }) => {
  //x-data-grid:
  // Nota: Precio tendria que ser editable?
  const columns = [
    { field: 'id', headerName: 'N# Asiento', width: 104 },
    { field: 'price', headerName: 'Precio', width: 74 },
    {
      field: 'typeOfDocument',
      headerName: 'Documento',
      width: 130,
      editable: true,
    },
    {
      field: 'identificationNumber',
      headerName: 'N# Identificacion',
      width: 142,
      editable: true,
    },
    {
      field: 'firstName',
      headerName: 'Nombres',
      width: 140,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Apellidos',
      width: 140,
      editable: true,
    },
  ];

  let passengerAux;
  const recuperarDatos = (params) => {
    let { id, field, value } = params;
    passengerAux = rowsState.map((passenger, index) => {
      if (passenger.id === id) {
        passenger[field] = value;
        return passenger;
      } else {
        return passenger;
      }
    });
    console.log(passengerAux);
  };

  const registrarPasajeros = () => {
    setRowsState(passengerAux);
  };

  console.log('rowsState', rowsState);

  const DataGridDemo = () => {
    return (
      <div style={{ height: 380, width: 732 }}>
        {/* width: '100%' */}
        <DataGrid
          //   sx={{ marginTop: '50px' }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText} //Importante: convierte los testo del compoente en el idioma indicado
          rows={rowsState}
          columns={columns}
          pageSize={5} //cantidad maxima de elementos por pagina
          density="compact" //Ancho de filas
          disableColumnMenu={true} //Menu de columna
          rowsPerPageOptions={[5]} //la consola lo sugiere
          hideFooterSelectedRowCount //oculta conteo de filas selecionadas
          autoHeight={true} //Altura de la tabla dinamica
          onCellEditCommit={(params, event) => recuperarDatos(params)} //registrar cada dato de la datagrid
          //Sin uso
          // checkboxSelection //columna check para cada fila
          // disableSelectionOnClick //seleciona la fila al hacer click en un celda
          // autoPageSize={true}
        />
      </div>
    );
  };
  return (
    <>
      {/* <Background> */}
      {/* <Container> */}
      {DataGridDemo()}
      <Button
        // sx={{ margin: 'marginTop:0px', paddingTop: '0px' }}
        variant="contained"
        color="success"
        onClick={() => {
          registrarPasajeros();
        }}
      >
        Siguiente paso
      </Button>
      {/* </Container> */}
      {/* </Background> */}
      <BillingRecord rowsState={rowsState} />
    </>
  );
};

export { PassengerRegistrationTable };
