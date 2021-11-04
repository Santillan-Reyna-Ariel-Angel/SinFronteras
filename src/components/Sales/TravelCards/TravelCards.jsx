import React, { useContext } from 'react';
//icons
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
// import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import Button from '@mui/material/Button';

//Estilos
import {
  Background,
  Container,
  RouteStyle,
  BusStyle,
  TextDepartureTimeStyle,
  BtnSeeBusStyle,
  BusTypeNameStyle,
  DepartureTimeStyle,
  ContainerCardBody,
} from './TravelCardsStyles';
//Contexto Sucursal
import { ContextBranchOffice } from './../../../contexts/ContextBranchOffice';

const TravelCards = ({ travelSearchData }) => {
  const { origin, destination, selectedTravelDate } = travelSearchData;
  const branchOffice = useContext(ContextBranchOffice);
  const { travels } = branchOffice ? branchOffice : { travels: {} };
  console.log('travels', travels);

  let travelCardsList = Object.keys(travels).map((travelKey) => {
    // return console.log(travels[travelKey].destinationLocation);
    let {
      localityOfOrigin,
      destinationLocation,
      bus: {
        typeOfBus: { busTypeName },
      },
      departureTime,
      travelDate,
    } = travels[travelKey];

    if (
      destinationLocation === destination &&
      travelDate === selectedTravelDate
    ) {
      let travelData = {
        localityOfOrigin,
        destinationLocation,
        busTypeName,
        departureTime,
        travelDate,
      };
      return travelData;
    } else {
      return {};
    }
  });

  //travelCardsListAux se le copiara solo los jsons({}) que NO esten vacios, es decir se copiaran jsons({}) que contengan datos de viajes.
  const travelCardsListAux = [];
  travelCardsList.forEach(function (elemento, indice, array) {
    if (Object.keys(elemento).length !== 0) {
      travelCardsListAux.push(elemento);
    }
  });

  // console.log("travelCardsList", travelCardsList);
  // console.log("travelCardsListAux", travelCardsListAux);

  return (
    <>
      {/* Se verifica si existe 1 o mas viajes en el array travelCardsListAux, de ser asi se genera la tarjeta con los datos, caso contrario se muestra una tarjeta indicando que no se encontraron viajes*/}
      {travelCardsListAux.length >= 1 ? (
        travelCardsListAux.map((travelItem) => {
          return (
            <>
              <Background>
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
                      <span>{`Hr. Salida`}</span>
                    </div>
                  </TextDepartureTimeStyle>
                  <BtnSeeBusStyle>
                    <Button
                      variant="contained"
                      color="success"
                      endIcon={<DirectionsBusRoundedIcon />}
                    >
                      Ver bus
                    </Button>
                  </BtnSeeBusStyle>
                  <BusTypeNameStyle>
                    <span>{`${travelItem.busTypeName}`}</span>
                  </BusTypeNameStyle>
                  <DepartureTimeStyle>
                    <span>{`${travelItem.departureTime}`}</span>
                  </DepartureTimeStyle>
                </ContainerCardBody>
              </Background>
            </>
          );
        })
      ) : (
        // console.log("No se encontraron viajes")
        <Background>
          <Container>
            <RouteStyle>
              <span>{`${origin} => ${destination}`}</span>
            </RouteStyle>
          </Container>
          <ContainerCardBody>
            <BusTypeNameStyle>
              <span>
                No se encontraron viajes registrados para hoy, intente con otra
                fecha.
              </span>
            </BusTypeNameStyle>
          </ContainerCardBody>
        </Background>
      )}
    </>
  );
};

export default TravelCards;
