import React, { useState } from "react";
//MUI-general
import { TextField, Button } from "@mui/material";
//MUI-Fecha de nacimiento
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/lab/";
// import Stack from "@mui/material/Stack";
//MUI-Sexo
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material/";
//MUI-Sucursal/Cargos
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material/";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
// MUI-Boton enviar
import SaveIcon from "@mui/icons-material/Save";
//MUI-ALert//AlertDialog
import { Box, Alert, IconButton, Collapse, AlertTitle } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

// firebase
import { saveUser } from "./UserRegistrationFunctios";

const filter = createFilterOptions();

//Lista de Sucursales=>branch list
const branchList = [
  {
    branchOfficeName: "Sucursal 1",
    location: "Sucre",
    department: "Chuquisaca",
    branchOfficeImg: "foto.png",
    address: "Avenida lajastambo",
    terminal: "Interdepartamnetal",
  },
  {
    branchOfficeName: "Sucursal 2",
    location: "Sucre",
    department: "Chuquisaca",
    branchOfficeImg: "foto.png",
    address: "Avenida lajastambo",
    terminal: "Interdepartamnetal",
  },
  {
    branchOfficeName: "Sucursal 3",
    location: "Sucre",
    department: "Chuquisaca",
    branchOfficeImg: "foto.png",
    address: "Avenida lajastambo",
    terminal: "Interdepartamnetal",
  },
  {
    branchOfficeName: "Sucursal 4",
    location: "Sucre",
    department: "Chuquisaca",
    branchOfficeImg: "foto.png",
    address: "Avenida lajastambo",
    terminal: "Interdepartamnetal",
  },
  {
    branchOfficeName: "Sucursal 5",
    location: "Sucre",
    department: "Chuquisaca",
    branchOfficeImg: "foto.png",
    address: "Avenida lajastambo",
    terminal: "Interdepartamnetal",
  },
];
// Lista de cargos
const listOfCharges = [
  { chargeOfType: "Dueño", licenciaImg: "" },
  { chargeOfType: "Administrador-General", licenciaImg: "" },
  { chargeOfType: "Administrador-Sucursal", licenciaImg: "" },
  { chargeOfType: "Chofer", licenciaImg: "licencia.png" },
  { chargeOfType: "Secretaria(o)", licenciaImg: "" },
  { chargeOfType: "Boletero(a)", licenciaImg: "" },
];
// Lista de estados:
const stateList = [{ statusType: "Activo" }, { statusType: "Inactivo" }];

