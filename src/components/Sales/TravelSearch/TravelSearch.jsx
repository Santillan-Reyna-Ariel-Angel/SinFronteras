import React, { useState, useContext, useEffect } from "react";
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
  console.log(location, "xd");

  const [origin, setOrigin] = useState(""); //problema
  console.log(origin, "origen");
  useEffect(() => {
    setOrigin(location);
    console.log(origin, "<<<---<<");
  }, [setOrigin, origin]);

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
  const formattedTravelDate = travelDate.toLocaleDateString();

  // console.log("travelDate: ", travelDate);
  // console.log("formattedTravelDate: ", formattedTravelDate);

  // const [generateCard, setGenerateCard] = useState(false);

  function mostrarCarta() {
    // setGenerateCard(true);
    // if (generateCard) {
    console.log("d", destination, "f", formattedTravelDate);
    return (
      <TravelCards
        travelSearchData={{
          selectedDestination: destination,
          selectedTravelDate: formattedTravelDate,
        }}
      />
    );
    // } else {
    //   return null;
    // }
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
    // setGenerateCard(true);
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
          {/* <ButtonSearch>
            <Button
              variant="contained"
              color="success"
              onClick={(e) => {
                e.preventDefault();
                recoverTripData();
                // mostrarCarta();
              }}
            >
              Buscar
            </Button>
          </ButtonSearch> */}
        </Container>
      </Background>
      {mostrarCarta()}
      {/* {destination !== "" && formattedTravelDate !== "dia-mes-año" ? (
        <TravelCards
          travelSearchData={{
            selectedDestination: destination,
            selectedTravelDate: formattedTravelDate,
          }}
        />
      ) : (
        console.log("no view card travel")
      )} */}

      {/* <TravelCards
        travelSearchData={{
          selectedDestination: "yacuiba", //cambiar segun la lacacion en que nos logeemos
          selectedTravelDate: "30-10-2021",
        }}
      /> */}
    </>
  );
};

export default TravelSearch;
