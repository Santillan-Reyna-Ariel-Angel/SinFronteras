import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
const RadioButton = () => {
  const [value, setValue] = React.useState("Hombre");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Sexo</FormLabel>
        <RadioGroup
          row
          aria-label="sexo"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="Hombre" control={<Radio />} label="Hombre" />
          <FormControlLabel value="Mujer" control={<Radio />} label="Mujer" />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default RadioButton;
