import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
//Context branchOffice
import { ContextBranchOffices } from "./../../../contexts/ContextBranchOffices";

const top100Films = [
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];
const TravelSearch = () => {
  const branchOffices = useContext(ContextBranchOffices);
  const { ...newBranchOffices } = branchOffices ? branchOffices : "";

  const branchOfficesArray = Object.keys(newBranchOffices).map((key) => {
    return newBranchOffices[key];
  });
  console.log(branchOfficesArray);

  const { branchInformation } = branchOfficesArray[2];
  console.log(branchInformation);
  // for (const property in branchOfficesArray[2]) {
  //   console.log(`${property}: ${branchOfficesArray[2][property]}`);
  // }
  // console.log(branchOfficesArray[2]);

  // const { branchInformation } = branchOfficesArray[2];

  // console.log(
  //   branchOfficesArray[2].branchInformation.destinations.code1
  //     .destinationLocation
  // );

  // Object.keys(
  //   Object.keys(branchOfficesArray[2].branchInformation.destinations)
  // ).map((element) => {
  //   return console.log(element.destinationLocation);
  // });

  const options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });
  return (
    <>
      <Autocomplete
        id="grouped-demo"
        options={options.sort(
          (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
        )}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.title}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Origen" />}
      />
    </>
  );
};

export default TravelSearch;
