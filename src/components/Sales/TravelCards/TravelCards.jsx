import React, { useContext, useState } from 'react';
//MUI:
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
import NoTransferRoundedIcon from '@mui/icons-material/NoTransferRounded';
// import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
//Styles:
import {
  Background,
  Container,
  RouteStyle,
  BusStyle,
  TextDepartureTimeStyle,
  BtnSeeBusStyle,
  TypeOfBusStyle,
  DepartureTimeStyle,
  ContainerCardBody,
} from './TravelCardsStyles';
//Contexts:
import { ContextBranchOffice } from './../../../contexts/ContextBranchOffice';
import { ContextBranchTripsMade } from './../../../contexts/ContextBranchTripsMade';
import { ContextUserData } from './../../../contexts/ContextUserData';
//Firebase Functions:
import { removeOccupiedSeat } from './../Events/Firebase/removeOccupiedSeat'; //removeOccupiedSeat IN BD
//Components:
import { BusSeatMap } from '../Bus/BusSeatMap/BusSeatMap';
//Others:
import { travelKey } from './../Events/Functions/TripsMadeGenerateKeys';

//Variables del estado que controla ver o no el mapa del bus:
export let showSeatMap, setShowSeatMap;

const TravelCards = ({ travelSearchData }) => {
  //Props:
  const { origin, destination, selectedTravelDate } = travelSearchData;
  //ContextBranchOffice:
  const branchOffice = useContext(ContextBranchOffice);
  const {
    travels,
    branchInformation: { branchNumber },
  } = branchOffice ? branchOffice : { travels: {} };
  // console.log('travels', travels);

  //ContextBranchTripsMade:
  let branchTripsMade = useContext(ContextBranchTripsMade);
  // console.log('branchTripsMade', branchTripsMade);

  //ContextUserData:
  const userData = useContext(ContextUserData);
  let { identificationNumber: identificationNumberUser } = userData;

  //Variable al cual se asignara los datos del bus seleccionado:
  const [dataBusTravelIndex, setDataBusTravelIndex] = useState(0); // "" o 0
  let dataOfTheSelectedTravelBusListAux = [];

  //travelCardsList recuperara info del viaje que coincida con el destino y la fecha de salida ({} para no coincidentes):
  let travelCardsList = Object.keys(travels).map((travelKey) => {
    // return console.log(travels[travelKey].destinationLocation);
    let {
      localityOfOrigin,
      destinationLocation,
      bus: { typeOfBus },
      departureTime,
      travelDate,
    } = travels[travelKey];

    if (
      destinationLocation === destination &&
      travelDate === selectedTravelDate
    ) {
      dataOfTheSelectedTravelBusListAux.push(travels[travelKey]);

      let travelData = {
        localityOfOrigin,
        destinationLocation,
        typeOfBus,
        departureTime,
        travelDate,
      };
      return travelData;
    } else {
      return {};
    }
  });

  //travelCardsListAux se le copiara solo los jsons({}) que NO esten vacios, es decir se copiaran jsons({}) que contengan datos de viajes:
  const travelCardsListAux = [];
  travelCardsList.forEach(function (elemento, indice, array) {
    if (Object.keys(elemento).length !== 0) {
      travelCardsListAux.push(elemento);
    }
  });
  // console.log('travelCardsListAux', travelCardsListAux);

  console.log(
    'dataOfTheSelectedTravelBusListAux: ',
    dataOfTheSelectedTravelBusListAux
  );

  //Estado que controla ver o no el mapa de asientos del bus:
  [showSeatMap, setShowSeatMap] = useState(false);
  // console.log('showSeatMap', showSeatMap);

  //Crear getSelectSeats:
  const getSelectSeats = () => {
    //Recuperando solo los asientos Selecionados del viaje en concreto:
    let selectedSeatsId = [];
    if (dataOfTheSelectedTravelBusListAux.length !== 0) {
      // Object.keys(dataOfTheSelectedTravelBusListAux[dataBusTravelIndex]).length !== 0
      // si el {} no esta vacio pasa AHORA: si dataOfTheSelectedTravelBusListAux no esta vacio pasa (dataOfTheSelectedTravelBusListAux!==[])

      let {
        bus: { enrollment: busEnrollment },
        travelDate,
        departureTime,
      } = dataOfTheSelectedTravelBusListAux.length !== 0
        ? dataOfTheSelectedTravelBusListAux[dataBusTravelIndex]
        : {};

      let travelKeyAux = travelKey({
        travelDate,
        departureTime,
        busEnrollment,
      });
      // console.log('travelKeyAux:', travelKeyAux); //output: travel_7-8-2022_21-30_bus-006
      //IMPORTANTE: 1RO DEBERIA HABERSE CREADO EL VIAJE EN LA BD(TripsMade/branc_x/travel_7-8-2022_21-30_bus-006)
      let {
        [travelKeyAux]: { occupiedSeat },
      } = branchTripsMade;
      // console.log('occupiedSeat', occupiedSeat);

      let occupiedSeatArray = [];
      //json to array:
      for (let i in occupiedSeat) occupiedSeatArray.push([i, occupiedSeat[i]]);
      // console.log('occupiedSeatArray', occupiedSeatArray);

      if (occupiedSeatArray.length !== 0) {
        let selectedSeats = occupiedSeatArray.filter(
          (element) => element[1] === `preventa-${identificationNumberUser}`
        );
        selectedSeatsId = selectedSeats.map((seat) => seat[0]);
      }
    }

    // console.log('selectedSeatsId', selectedSeatsId);
    return selectedSeatsId;
  };

  let selectedSeatsToDelete = getSelectSeats();
  // console.log('selectedSeatsToDelete', selectedSeatsToDelete);

  //ELIMINAR asientos en BD que sean desleccionados o cuando se oculte el "mapa de asientos del bus" (Boton ocultar/ver):
  if (selectedSeatsToDelete.length !== 0 && showSeatMap === false) {
    selectedSeatsToDelete.map((seatId) =>
      removeOccupiedSeat({
        branchNumber,
        dataBusTravel: dataOfTheSelectedTravelBusListAux[dataBusTravelIndex],
        seatId,
      })
    );
  }

  console.log('dataBusTravelIndex', dataBusTravelIndex);
  console.log(
    'dataOfTheSelectedTravelBusListAux',
    dataOfTheSelectedTravelBusListAux
  );

  return (
    <>
      {/* Se verifica si existe 1 o mas viajes en el array travelCardsListAux, de ser asi se genera la tarjeta con los datos, caso contrario se muestra una tarjeta indicando que no se encontraron viajes*/}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="baseline"
        spacing={1}
      >
        {travelCardsListAux.length >= 1 ? (
          travelCardsListAux.map((travelItem, index) => {
            return (
              <>
                <Background key={index}>
                  <Container>
                    <RouteStyle>
                      <span>{`${travelItem.localityOfOrigin} => ${travelItem.destinationLocation}`}</span>
                    </RouteStyle>
                  </Container>
                  <ContainerCardBody>
                    <BusStyle>
                      <DirectionsBusRoundedIcon />
                    </BusStyle>
                    <TextDepartureTimeStyle>
                      <div>
                        <QueryBuilderRoundedIcon sx={{ marginRight: '2px' }} />
                        <span>{`Salida`}</span>
                      </div>
                    </TextDepartureTimeStyle>
                    <BtnSeeBusStyle>
                      <Button
                        variant="contained"
                        color={
                          showSeatMap && index === dataBusTravelIndex
                            ? 'error'
                            : 'success'
                        }
                        endIcon={
                          showSeatMap && index === dataBusTravelIndex ? (
                            <NoTransferRoundedIcon />
                          ) : (
                            <DirectionsBusRoundedIcon />
                          )
                        }
                        onClick={() => [
                          setShowSeatMap(!showSeatMap),
                          setDataBusTravelIndex(index),
                        ]}
                      >
                        {showSeatMap && index === dataBusTravelIndex
                          ? 'Ocultar'
                          : 'Ver'}
                      </Button>
                    </BtnSeeBusStyle>
                    <TypeOfBusStyle>
                      <span>{`${travelItem.typeOfBus}`}</span>
                    </TypeOfBusStyle>
                    <DepartureTimeStyle>
                      <span>{`${travelItem.departureTime}`}</span>
                    </DepartureTimeStyle>
                  </ContainerCardBody>
                </Background>
              </>
            );
          })
        ) : (
          // Cuando No se encuentren viajes:
          <Background>
            <Container>
              <RouteStyle>
                <span>{`${origin} => ${destination}`}</span>
              </RouteStyle>
            </Container>
            <ContainerCardBody>
              <TypeOfBusStyle>
                <span>No se encontraron viajes, intente con otra fecha.</span>
              </TypeOfBusStyle>
            </ContainerCardBody>
          </Background>
        )}
      </Stack>
      {/* Mapa de asientos del Bus: */}
      {travelCardsListAux.length >= 1 && showSeatMap === true ? (
        <BusSeatMap
          dataBusTravel={dataOfTheSelectedTravelBusListAux[dataBusTravelIndex]}
        />
      ) : null}
    </>
  );
};

export { TravelCards };
