import React from "react";
//icons
import DirectionsBusRoundedIcon from "@mui/icons-material/DirectionsBusRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import Button from "@mui/material/Button";
//Usar para los asientos del bus
import EventSeatRoundedIcon from "@mui/icons-material/EventSeatRounded";

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

const TravelCards = () => {
  return (
    <>
      <Background>
        <Container>
          <RouteStyle>
            <span>{`sucre - c. santa cruz`}</span>
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
            <span>{`Leito`}</span>
          </BusTypeNameStyle>
          <DepartureTimeStyle>
            <span>{`18:00`}</span>
          </DepartureTimeStyle>
        </ContainerCardBody>
      </Background>
    </>
  );
};

export default TravelCards;
