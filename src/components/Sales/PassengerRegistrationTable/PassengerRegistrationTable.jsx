import React, { useState } from 'react';
//MUI:
import Button from '@mui/material/Button';
import { DataGrid, esES } from '@mui/x-data-grid'; // *esEs: idioma español que se puede añadir a la <DataGrid/>
//Styles:
// import { Background, Container } from './PassengerRegistrationTableStyles';
//Components:
import { BillingRecord } from '../BillingRecord/BillingRecord';
//Others:
import { useMediaQuery } from '@mui/material';

const PassengerRegistrationTable = ({
  passengersDataTable,
  setPassengersDataTable,
  seatPrices,
  dataBusTravel,
}) => {
  const isScreenMaxW_768 = useMediaQuery('(max-width:768px)');
  // console.log('isScreenMaxW_768', isScreenMaxW_768);

  let { minimalPrice, maximumPrice } = seatPrices;

  //Data necesary for  DataGrid:
  // Nota: Precio tendria que ser editable?
  const columns = [
    {
      field: 'id',
      headerName: 'Asiento',
      width: 82,
    },
    {
      field: 'seatPrice',
      headerName: 'Precio',
      width: 74,
      editable: true,
    },
    {
      field: 'typeOfDocument',
      headerName: 'Documento',
      width: 128,
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

  //Validate Price:
  const validatePrice = (inputPrice) => {
    let salePrice =
      inputPrice >= minimalPrice && inputPrice <= maximumPrice
        ? inputPrice
        : '';

    return salePrice;
  };
  let passengerAux;
  const recoverData = (params) => {
    let { id, field, value } = params;
    let valueTrim = value.trim(); //corregir error cuando se leciona pero no se escribe?
    // console.log(`id ${id} | field ${field} | value ${valueTrim}`);
    passengerAux = passengersDataTable.map((passenger, index) => {
      if (passenger.id === id) {
        if (field === 'seatPrice') {
          valueTrim = validatePrice(parseInt(valueTrim));
        }
        passenger[field] = valueTrim; //trim(): Elimina los espacios en blanco en ambos extremos del string
        return passenger;
      } else {
        return passenger;
      }
    });
    // console.log('passengerAux', passengerAux);
  };

  //Messages isSeatSelected:
  // const [isSeatSelected, setIsSeatSelected] = useState(false);

  //Message camposVacios:
  const [emptyFields, setEmptyFields] = useState([]);
  const messageEmptyFields = (camposVacios) => {
    let seatRows = camposVacios.map((campo) => campo.id);
    // La funcion de comparacion(=> a - b) dentro del "sort()" ordena el array de modo ascendente:
    seatRows = seatRows.sort((a, b) => a - b);
    setEmptyFields(seatRows);
    console.log('seatRows EmptyFields', seatRows);
  };

  const isCompleteFields = () => {
    if (passengerAux === undefined) {
      console.log(
        'no se selecciono asiento o no se lleno ningun campo',
        passengerAux
      );
      // setIsSeatSelected(true);
      return false;
    } else {
      // setIsSeatSelected(false);
      let camposVacios = passengerAux.filter(
        (passenger) =>
          passenger.id === '' ||
          passenger.seatPrice === '' ||
          passenger.typeOfDocument === '' ||
          passenger.identificationNumber === '' ||
          passenger.firstName === '' ||
          passenger.lastName === ''
      );
      if (camposVacios.length === 0) {
        console.log('camposCompletos(passengerAux)', passengerAux);
        setEmptyFields([]);
        return true;
      } else {
        console.log('camposVacios', camposVacios);
        messageEmptyFields(camposVacios);
        return false;
      }
    }
  };

  const [showContactInformation, setShowContactInformation] = useState(false);
  const registerPassengers = () => {
    let is_CompleteFields = isCompleteFields();
    if (is_CompleteFields) {
      setPassengersDataTable(passengerAux);
      setShowContactInformation(true);
    }
  };

  console.log('passengersDataTable', passengersDataTable);

  // const [isDisableButton, setIsDisableButton] = useState(true);
  // const enableOrDisableButton = (event) => {
  //   event.preventDefault();
  //   let is_CompleteFields = isCompleteFields();
  //   is_CompleteFields ? setIsDisableButton(false) : setIsDisableButton(true);
  // };

  const passengerDataGrid = () => {
    return (
      // height: 1fr o 100%
      <div style={{ height: '1fr', width: 732 }}>
        {/* width: '100%' */}
        <DataGrid
          //   sx={{ marginTop: '50px' }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText} //Importante: convierte los testo del compoente en el idioma indicado
          rows={passengersDataTable}
          columns={columns}
          pageSize={5} //cantidad maxima de elementos por pagina
          density="compact" //Ancho de filas
          disableColumnMenu={true} //Menu de columna
          rowsPerPageOptions={[5]} //la consola lo sugiere
          hideFooterSelectedRowCount //oculta conteo de filas selecionadas
          autoHeight={true} //Altura de la tabla dinamica
          onCellEditCommit={(params, event) => [
            recoverData(params),
            // enableOrDisableButton(event),
          ]} //registrar cada dato de la datagrid
          //Sin uso
          // checkboxSelection //columna check para cada fila
          // disableSelectionOnClick //seleciona la fila al hacer click en un celda
          // autoPageSize={true}
        />
        {/* Verificacion de Campos NO Vacios: */}
        {emptyFields.length !== 0 &&
        emptyFields[0] !== undefined &&
        emptyFields[0] !== null ? (
          <>
            <p
              style={{
                color: 'red',
                fontWeight: 'bold',
                margin: '5px 0px 0px 0px',
              }}
            >
              {`*La fila del asiento: "${emptyFields.map(
                (seat) => ' ' + seat
              )} " tiene campos vacios o el "Precio" esta fuera de rango.`}
            </p>
          </>
        ) : null}
      </div>
    );
  };

  return (
    <>
      {/* <Background> */}
      {/* <Container> */}
      {/* Mensaje Seleccionar asiento: */}
      {/* {isSeatSelected ? (
        <>
          <p
            style={{
              color: 'red',
              fontWeight: 'bold',
              margin: '5px 0px 0px 0px',
            }}
          >
            {`*SELECCIONE ALMENOS UN ASIENTO Y LLENE SUS CAMPOS.`}
          </p>
        </>
      ) : null} */}

      {passengerDataGrid()}

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
          registerPassengers();
        }}
      >
        Siguiente paso
      </Button>
      {/* </Container> */}
      {/* </Background> */}
      {showContactInformation ? (
        <BillingRecord
          passengersDataTable={passengersDataTable}
          dataBusTravel={dataBusTravel}
        />
      ) : null}
    </>
  );
};

export { PassengerRegistrationTable };
