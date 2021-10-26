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

// const options = ["Option 1", "Option 2"];
const options = ["c. santa cruz"];

const TravelSearch = () => {
  const [origin, setOrigin] = useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  console.log(origin, "a");
  // const { id, title, body_note } = notes ? notes : { title: "" };

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
    let data = {
      originLocality: "",
      destinationLocation: "",
      formattedDate: "",
    };
    console.log("data", data);
  };
  return (
    <>
      <Background>
        <Container>
          <InputOrigin>
            {/*   // defaultValue={"sucre1"}
            defaultValue={location}
            onChange=
            {(e) => {
              setOrigin(e.target.value);
            }}
            />  */}
            {/* <Autocomplete
              value={origin}
              onChange={(event, newValue) => {
                setOrigin(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              // sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  className="input"
                  {...params}
                  label="Origen"
                  variant="outlined"
                />
              )}
            /> */}
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
