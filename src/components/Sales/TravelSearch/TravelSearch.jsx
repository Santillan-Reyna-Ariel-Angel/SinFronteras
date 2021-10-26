import React, { useState, useContext, useRef } from "react";
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

const TravelSearch = () => {
  // const { id, title, body_note } = notes ? notes : { title: "" };
  const originLocality = useRef();
  const destinationLocation = useRef();

  const branchOffice = useContext(ContextBranchOffice);
  // console.log("branchOfficeInTravelSearch", branchOffice);

  const { branchInformation } = branchOffice
    ? branchOffice
    : { branchInformation: {} };
  let { destinations, location } = branchInformation;
  // console.log("destinations", destinations);

  const destinationsArray = destinations
    ? Object.keys(destinations).map((key) => {
        return destinations[key].destinationLocation;
      })
    : [];
  // console.log("destinationsArray", destinationsArray);

  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();

  // //fecha
  const [travelDate, setTravelDate] = useState(new Date());
  const day = travelDate ? travelDate.getDate() : "dia",
    month = travelDate ? travelDate.getMonth() + 1 : "mes",
    year = travelDate ? travelDate.getFullYear() : "año";
  const formattedDate = day + "/" + month + "/" + year;
  console.log("travelDate: ", travelDate);
  console.log("formattedDate: ", formattedDate);

  const recoverTripData = () => {
    const data = {
      origin: originLocality.current.focus(),
      destination: destinationLocation.current.focus(),
      travelDate: formattedDate,
    };
    console.log("data", data);
  };
  return (
    <>
      <Background>
        <Container>
          <InputOrigin>
            <TextField
              ref={originLocality}
              id="outlined-basic"
              label="Origen"
              variant="outlined"
              className="input"
              // defaultValue={"sucre1"}
              defaultValue={location}
              onChange={(e) => {
                setOrigin(e.target.value);
              }}
            />
          </InputOrigin>

          <InputDestination>
            <Autocomplete
              // options={["La Paz1", "La Paz2"]}
              options={destinationsArray}
              // sx={{ width: 225 }}
              renderInput={(params) => (
                <TextField
                  className="input"
                  {...params}
                  ref={destinationLocation}
                  label="Destino"
                  onChange={(e) => {
                    setDestination(e.target.value);
                  }}
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
    </>
  );
};

export default TravelSearch;
