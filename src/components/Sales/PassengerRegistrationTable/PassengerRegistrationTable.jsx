import React, { useState } from 'react';
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
        passenger[field] = value.trim(); //trim(): Elimina los espacios en blanco en ambos extremos del string
        return passenger;
      } else {
        return passenger;
      }
    });
    // console.log('passengerAux', passengerAux);
  };

  const isCompleteFields = () => {
    if (passengerAux === undefined) {
      console.log(
        'no se selecciono asiento o no se lleno ningun campo',
        passengerAux
      );
      return false;
    } else {
      let camposVacios = passengerAux.filter(
        (passenger) =>
          passenger.id === '' ||
          passenger.price === '' ||
          passenger.typeOfDocument === '' ||
          passenger.identificationNumber === '' ||
          passenger.firstName === '' ||
          passenger.lastName === ''
      );
      if (camposVacios.length === 0) {
        console.log('passengerAux', passengerAux);
        return true;
      } else {
        console.log('camposVacios', camposVacios);
        return false;
      }
    }
  };

  const [mostrarInfocantacto, setMostrarInfocantacto] = useState(false);
  const registrarPasajeros = () => {
    let is_CompleteFields = isCompleteFields();
    if (is_CompleteFields) {
      setRowsState(passengerAux);
      setMostrarInfocantacto(true);
    }
  };

  console.log('rowsState', rowsState);

  // const [isDisableButton, setIsDisableButton] = useState(true);
  // const enableOrDisableButton = (event) => {
  //   event.preventDefault();
  //   let is_CompleteFields = isCompleteFields();
  //   is_CompleteFields ? setIsDisableButton(false) : setIsDisableButton(true);
  // };

  const DataGridDemo = () => {
    return (
      // height: 1fr o 100%
      <div style={{ height: '1fr', width: 732 }}>
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
          onCellEditCommit={(params, event) => [
            recuperarDatos(params),
            // enableOrDisableButton(event),
          ]} //registrar cada dato de la datagrid
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
      {/* Ocultar/mostrar boton: */}
      {/* {isDisableButton ? null : (
        <>
          <Button ...>
            Siguiente paso
          </Button>
        </>
      )} */}

      <Button
        // sx={{ margin: 'marginTop:0px', paddingTop: '0px' }}
        variant="contained"
        color="success"
        // disabled={isDisableButton}
        onClick={() => {
          registrarPasajeros();
        }}
      >
        Siguiente paso
      </Button>
      {/* </Container> */}
      {/* </Background> */}
      {mostrarInfocantacto ? <BillingRecord rowsState={rowsState} /> : null}
    </>
  );
};

export { PassengerRegistrationTable };