// COMPOENTE:
const UserRegistration = () => {
  //basicInformation
  const [basicInformation, setBasicInformation] = useState({
    names: "",
    surnames: "",
    ci: "",
    address: "",
    mobile: "",
    email: "",
  });
  console.log("basicInformation: ", basicInformation);
  const handleInputChange = (event) => {
    //toLowerCase() para convertir las entradas en minuscula
    const property = event.target.name;
    if (property === "email") {
      setBasicInformation({
        ...basicInformation,
        [event.target.name]: event.target.value,
      });
    } else {
      setBasicInformation({
        ...basicInformation,
        [event.target.name]: event.target.value.toLowerCase(),
      });
    }
  };

  // Fecha de nacimiento
  const [date, setDate] = useState(new Date());

  const day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear();
  const formattedDate = day + "/" + month + "/" + year;
  //console.log("date: ", date);
  //console.log("formattedDate: ", formattedDate);

  // Sexo
  const [sexo, setSexo] = useState("hombre");
  // console.log("sexo:", sexo);
  const handleChange = (event) => {
    setSexo(event.target.value);
  };

  // Sucursal
  const [branchOffice, setBranchOffice] = useState({
    branchOfficeName: "",
    location: "",
    department: "",
    branchOfficeImg: "",
    address: "",
    terminal: "",
  });
  console.log("branchOffice: ", branchOffice);

  const [openBranchOffice, toggleOpenBranchOffice] = useState(false);
  const handleCloseBranchOffice = () => {
    setDialogValueBranchOffice({
      branchOfficeName: "",
      location: "",
      department: "",
      branchOfficeImg: "",
      address: "",
      terminal: "",
    });

    toggleOpenBranchOffice(false);
  };

  const [dialogValueBranchOffice, setDialogValueBranchOffice] = useState({
    branchOfficeName: "",
    location: "",
    department: "",
    branchOfficeImg: "",
    address: "",
    terminal: "",
  });

  const handleSubmitBranchOffice = (event) => {
    event.preventDefault();
    setBranchOffice({
      branchOfficeName: dialogValueBranchOffice.branchOfficeName,
      location: dialogValueBranchOffice.location,
      department: dialogValueBranchOffice.department,
      branchOfficeImg: dialogValueBranchOffice.branchOfficeImg,
      address: dialogValueBranchOffice.address,
      terminal: dialogValueBranchOffice.terminal,
    });

    handleCloseBranchOffice();
  };
  // Cargos
  const [charge, setCharge] = useState({
    chargeOfType: "",
    licenciaImg: "",
  });
  console.log("charge:", charge);
  const [openCharge, toggleOpenCharge] = useState(false);
  const handleCloseCharge = () => {
    setDialogValueCharge({
      chargeOfType: "",
      licenciaImg: "",
    });

    toggleOpenCharge(false);
  };

  const [dialogValueCharge, setDialogValueCharge] = useState({
    chargeOfType: "",
    licenciaImg: "",
  });

  const handleSubmitCharge = (event) => {
    event.preventDefault();
    setCharge({
      chargeOfType: dialogValueCharge.chargeOfType,
      licenciaImg: dialogValueCharge.licenciaImg,
    });

    handleCloseCharge();
  };

  // Estado
  const [status, setStatus] = useState({ statusType: "" });
  console.log("status:", status);
  const [openStatus, toggleOpenStatus] = useState(false);
  const handleCloseStatus = () => {
    setDialogValueStatus({
      statusType: "",
    });

    toggleOpenStatus(false);
  };

  const [dialogValueStatus, setDialogValueStatus] = useState({
    statusType: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus({
      statusType: dialogValueStatus.statusType,
    });

    handleCloseStatus();
  };

  //Boton Registrar
  // const disabledB = () => {
  //   if (
  //     basicInformation.names === "" ||
  //     basicInformation.surnames === "" ||
  //     basicInformation.ci === "" ||
  //     basicInformation.address === "" ||
  //     basicInformation.mobile === "" ||
  //     basicInformation.email === "" ||
  //     branchOffice.branchOfficeName === "" ||
  //     branchOffice.location === "" ||
  //     branchOffice.department === "" ||
  //     // branchOffice.branchOfficeImg !== "" ||
  //     branchOffice.address === "" ||
  //     branchOffice.terminal === "" ||
  //     charge.chargeOfType === "" ||
  //     // charge.licenciaImg !== "" ||
  //     status.statusType === ""
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  const registerUser = async () => {
    // console.log(basicInformation);
    let response = await saveUser(
      basicInformation,
      formattedDate,
      sexo,
      branchOffice,
      charge,
      status
    );

    // let response = await saveUser(basicInformation);
    if (response === "exitoso") {
      console.log(response);
    } else {
      console.log(response);
    }
  };
  // Alert
  const [openAlert, setOpenAlert] = useState(true);
  //Alet-Dialog
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenAlertDialog(true);
  };

  const handleCloseDialogBack = () => {
    setOpenAlertDialog(false);
  };
  const handleCloseDialogYes = () => {
    setOpenAlertDialog(false);
    setBasicInformation({
      names: "",
      surnames: "",
      ci: "",
      address: "",
      mobile: "",
      email: "",
    });
    setDate(new Date());
    setSexo("hombre");
    setBranchOffice({
      branchOfficeName: "",
      location: "",
      department: "",
      branchOfficeImg: "",
      address: "",
      terminal: "",
    });
    setCharge({
      chargeOfType: "",
      licenciaImg: "",
    });
    setStatus({ statusType: "" });
  };

  return (
    <>
      <p>Registro de ususarios</p>
      <TextField
        label="Nombres"
        variant="outlined"
        type="text"
        name="names"
        value={basicInformation.names}
        onChange={handleInputChange}
      />
      <TextField
        label="Apellidos"
        variant="outlined"
        type="text"
        name="surnames"
        value={basicInformation.surnames}
        onChange={handleInputChange}
      />
      <TextField
        label="Carnet de identidad"
        variant="outlined"
        type="number"
        name="ci"
        value={basicInformation.ci}
        onChange={handleInputChange}
      />
      <TextField
        label="Domicilio"
        variant="outlined"
        type="text"
        name="address"
        value={basicInformation.address}
        onChange={handleInputChange}
      />
      <TextField
        label="Celular"
        variant="outlined"
        type="number"
        name="mobile"
        value={basicInformation.mobile}
        onChange={handleInputChange}
      />
      <TextField
        label="Correo"
        variant="outlined"
        type="email"
        name="email"
        value={basicInformation.email}
        onChange={handleInputChange}
      />
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
          <FormControlLabel value="hombre" control={<Radio />} label="Hombre" />
          <FormControlLabel value="mujer" control={<Radio />} label="Mujer" />
        </RadioGroup>
      </FormControl>
      {/* Sucursal */}
      <Autocomplete
        value={branchOffice}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setTimeout(() => {
              toggleOpenBranchOffice(true);
              setDialogValueBranchOffice({
                branchOfficeName: newValue,
                location: "",
                department: "",
                branchOfficeImg: "",
                address: "",
                terminal: "",
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpenBranchOffice(true);
            setDialogValueBranchOffice({
              branchOfficeName: newValue.inputValue.toLowerCase(),
              location: "",
              department: "",
              branchOfficeImg: "",
              address: "",
              terminal: "",
            });
          } else {
            setBranchOffice(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              branchOfficeName: `Añadir "${params.inputValue}"`,
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
          return option.branchOfficeName;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => (
          <li {...props}>{option.branchOfficeName}</li>
        )}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Sucursal" />}
      />
      <Dialog open={openBranchOffice} onClose={handleCloseBranchOffice}>
        <form onSubmit={handleSubmitBranchOffice}>
          <DialogTitle>AÑADIR UNA NUEVA SUCURSAL</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Por favor ingresa los datos correspondientes
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="branchOfficeName"
              value={dialogValueBranchOffice.branchOfficeName.toLowerCase()}
              onChange={(event) =>
                setDialogValueBranchOffice({
                  ...dialogValueBranchOffice,
                  branchOfficeName: event.target.value.toLowerCase(),
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
              value={dialogValueBranchOffice.location}
              onChange={(event) =>
                setDialogValueBranchOffice({
                  ...dialogValueBranchOffice,
                  location: event.target.value.toLowerCase(),
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
              value={dialogValueBranchOffice.department}
              onChange={(event) =>
                setDialogValueBranchOffice({
                  ...dialogValueBranchOffice,
                  department: event.target.value.toLowerCase(),
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
              value={dialogValueBranchOffice.branchOfficeImg}
              onChange={(event) =>
                setDialogValueBranchOffice({
                  ...dialogValueBranchOffice,
                  branchOfficeImg: event.target.value.toLowerCase(),
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
              value={dialogValueBranchOffice.address}
              onChange={(event) =>
                setDialogValueBranchOffice({
                  ...dialogValueBranchOffice,
                  address: event.target.value.toLowerCase(),
                })
              }
              label="Direccion"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="terminal"
              value={dialogValueBranchOffice.terminal}
              onChange={(event) =>
                setDialogValueBranchOffice({
                  ...dialogValueBranchOffice,
                  terminal: event.target.value.toLowerCase(),
                })
              }
              label="Terminal"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseBranchOffice}>Cancelar</Button>
            <Button type="submit">Añadir</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Cargos */}

      <Autocomplete
        value={charge}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setTimeout(() => {
              toggleOpenCharge(true);
              setDialogValueCharge({
                chargeOfType: newValue,
                licenciaImg: "",
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpenCharge(true);
            setDialogValueCharge({
              chargeOfType: newValue.inputValue.toLowerCase(),
              licenciaImg: "",
            });
          } else {
            setCharge(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              chargeOfType: `Añadir "${params.inputValue}"`,
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
          return option.chargeOfType;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => (
          <li {...props}>{option.chargeOfType}</li>
        )}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Cargo" />}
      />
      <Dialog open={openCharge} onClose={handleCloseCharge}>
        <form onSubmit={handleSubmitCharge}>
          <DialogTitle>AÑADIR UN NUEVO CARGO</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Por favor ingresa los datos correspondientes
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="chargeOfType"
              value={dialogValueCharge.chargeOfType.toLowerCase()}
              onChange={(event) =>
                setDialogValueCharge({
                  ...dialogValueCharge,
                  chargeOfType: event.target.value,
                })
              }
              label="Cargo"
              type="text"
              variant="standard"
            />
            {/* <TextField
              margin="dense"
              id="licenciaImg"
              value={dialogValueCharge.licenciaImg}
              onChange={(event) =>
                setDialogValueCharge({
                  ...dialogValueCharge,
                  licenciaImg: event.target.value,
                })
              }
              label="Licencia(Foto)"
              type="text"
              variant="standard"
            /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCharge}>Cancelar</Button>
            <Button type="submit">Añadir</Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* Si es chofer */}
      {/* {charge.chargeOfType === "Chofer" ||
      charge.chargeOfType === "chofer" ||
      charge === null ? (
        <TextField
          margin="dense"
          id="licenciaImg"
          onChange={(event) =>
            setCharge({
              ...charge,
              licenciaImg: event.target.value,
            })
          }
          label="Licencia(Foto)"
          type="text"
          variant="standard"
        />
      ) : (
        console.log("nada")
      )} */}

      {/* Esado: */}
      <Autocomplete
        value={status}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setTimeout(() => {
              toggleOpenStatus(true);
              setDialogValueStatus({
                statusType: newValue,
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpenStatus(true);
            setDialogValueStatus({
              statusType: newValue.inputValue.toLowerCase(),
            });
          } else {
            setStatus(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              statusType: `Añadir "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={stateList}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.statusType;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => (
          <li {...props}>{option.statusType}</li>
        )}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Estado" />}
      />
      <Dialog open={openStatus} onClose={handleCloseStatus}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>AÑADIR UN NUEVO ESTADO</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Por favor ingresa los datos correspondientes
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValueStatus.statusType}
              onChange={(event) =>
                setDialogValueStatus({
                  ...dialogValueStatus,
                  statusType: event.target.value,
                })
              }
              label="Estado"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseStatus}>Cancelar</Button>
            <Button type="submit">Añadir</Button>
          </DialogActions>
        </form>
      </Dialog>
      {/*Boton y alerta registrar */}
      <div>
        <Button
          onClick={handleClickOpenDialog}
          disabled={false}
          variant="contained"
          startIcon={<SaveIcon />}
        >
          Registrar
        </Button>
        <Dialog
          open={openAlertDialog}
          onClose={handleCloseDialogYes}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`REGISTRO DE USUSARIOS`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Esta seguro de registrar a ${basicInformation.names} ${basicInformation.surnames} ?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogBack}>Atras</Button>
            <Button
              onClick={() => {
                registerUser();
                handleCloseDialogYes();
              }}
              autoFocus
            >
              Si
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* Alert */}
      <Box sx={{ width: "100%" }}>
        <Collapse in={openAlert}>
          <Alert
            variant="filled"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            <AlertTitle>Genial</AlertTitle>
            El usuario se registro exitosamente
          </Alert>
        </Collapse>
        <Button
          disabled={openAlert}
          variant="outlined"
          onClick={() => {
            setOpenAlert(true);
          }}
        >
          Mostrar Alerta
        </Button>
      </Box>
    </>
  );
};

export default UserRegistration;
