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

const TravelSearch = () => {
  // const { id, title, body_note } = notes ? notes : { title: "" };
  const branchOffice = useContext(ContextBranchOffice);
  console.log("branchOfficeInTravelSearch", branchOffice);
  // const { branchInformation } = branchOffice
  //   ? branchOffice
  //   : { branchInformation: "" };
  // const { destinations, location } = branchInformation;
  // Object.getOwnPropertyNames()
  // const destinationsArray = Object.keys(destinations).map((key) => {
  //   return destinations[key].destinationLocation;
  // });
  // console.log("destinationsArray", destinationsArray);

  // useEffect(() => {});

  //fecha
  const [value, setValue] = useState(new Date());
  return (
    <>
      <Background>
        <Container>
          <InputOrigin>
            <TextField
              id="outlined-basic"
              label="Origen"
              variant="outlined"
              className="input"
              // defaultValue={location || ""}
              defaultValue={"sucre1"}
            />
          </InputOrigin>

          <InputDestination>
            <Autocomplete
              // options={destinationsArray || []}
              options={["La Paz1", "La Paz2"]}
              // sx={{ width: 225 }}
              renderInput={(params) => (
                <TextField className="input" {...params} label="Destino" />
              )}
            />
          </InputDestination>
          <InputDate>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Fecha de viaje"
                value={value}
                minDate={new Date()}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField className="input" {...params} />
                )}
              />
            </LocalizationProvider>
          </InputDate>
          <ButtonSearch>
            <Button variant="contained" color="success">
              Buscar
            </Button>
          </ButtonSearch>
        </Container>
      </Background>
    </>
  );
};

export default TravelSearch;
