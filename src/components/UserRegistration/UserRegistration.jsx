import React, { useState } from "react";
//MUI
import { TextField } from "@mui/material";
//MUI-fecha de nacimiento
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Stack from "@mui/material/Stack";
//MUI-Sexo
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
//MUI-Sucursal/Cargos
// import TextField from '@mui/material/TextField';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

//Lista de Sucursales=>branch list
const branchList = [
  {
    name: "Sucursal 1",
    location: "Sucre",
    department: "Chuquisaca",
    branchOfficeImg: "foto.png",
    address: "Avenida lajastambo",
    terminal: "Interdepartamnetal",
  },
  {
    name: "Sucursal 2",
    location: "Sucre",
    department: "Chuquisaca",
    branchOfficeImg: "foto.png",
    address: "Avenida lajastambo",
    terminal: "Interdepartamnetal",
  },
  {
    name: "Sucursal 3",
    location: "Sucre",
    department: "Chuquisaca",
    branchOfficeImg: "foto.png",
    address: "Avenida lajastambo",
    terminal: "Interdepartamnetal",
  },
  {
    name: "Sucursal 4",
    location: "Sucre",
    department: "Chuquisaca",
    branchOfficeImg: "foto.png",
    address: "Avenida lajastambo",
    terminal: "Interdepartamnetal",
  },
  {
    name: "Sucursal 5",
    location: "Sucre",
    department: "Chuquisaca",
    branchOfficeImg: "foto.png",
    address: "Avenida lajastambo",
    terminal: "Interdepartamnetal",
  },
];
// Lista de cargos
const listOfCharges = [
  { name: "Dueño", licenciaImg: "licencia.png" },
  { name: "Administrador-General", licenciaImg: "licencia.png" },
  { name: "Administrador-Sucursal", licenciaImg: "licencia.png" },
  { name: "Chofer", licenciaImg: "licencia.png" },
  { name: "Secretaria(o)", licenciaImg: "licencia.png" },
  { name: "Boletero(a)", licenciaImg: "licencia.png" },
];
let ChargeDriver = false;
const UserRegistration = () => {
  // Fecha de nacimiento
  const [date, setDate] = useState(new Date());
  const day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear();
  const formattedDate = day + "/" + month + "/" + year;

  // Sexo
  const [sexo, setSexo] = useState("Hombre");

  const handleChange = (event) => {
    setSexo(event.target.value);
  };

  // Sucursal
  const [branchOffices, setBranchOffices] = useState(null);
  const [openBranchOffices, toggleOpenBranchOffices] = useState(false);

  const handleCloseBranchOffices = () => {
    setDialogValueBranchOffices({
      name: "",
      location: "",
      department: "",
      branchOfficeImg: "",
      address: "",
      terminal: "",
    });

    toggleOpenBranchOffices(false);
  };

  const [dialogValueBranchOffices, setDialogValueBranchOffices] = useState({
    name: "",
    location: "",
    department: "",
    branchOfficeImg: "",
    address: "",
    terminal: "",
  });

  const handleSubmitBranchOffices = (event) => {
    event.preventDefault();
    setBranchOffices({
      name: dialogValueBranchOffices.name,
      location: dialogValueBranchOffices.location,
      department: dialogValueBranchOffices.department,
      branchOfficeImg: dialogValueBranchOffices.branchOfficeImg,
      address: dialogValueBranchOffices.address,
      terminal: dialogValueBranchOffices.terminal,
    });

    handleCloseBranchOffices();
  };

  //Cargos
  const [charges, setCharges] = useState({ name: "" });
  const [openCharges, toggleOpenCharges] = useState(false);
  const handleCloseCharges = () => {
    setDialogValueCharges({
      name: "",
      licenciaImg: "",
    });

    toggleOpenCharges(false);
  };

  const [dialogValueCharges, setDialogValueCharges] = useState({
    name: "",
    licenciaImg: "",
  });

  const handleSubmitCharges = (event) => {
    event.preventDefault();
    setCharges({
      name: dialogValueCharges.name,
      licenciaImg: dialogValueCharges.licenciaImg,
    });

    handleCloseCharges();
  };
  console.log("cargo", charges);
  return (
    <>
      <p>Registro de ususarios</p>
      <TextField label="Nombres" variant="outlined" />
      <TextField label="Apellidos" variant="outlined" />
      <TextField label="Carnet de identidad" variant="outlined" />
      <TextField label="Domicilio" variant="outlined" />
      <TextField label="Celular" variant="outlined" />
      <TextField label="Correo" variant="outlined" type="email" />
      {/* Fecha de nacimiento: */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/* <Stack spacing={3}> */}
        <DatePicker
          disableFuture
          label="Fecha de nacimiento"
          openTo="year"
          views={["year", "month", "day"]}
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        {/* </Stack> */}
      </LocalizationProvider>
      {/* Sexo: */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Sexo:</FormLabel>
        <RadioGroup
          row
          aria-label="sexo"
          name="controlled-radio-buttons-group"
          value={sexo}
          onChange={handleChange}
        >
          <FormControlLabel value="Hombre" control={<Radio />} label="Hombre" />
          <FormControlLabel value="Mujer" control={<Radio />} label="Mujer" />
        </RadioGroup>
      </FormControl>
      {/* Sucursal */}
      <Autocomplete
        value={branchOffices}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setTimeout(() => {
              toggleOpenBranchOffices(true);
              setDialogValueBranchOffices({
                name: newValue,
                location: "",
                department: "",
                branchOfficeImg: "",
                address: "",
                terminal: "",
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpenBranchOffices(true);
            setDialogValueBranchOffices({
              name: newValue.inputValue,
              location: "",
              department: "",
              branchOfficeImg: "",
              address: "",
              terminal: "",
            });
          } else {
            setBranchOffices(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              name: `Añadir "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={branchList}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Sucursal" />}
      />
      <Dialog open={openBranchOffices} onClose={handleCloseBranchOffices}>
        <form onSubmit={handleSubmitBranchOffices}>
          <DialogTitle>AÑADIR UNA NUEVA SUCURSAL</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Por favor ingresa los datos correspondientes
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValueBranchOffices.name}
              onChange={(event) =>
                setDialogValueBranchOffices({
                  ...dialogValueBranchOffices,
                  name: event.target.value,
                })
              }
              label="Sucursal"
              type="text"
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="location"
              value={dialogValueBranchOffices.location}
              onChange={(event) =>
                setDialogValueBranchOffices({
                  ...dialogValueBranchOffices,
                  location: event.target.value,
                })
              }
              label="Localidad"
              type="text"
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="department"
              value={dialogValueBranchOffices.department}
              onChange={(event) =>
                setDialogValueBranchOffices({
                  ...dialogValueBranchOffices,
                  department: event.target.value,
                })
              }
              label="Departamento"
              type="text"
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="branchOfficeImg"
              value={dialogValueBranchOffices.branchOfficeImg}
              onChange={(event) =>
                setDialogValueBranchOffices({
                  ...dialogValueBranchOffices,
                  branchOfficeImg: event.target.value,
                })
              }
              label="Sucursal(Foto)"
              type="text"
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="address"
              value={dialogValueBranchOffices.address}
              onChange={(event) =>
                setDialogValueBranchOffices({
                  ...dialogValueBranchOffices,
                  address: event.target.value,
                })
              }
              label="Direccion"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="terminal"
              value={dialogValueBranchOffices.terminal}
              onChange={(event) =>
                setDialogValueBranchOffices({
                  ...dialogValueBranchOffices,
                  terminal: event.target.value,
                })
              }
              label="Terminal"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseBranchOffices}>Cancelar</Button>
            <Button type="submit">Añadir</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Cargos */}
      <Autocomplete
        value={charges}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setTimeout(() => {
              toggleOpenCharges(true);
              setDialogValueCharges({
                name: newValue,
                licenciaImg: "",
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpenCharges(true);
            setDialogValueCharges({
              name: newValue.inputValue,
              licenciaImg: "",
            });
          } else {
            setCharges(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              name: `Añadir "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={listOfCharges}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Cargo"
            onChange={(event) =>
              event.target.value === "Chofer"
                ? (ChargeDriver = true)
                : (ChargeDriver = false)
            }
          />
        )}
      />
      {listOfCharges.map((element) => {
        if (element.name !== charges.name || ChargeDriver === true) {
          return (
            <>
              <Dialog open={openCharges} onClose={handleCloseCharges}>
                <form onSubmit={handleSubmitCharges}>
                  <DialogTitle>AÑADIR UN NUEVO CARGO</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Por favor ingresa los datos correspondientes
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      value={dialogValueCharges.name}
                      onChange={(event) =>
                        setDialogValueCharges({
                          ...dialogValueCharges,
                          name: event.target.value,
                        })
                      }
                      label="Cargo"
                      type="text"
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseCharges}>Cancelar</Button>
                    <Button type="submit">Añadir</Button>
                  </DialogActions>
                </form>
              </Dialog>
            </>
          );
        } else {
        }
      })}
      {/* <Dialog open={openCharges} onClose={handleCloseCharges}>
        <form onSubmit={handleSubmitCharges}>
          <DialogTitle>AÑADIR UN NUEVO CARGO</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Por favor ingresa los datos correspondientes
            </DialogContentText> */}
      {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValueCharges.name}
              onChange={(event) =>
                setDialogValueCharges({
                  ...dialogValueCharges,
                  name: event.target.value,
                })
              }
              label="Cargo"
              type="text"
              variant="standard"
            /> */}

      {/* <TextField
              margin="dense"
              id="licenciaImg"
              value={dialogValueCharges.licenciaImg}
              onChange={(event) =>
                setDialogValueCharges({
                  ...dialogValueCharges,
                  licenciaImg: event.target.value,
                })
              }
              label="Licencia(Foto)"
              type="text"
              variant="standard"
            /> */}
      {/* </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCharges}>Cancelar</Button>
            <Button type="submit">Añadir</Button>
          </DialogActions>
        </form>
      </Dialog> */}

      {ChargeDriver ? (
        <TextField
          margin="dense"
          id="licenciaImg"
          onChange={(event) =>
            setCharges({
              ...charges,
              licenciaImg: event.target.value,
            })
          }
          label="Licencia(Foto)"
          type="text"
          variant="standard"
        />
      ) : (
        ""
      )}
      {console.log("ChargeDriver", ChargeDriver)}
    </>
  );
};

export default UserRegistration;
