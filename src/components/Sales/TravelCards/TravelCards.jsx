import React, { useContext } from "react";
//icons
import DirectionsBusRoundedIcon from "@mui/icons-material/DirectionsBusRounded";
// import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import Button from "@mui/material/Button";
//Usar para los asientos del bus
// import EventSeatRoundedIcon from "@mui/icons-material/EventSeatRounded";

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
} from "./TravelCardsStyles";
//Contexto Sucursal
import { ContextBranchOffice } from "./../../../contexts/ContextBranchOffice";

const TravelCards = ({ travelSearchData }) => {
  const { origin, destination, selectedTravelDate } = travelSearchData;
  const branchOffice = useContext(ContextBranchOffice);
  const { travels } = branchOffice ? branchOffice : { travels: {} };
  console.log("travels", travels);

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
  console.log("travelCardsList", travelCardsList);
  return (
    <>
      {travelCardsList.map((travelItem) => {
        return (
          <>
            {/*Si Object.keys(travelItem).length es !==0, travelItem es un objeto QUE NO ESTA VACIO, por lo tanto formara una card*/}
            {Object.keys(travelItem).length !== 0 ? (
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
                      <QueryBuilderRoundedIcon sx={{ marginRight: "2px" }} />
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
            ) : (
              <Background>
                <Container>
                  <RouteStyle>
                    <span>{`${origin} => ${destination}`}</span>
                  </RouteStyle>
                </Container>
                <ContainerCardBody>
                  <BusTypeNameStyle>
                    <span>
                      No se encontraron viajes registrados para hoy, intente con
                      otra fecha.
                    </span>
                  </BusTypeNameStyle>
                </ContainerCardBody>
              </Background>
            )}
          </>
        );
      })}
    </>
  );
};

export default TravelCards;
