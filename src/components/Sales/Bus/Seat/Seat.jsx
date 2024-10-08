import React, { useState, useContext } from 'react';
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
//Estilos
import {
  Background,
  Container,
  ContainerTopSeats,
  ContainerTopSeatsCenter,
  ContainerButtomSeatsCenter,
  ContainerButtomSeats,
  ContainerHall,
  DriverStyled,
} from './SeatStyles';
//check
import Checkbox from '@mui/material/Checkbox';
//form controls
import FormControlLabel from '@mui/material/FormControlLabel';
//Context
import { ContextBranchOffice } from './../../../../contexts/ContextBranchOffice';
//x-data-grid
import { DataGrid } from '@mui/x-data-grid';
//Usado en Check
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

//Algoritmo para generar filas del bus(4-5)
let createSeats = (typeOfBus, numSeat) => {
  let seats = [];
  for (let i = 1; i <= numSeat; i++) {
    if (typeOfBus === 'normal') {
      if (i % 4 === 0) {
        seats.push([i - 3, i - 2, i - 1, i]);
      }
    }
    if (typeOfBus === 'leito') {
      if (i % 3 === 0) {
        seats.push([i - 2, i - 1, i]);
      }
    }
  }

  if (typeOfBus === 'normal') {
    if (numSeat % 4 === 0) {
      return [
        seats.map((x) => x[0]),
        seats.map((x) => x[1]),
        seats.map((x) => x[2]),
        seats.map((x) => x[3]),
      ];
    } else {
      let f = numSeat - seats.length * 4;
      seats.push(
        f === 1
          ? [numSeat, null, null, null]
          : f === 2
          ? [numSeat - 1, numSeat, null, null]
          : [numSeat - 2, numSeat - 1, numSeat, null]
      );
      return [
        seats.map((x) => x[0]),
        seats.map((x) => x[1]),
        seats.map((x) => x[2]),
        seats.map((x) => x[3]),
      ];
    }
  }

  if (typeOfBus === 'leito') {
    if (numSeat % 3 === 0) {
      return [
        seats.map((x) => x[0]),
        seats.map((x) => x[1]),
        seats.map((x) => x[2]),
      ];
    } else {
      let f = numSeat - seats.length * 3;
      seats.push(f < 2 ? [numSeat, null, null] : [numSeat - 1, numSeat, null]);
      return [
        seats.map((x) => x[0]),
        seats.map((x) => x[1]),
        seats.map((x) => x[2]),
      ];
    }
  }
};

