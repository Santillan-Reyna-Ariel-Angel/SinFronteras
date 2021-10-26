import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
//fecha
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
//Context branchOffice
import { ContextBranchOffice } from "../../../contexts/ContextBranchOffice";
//Estilos
import {
  Background,
  Container,
  InputOrigin,
  InputDestination,
  InputDate,
  ButtonSearch,
} from "./TravelSearchStyles";
//Compoenetes
import TravelCards from "./../TravelCards/TravelCards";
const TravelSearch = () => {
  // const { id, title, body_note } = notes ? notes : { title: "" };

  const branchOffice = useContext(ContextBranchOffice);
  // console.log("branchOfficeInTravelSearch", branchOffice);

  const { branchInformation } = branchOffice
    ? branchOffice
    : { branchInformation: {} };
  let { destinations, location } = branchInformation;
  // console.log("destinations", destinations);

  const [origin, setOrigin] = useState(
    location !== undefined ? location : "recargar pagina"
  );
  const originOption = [location];
  // console.log("origin", origin, "originOption", originOption);

  const destinationsArray = destinations
    ? Object.keys(destinations).map((key) => {
        return destinations[key].destinationLocation;
      })
    : [];
  // console.log("destinationsArray", destinationsArray);
  const [destination, setDestination] = useState(
    destinationsArray[0] ? destinationsArray[0] : ""
  );
  // console.log("destination", destination);

  // //fecha
  const [travelDate, setTravelDate] = useState(new Date());
  const day = travelDate ? travelDate.getDate() : "dia",
    month = travelDate ? travelDate.getMonth() + 1 : "mes",
    year = travelDate ? travelDate.getFullYear() : "año";
  const formattedTravelDate = day + "/" + month + "/" + year;
  // console.log("travelDate: ", travelDate);
  // console.log("formattedTravelDate: ", formattedTravelDate);

  const [generateCard, setGenerateCard] = useState(false);

  function mostrarCarta() {
    if (generateCard) {
      return (
        <TravelCards
          travelSearchData={{
            selectedDestination: destination,
            selectedTravelDate: formattedTravelDate,
          }}
        />
      );
    }
  }

  const recoverTripData = () => {
    console.log(
      "origin:",
      origin,
      "| destination:",
      destination,
      "| formattedTravelDate:",
      formattedTravelDate
    );
    setGenerateCard(true);
  };
  return (
    <>
      <Background>
        <Container>
          <InputOrigin>
            {/* <TextField
              id="outlined-basic"
              label="Origen"
              variant="outlined"
              className="input"
              defaultValue={origin}
              value={origin}
            /> */}
            <Autocomplete
              value={origin}
              onChange={(event, newValue) => {
                setOrigin(newValue);
              }}
              id="inputOrigin"
              options={originOption}
              renderInput={(params) => (
                <TextField
                  className="input"
                  {...params}
                  label="Origen"
                  variant="outlined"
                />
              )}
            />
          </InputOrigin>

          <InputDestination>
            <Autocomplete
              value={destination}
              onChange={(event, newValue) => {
                setDestination(newValue);
              }}
              id="inputDestination"
              options={destinationsArray}
              renderInput={(params) => (
                <TextField
                  className="input"
                  {...params}
                  label="Destino"
                  variant="outlined"
                />
              )}
            />
          </InputDestination>
          <InputDate>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Fecha de viaje"
                value={travelDate}
                minDate={new Date()}
                onChange={(newValue) => {
                  setTravelDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField className="input" {...params} />
                )}
              />
            </LocalizationProvider>
          </InputDate>
          <ButtonSearch>
            <Button
              variant="contained"
              color="success"
              onClick={(e) => {
                e.preventDefault();
                recoverTripData();
              }}
            >
              Buscar
            </Button>
          </ButtonSearch>
        </Container>
      </Background>

      {/* {destination !== "" && formattedTravelDate !== "dia/mes/año" ? (
        <TravelCards
          travelSearchData={{
            selectedDestination: destination,
            selectedTravelDate: formattedTravelDate,
          }}
        />
      ) : (
        console.log("no view card travel")
      )} */}

      {/* {mostrarCarta()} */}

      <TravelCards
        travelSearchData={{
          selectedDestination: "yacuiba", //cambiar segun la lacacion en que nos logeemos
          selectedTravelDate: "30-10-2021",
        }}
      />
    </>
  );
};

export default TravelSearch;
