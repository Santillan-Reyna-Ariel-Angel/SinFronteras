import React, { useState } from 'react';
//MUI-general:
import {
  TextField,
  Button,
  //for sex:
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  //for branchs/charges:
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  //for autoComplete:
  Autocomplete,
  createFilterOptions,
} from '@mui/material';
//  import Stack from "@mui/material/Stack";
//  MUI-Lab For Fecha de nacimiento:
import { LocalizationProvider, DatePicker } from '@mui/lab/';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
//  MUI-icons:
import SaveIcon from '@mui/icons-material/Save';
//Styles:
import {
  Background,
  BtnToRegistrer,
  Container,
  InputAddress,
  InputBranchOffice,
  InputCharge,
  InputCi,
  InputDateOfBirdth,
  InputEmail,
  InputMobile,
  InputNames,
  InputSex,
  InputStatus,
  InputSurnames,
} from './UserRegistrationStyles';
//Firebase Functions:
import { saveUser } from './UserRegistrationFunctios';
//Others:
import { branchList, listOfCharges, stateList } from './data';

const filter = createFilterOptions();

const UserRegistration = () => {
  //basicInformation:
  let defaultDataBasicInformation = {
    names: '',
    surnames: '',
    ci: '',
    address: '',
    mobile: '',
    email: '',
  };
  const [basicInformation, setBasicInformation] = useState(
    defaultDataBasicInformation
  );
  console.log('basicInformation: ', basicInformation);

  const changeBasicInformation = (event) => {
    //toLowerCase() para convertir las entradas en minuscula
    const property = event.target.name;
    if (property === 'email') {
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
  const [date, setDate] = useState(null);

  const day = date ? date.getDate() : 'dia',
    month = date ? date.getMonth() + 1 : 'mes',
    year = date ? date.getFullYear() : 'año';
  const formattedDate = day + '/' + month + '/' + year;
  // console.log('date: ', date);
  console.log('formattedDate: ', formattedDate);

  // Sexo
  const [sex, setSex] = useState('hombre');
  // console.log("sex:", sex);
  const changeSex = (event) => {
    setSex(event.target.value);
  };

  // Sucursal
  let defaultDataBranchOffice = {
    branchOfficeName: '',
    location: '',
    department: '',
    branchOfficeImg: '',
    address: '',
    terminal: '',
  };
  const [branchOffice, setBranchOffice] = useState(defaultDataBranchOffice);
  console.log('branchOffice: ', branchOffice);

  const [openBranchOffice, toggleOpenBranchOffice] = useState(false);
  const handleCloseBranchOffice = () => {
    setDialogValueBranchOffice(defaultDataBranchOffice);

    toggleOpenBranchOffice(false);
  };

  const [dialogValueBranchOffice, setDialogValueBranchOffice] = useState(
    defaultDataBranchOffice
  );

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

  // Cargos:
  let defaultDataCharge = {
    chargeOfType: '',
    licenciaImg: '',
  };
  const [charge, setCharge] = useState(defaultDataCharge);
  // console.log('charge:', charge);

  const [openCharge, toggleOpenCharge] = useState(false);
  const handleCloseCharge = () => {
    setDialogValueCharge(defaultDataCharge);

    toggleOpenCharge(false);
  };

  const [dialogValueCharge, setDialogValueCharge] = useState(defaultDataCharge);

  const handleSubmitCharge = (event) => {
    event.preventDefault();
    setCharge({
      chargeOfType: dialogValueCharge.chargeOfType,
      licenciaImg: dialogValueCharge.licenciaImg,
    });

    handleCloseCharge();
  };

  // Estado:
  let defaultDataStatus = { statusType: '' };
  const [status, setStatus] = useState(defaultDataStatus);
  // console.log('status:', status);
  const [openStatus, toggleOpenStatus] = useState(false);

  const handleCloseStatus = () => {
    setDialogValueStatus(defaultDataStatus);

    toggleOpenStatus(false);
  };

  const [dialogValueStatus, setDialogValueStatus] = useState(defaultDataStatus);

  const handleSubmitStatus = (event) => {
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
      sex,
      branchOffice,
      charge,
      status
    );

    // let response = await saveUser(basicInformation);
    if (response === 'exitoso') {
      console.log(response);
    } else {
      console.log(response);
    }
  };

  //Alet-Dialog:
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenAlertDialog(true);
  };
  const handleCloseDialogBack = () => {
    setOpenAlertDialog(false);
  };
  const handleCloseDialogYes = () => {
    setOpenAlertDialog(false);
    setBasicInformation(defaultDataBasicInformation);
    setDate(null);
    setSex('hombre');
    setBranchOffice(defaultDataBranchOffice);
    setCharge(defaultDataCharge);
    setStatus(defaultDataStatus);
  };

  return (
    <>
      <Background>
        <br />
        <br />
        <Container>
          <InputNames>
            <TextField
              label="Nombres"
              variant="outlined"
              type="text"
              name="names"
              className="input"
              value={basicInformation.names}
              onChange={changeBasicInformation}
            />
          </InputNames>
          <InputSurnames>
            <TextField
              label="Apellidos"
              variant="outlined"
              type="text"
              name="surnames"
              className="input"
              value={basicInformation.surnames}
              onChange={changeBasicInformation}
            />
          </InputSurnames>
          <InputCi>
            <TextField
              label="Carnet de identidad"
              variant="outlined"
              type="number"
              name="ci"
              className="input"
              value={basicInformation.ci}
              onChange={changeBasicInformation}
            />
          </InputCi>

          <InputAddress>
            <TextField
              label="Domicilio"
              variant="outlined"
              type="text"
              name="address"
              className="input"
              value={basicInformation.address}
              onChange={changeBasicInformation}
            />
          </InputAddress>
          <InputMobile>
            <TextField
              label="Celular"
              variant="outlined"
              type="number"
              name="mobile"
              className="input"
              value={basicInformation.mobile}
              onChange={changeBasicInformation}
            />
          </InputMobile>
          <InputEmail>
            <TextField
              label="Correo"
              variant="outlined"
              type="email"
              name="email"
              className="input"
              value={basicInformation.email}
              onChange={changeBasicInformation}
            />
          </InputEmail>
          <InputDateOfBirdth>
            {/* Fecha de nacimiento: */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disableFuture
                label="Fecha de nacimiento"
                minDate={new Date('1922-01-01')}
                maxDate={new Date()}
                openTo="year"
                views={['year', 'month', 'day']}
                value={date}
                // mask="mes/dia/año"
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField className="input" {...params} />
                )}
              />
            </LocalizationProvider>
          </InputDateOfBirdth>
          <InputSex>
            {/* Sexo: */}
            <FormControl component="fieldset">
              <FormLabel component="legend">Sexo:</FormLabel>
              <RadioGroup
                row
                aria-label="sex"
                name="controlled-radio-buttons-group"
                value={sex}
                onChange={changeSex}
              >
                <FormControlLabel
                  value="hombre"
                  control={<Radio />}
                  label="Hombre"
                />
                <FormControlLabel
                  value="mujer"
                  control={<Radio />}
                  label="Mujer"
                />
              </RadioGroup>
            </FormControl>
          </InputSex>
          <InputBranchOffice>
            {/* Sucursal */}
            <Autocomplete
              value={branchOffice}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  setTimeout(() => {
                    toggleOpenBranchOffice(true);
                    setDialogValueBranchOffice({
                      branchOfficeName: newValue,
                      location: '',
                      department: '',
                      branchOfficeImg: '',
                      address: '',
                      terminal: '',
                    });
                  });
                } else if (newValue && newValue.inputValue) {
                  toggleOpenBranchOffice(true);
                  setDialogValueBranchOffice({
                    branchOfficeName: newValue.inputValue.toLowerCase(),
                    location: '',
                    department: '',
                    branchOfficeImg: '',
                    address: '',
                    terminal: '',
                  });
                } else {
                  setBranchOffice(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== '') {
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
                if (typeof option === 'string') {
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
              freeSolo
              renderInput={(params) => (
                <TextField className="input" {...params} label="Sucursal" />
              )}
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
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleCloseBranchOffice}
                  >
                    Cancelar
                  </Button>
                  <Button variant="contained" color="success" type="submit">
                    Añadir
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </InputBranchOffice>

          <InputCharge>
            {/* Cargos */}

            <Autocomplete
              value={charge}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  setTimeout(() => {
                    toggleOpenCharge(true);
                    setDialogValueCharge({
                      chargeOfType: newValue,
                      licenciaImg: '',
                    });
                  });
                } else if (newValue && newValue.inputValue) {
                  toggleOpenCharge(true);
                  setDialogValueCharge({
                    chargeOfType: newValue.inputValue.toLowerCase(),
                    licenciaImg: '',
                  });
                } else {
                  setCharge(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== '') {
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
                if (typeof option === 'string') {
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
              freeSolo
              renderInput={(params) => (
                <TextField className="input" {...params} label="Cargo" />
              )}
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
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleCloseCharge}
                  >
                    Cancelar
                  </Button>
                  <Button variant="contained" color="success" type="submit">
                    Añadir
                  </Button>
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
          </InputCharge>

          <InputStatus>
            {/* Esado: */}
            <Autocomplete
              value={status}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
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

                if (params.inputValue !== '') {
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
                if (typeof option === 'string') {
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
              freeSolo
              renderInput={(params) => (
                <TextField className="input" {...params} label="Estado" />
              )}
            />
            <Dialog open={openStatus} onClose={handleCloseStatus}>
              <form onSubmit={handleSubmitStatus}>
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
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleCloseStatus}
                  >
                    Cancelar
                  </Button>
                  <Button variant="contained" color="success" type="submit">
                    Añadir
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </InputStatus>
          <BtnToRegistrer>
            {/*Boton y alerta registrar */}
            <div>
              <Button
                color="success"
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
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleCloseDialogBack}
                  >
                    Atras
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
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
          </BtnToRegistrer>
        </Container>
      </Background>
    </>
  );
};

export default UserRegistration;