const Seat = ({ dataBusTravel }) => {
  //Context
  const branchOffice = useContext(ContextBranchOffice);
  const { branchInformation } = branchOffice
    ? branchOffice
    : { branchInformation: {}, travels: {} };
  const { destinations } = branchInformation;
  //Props
  const {
    bus: { typeOfBus, numberOfSeats, typeOfSeats, numberOfFloors },
    destinationLocation,
  } = dataBusTravel ? dataBusTravel : {};

  const pricesAux = Object.keys(destinations).map((key) => {
    if (destinations[key].destinationLocation === destinationLocation) {
      return destinations[key].prices[typeOfBus];
    } else {
      return {};
    }
  });

  const prices = [];
  pricesAux.forEach(function (elemento, indice, array) {
    if (Object.keys(elemento).length !== 0) {
      prices.push(elemento);
    }
  });
  // console.log('Context_prices', prices);

  const busMapData = () => {
    if (prices[0].seatType === typeOfSeats) {
      // console.log('Datos iguales');
      const { minimalPrice, maximumPrice } = prices[0];

      return { minimalPrice, maximumPrice };
    }
  };
  const seatData = busMapData();

  const BusMap = (typeOfBusParameter, numberOfSeatsParameter, indice) => {
    return createSeats(typeOfBusParameter, numberOfSeatsParameter)[indice].map(
      (seatNumber, i, arraySeats) => {
        if (seatNumber !== null) {
          return (
            <Tooltip
              key={seatNumber}
              title={
                <>
                  <p>N#: {seatNumber}</p>
                  <p>Tipo: {typeOfSeats}</p>
                  <p>
                    Precio Rango:
                    {` ${seatData.minimalPrice} bs - ${seatData.maximumPrice} bs`}
                  </p>
                  <p>Estado: {true ? 'Libre' : 'Ocupado'}</p>
                </>
              }
              arrow
              placement="top"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    id={seatNumber}
                    {...label}
                    icon={
                      <EventSeatRoundedIcon
                        // fontSize="small"
                        sx={{ transform: 'rotate(90deg)' }}
                      />
                    }
                    checkedIcon={
                      <EventSeatRoundedIcon
                        // fontSize="small"
                        sx={{ transform: 'rotate(90deg)', color: 'primary' }}
                      />
                    }
                    onChange={handleChange}
                    sx={{ margin: '-16px 0px 0px 0px' }}
                  />
                }
                label={seatNumber}
                labelPlacement="top"
                sx={{
                  margin: '0px -12px -10px 0px',
                  // backgroundColor: 'red',
                  // borderTopRightRadius:
                  //   i === arraySeats.length - 1 &&
                  //   ((indice === 2 && typeOfBusParameter === 'leito') ||
                  //     (indice === 3 && typeOfBusParameter === 'normal'))
                  //     ? '15px'
                  //     : '',
                  // borderBottomRightRadius:
                  //   i === arraySeats.length - 1 && indice === 0 ? '15px' : '',
                }}
              />
            </Tooltip>
          );
        } else {
          return null;
        }
      }
    );
  };

  //x-data-grid:
  const columns = [
    { field: 'id', headerName: 'N# Asiento', width: 100 },
    { field: 'price', headerName: 'Precio', width: 70 },
    {
      field: 'typeOfDocument',
      headerName: 'Documento',
      width: 130,
      editable: true,
    },
    {
      field: 'identificationNumber',
      headerName: 'N# Identificacion',
      width: 150,
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

  const [rowsState, setRowsState] = useState([]);

  const handleChange = (event) => {
    // console.log('id: ', event.target.id, '.checked: ', event.target.checked);
    const ids = rowsState.map((seat) => seat.id);
    let selectedSeat = ids.includes(event.target.id);
    if (selectedSeat !== true && event.target.checked === true) {
      setRowsState([
        ...rowsState,
        {
          id: event.target.id,
          price: '150',
          typeOfDocument: 'Carnet Identidad',
          identificationNumber: '',
          firstName: '',
          lastName: '',
        },
      ]);
    } else {
      const rowsStateAux = rowsState.filter(
        (seat) => seat.id !== event.target.id
      );
      setRowsState(rowsStateAux);
    }
  };

  const chageValuesRows = (element) => {
    ////1ra forma/////
    // const passengerAux = rowsState.map((passenger) => {
    //   if (passenger.id === element.id) {
    //     return {
    //       id: element.id,
    //       price: '150',
    //       typeOfDocument: 'Carnet Identidad',
    //       identificationNumber: element.identificationNumber,
    //       firstName: element.firstName,
    //       lastName: element.lastName,
    //     };
    //   } else {
    //     return passenger;
    //   }
    // });
    // setRowsState(passengerAux);
    ///2da forma////
    // const ids = rowsState.map((seat) => seat.id);
    // let indice = ids.indexOf(element.id);
    // rowsState[indice].id = element.id;
    // rowsState[indice].identificationNumber = element.identificationNumber;
    // rowsState[indice].firstName = element.firstName;
    // rowsState[indice].lastName = element.lastName;
    //3ra forma////
    //usar el metodo find();
  };

  // const registrar = () => {
  //   console.log('Hola');
  // };
  console.log('rowsState', rowsState);
  const DataGridDemo = () => {
    return (
      <div style={{ height: 380, width: 800 }}>
        {/* width: '100%' */}
        <DataGrid
          rows={rowsState}
          columns={columns}
          pageSize={5} //cantidad maxima de elementos por pagina
          rowsPerPageOptions={[5]}
          checkboxSelection //columna check para cada fila
          disableSelectionOnClick //seleciona la fila al hacer click en un celda
          hideFooterSelectedRowCount //oculta conteo de filas selecionadas
          onCellClick={(element) => chageValuesRows(element.row)}
        />
      </div>
    );
  };
  return (
    <>
      <Background>
        <Container>
          {typeOfBus === 'leito' ? (
            <>
              <DriverStyled />
              <ContainerTopSeats>
                {BusMap(typeOfBus, numberOfSeats, 2)}
              </ContainerTopSeats>
              <ContainerHall></ContainerHall>
              <ContainerButtomSeatsCenter>
                {BusMap(typeOfBus, numberOfSeats, 1)}
              </ContainerButtomSeatsCenter>
              <ContainerButtomSeats>
                {BusMap(typeOfBus, numberOfSeats, 0)}
              </ContainerButtomSeats>
            </>
          ) : (
            <>
              <DriverStyled />
              <ContainerTopSeats>
                {BusMap(typeOfBus, numberOfSeats, 3)}
              </ContainerTopSeats>
              <ContainerTopSeatsCenter>
                {BusMap(typeOfBus, numberOfSeats, 2)}
              </ContainerTopSeatsCenter>
              <ContainerHall></ContainerHall>
              <ContainerButtomSeatsCenter>
                {BusMap(typeOfBus, numberOfSeats, 1)}
              </ContainerButtomSeatsCenter>
              <ContainerButtomSeats>
                {BusMap(typeOfBus, numberOfSeats, 0)}
              </ContainerButtomSeats>
            </>
          )}
        </Container>
      </Background>
      {DataGridDemo()}
      {/* <Button
        variant="contained"
        color="success"
        onClick={() => {
          registrar();
        }}
      >
        Registar
      </Button> */}
    </>
  );
};

export default Seat;
