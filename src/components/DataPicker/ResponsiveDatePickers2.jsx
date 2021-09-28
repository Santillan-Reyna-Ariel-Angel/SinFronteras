import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Stack from "@mui/material/Stack";

export const ResponsiveDatePickers2 = ({ type, title }) => {
  const [value, setValue] = React.useState(new Date());

  const TypeDataPicker = (type, title) => {
    switch (type) {
      case "mobile":
        return (
          <MobileDatePicker
            label={title}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        );
        break;

      case "desktop":
        return (
          <DesktopDatePicker
            label={title}
            value={value}
            minDate={new Date("2017-01-01")}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        );
        break;

      case "responsive":
        return (
          <DatePicker
            disableFuture
            label={title}
            openTo="year"
            views={["year", "month", "day"]}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        );
        break;

      default:
        console.log(
          "Error de tipo, los tipos disponibles son:\nmobile\ndesktop\nresponsive"
        );
        break;
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/* <Stack spacing={3}> */}
        {TypeDataPicker(type, title)}
        {/* </Stack> */}
      </LocalizationProvider>
    </>
  );
};

export default ResponsiveDatePickers2;
