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

const TravelSearch = () => {
  const branchOffice = useContext(ContextBranchOffice);
  console.log("branchOfficeAS", branchOffice);
  const { destinations, location } = branchOffice.branchInformation;
  const destinationsArray = Object.keys(destinations).map((key) => {
    return destinations[key].destinationLocation;
  });

  console.log("destinationsArray", destinationsArray);
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
              defaultValue={location}
            />
          </InputOrigin>

          <InputDestination>
            <Autocomplete
              options={destinationsArray}
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
