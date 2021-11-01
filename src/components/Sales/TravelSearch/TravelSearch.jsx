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
  const branchOffice = useContext(ContextBranchOffice);
  // console.log("branchOfficeInTravelSearch", branchOffice);

  const { branchInformation } = branchOffice
    ? branchOffice
    : { branchInformation: {} };
  let { destinations, location } = branchInformation;
  // console.log("destinations", destinations);
  // console.log(location, "location");

  const [origin, setOrigin] = useState(""); //problema
  // console.log(origin, "origen");
  useEffect(() => {
    setOrigin(location);
    // console.log(origin, "<<<---<<");
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

  function recoverTripData() {
    if (
      origin !== "" &&
      destination !== "" &&
      formattedTravelDate !== "" &&
      origin !== undefined &&
      destination !== undefined &&
      formattedTravelDate !== undefined &&
      origin !== null &&
      destination !== null &&
      formattedTravelDate !== null
    ) {
      console.log(
        "origin:",
        origin,
        "| destination:",
        destination,
        "| formattedTravelDate:",
        formattedTravelDate
      );

      return (
        <TravelCards
          travelSearchData={{
            selectedDestination: destination,
            selectedTravelDate: formattedTravelDate,
          }}
        />
      );
    } else {
      console.log("ingrese los campos");
      return null;
    }
  }

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
                
              }}
            >
              Buscar
            </Button>
          </ButtonSearch> */}
        </Container>
      </Background>
      {recoverTripData()}
    </>
  );
};

export default TravelSearch;
