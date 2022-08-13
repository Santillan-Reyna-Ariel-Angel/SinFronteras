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
  const formattedDate = day + '/' + month + '/' + year; // otra opcion:  formattedDate=date.toLocaleDateString();
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

  const fielBasicInformation = ({
    ClassName = '',
    Label,
    Variant = 'outlined',
    Type,
    Name,
    Value,
    OnChange = changeBasicInformation,
    Margin = 'none',
  }) => {
    //añadir: margin
    return (
      <>
        <TextField
          className={ClassName}
          label={Label}
          variant={Variant} //"outlined"
          type={Type}
          name={Name}
          value={Value}
          onChange={OnChange}
          margin={Margin}
        />
      </>
    );
  };

  return (
    <>
      <Background>
        <br />
        <br />
        <Container>
          <InputNames>
            {fielBasicInformation({
              ClassName: 'input',
              Label: 'Nombres',
              Type: 'text',
              Name: 'names',
              Value: basicInformation.names,
            })}
          </InputNames>
          <InputSurnames>
            {fielBasicInformation({
              ClassName: 'input',
              Label: 'Apellidos',
              Type: 'text',
              Name: 'surnames',
              Value: basicInformation.surnames,
            })}
          </InputSurnames>
          <InputCi>
            {fielBasicInformation({
              ClassName: 'input',
              Label: 'Carnet de identidad',
              Type: 'number',
              Name: 'ci',
              Value: basicInformation.ci,
            })}
          </InputCi>
          <InputAddress>
            {fielBasicInformation({
              ClassName: 'input',
              Label: 'Domicilio',
              Type: 'text',
              Name: 'address',
              Value: basicInformation.address,
            })}
          </InputAddress>
          <InputMobile>
            {fielBasicInformation({
              ClassName: 'input',
              Label: 'Celular',
              Type: 'number',
              Name: 'mobile',
              Value: basicInformation.mobile,
            })}
          </InputMobile>
          <InputEmail>
            {fielBasicInformation({
              ClassName: 'input',
              Label: 'Correo',
              Type: 'email',
              Name: 'email',
              Value: basicInformation.email,
            })}
          </InputEmail>

          {/* Fecha de nacimiento: */}
          <InputDateOfBirdth>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disableFuture
                label="F. nacimiento(dia/mes/año)"
                minDate={new Date('1942-01-01')}
                maxDate={new Date()}
                openTo="year"
                views={['year', 'month', 'day']}
                value={date}
                inputFormat="dd/MM/yyyy" //IMPORTANTE formato de fecha
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    className="input"
                    {...params}
                    helperText={'Ej. 01/06/1985'} //Texto de ayuda (debajo del input)
                  />
                )}
              />
            </LocalizationProvider>
          </InputDateOfBirdth>

          {/* Sexo: */}
          <InputSex>
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

          {/* Sucursal: */}
          <InputBranchOffice>
            <Autocomplete
              value={branchOffice}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  toggleOpenBranchOffice(true);
                  setDialogValueBranchOffice({
                    ...defaultDataBranchOffice,
                    branchOfficeName: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  toggleOpenBranchOffice(true);
                  setDialogValueBranchOffice({
                    ...defaultDataBranchOffice,
                    branchOfficeName: newValue.inputValue.toLowerCase(),
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
                    label="Sucursal"
                    variant="standard"
                    type="text"
                    name="branchOfficeName"
                    value={dialogValueBranchOffice.branchOfficeName.toLowerCase()}
                    onChange={(event) =>
                      setDialogValueBranchOffice({
                        ...dialogValueBranchOffice,
                        branchOfficeName: event.target.value.toLowerCase(),
                      })
                    }
                    // autoFocus
                    margin="dense"
                  />

                  {/* {fielBasicInformation({
                    Label: 'Sucursal',
                    Variant: 'standard',
                    Type: 'text',
                    Name: 'branchOfficeName',
                    Value:
                      dialogValueBranchOffice.branchOfficeName.toLowerCase(),
                    OnChange: [
                      (event) =>
                        setDialogValueBranchOffice({
                          ...dialogValueBranchOffice,
                          branchOfficeName: event.target.value.toLowerCase(),
                        }),
                    ],
                  })} */}

                  <TextField
                    label="Localidad"
                    variant="standard"
                    type="text"
                    name="location"
                    value={dialogValueBranchOffice.location}
                    onChange={(event) =>
                      setDialogValueBranchOffice({
                        ...dialogValueBranchOffice,
                        location: event.target.value.toLowerCase(),
                      })
                    }
                    margin="dense"
                  />
                  <TextField
                    label="Departamento"
                    variant="standard"
                    type="text"
                    name="department"
                    value={dialogValueBranchOffice.department}
                    onChange={(event) =>
                      setDialogValueBranchOffice({
                        ...dialogValueBranchOffice,
                        department: event.target.value.toLowerCase(),
                      })
                    }
                    margin="dense"
                  />
                  <TextField
                    label="Sucursal(Foto)"
                    variant="standard"
                    type="text"
                    name="branchOfficeImg"
                    value={dialogValueBranchOffice.branchOfficeImg}
                    onChange={(event) =>
                      setDialogValueBranchOffice({
                        ...dialogValueBranchOffice,
                        branchOfficeImg: event.target.value.toLowerCase(),
                      })
                    }
                    margin="dense"
                  />
                  <TextField
                    label="Direccion"
                    variant="standard"
                    type="text"
                    name="address"
                    value={dialogValueBranchOffice.address}
                    onChange={(event) =>
                      setDialogValueBranchOffice({
                        ...dialogValueBranchOffice,
                        address: event.target.value.toLowerCase(),
                      })
                    }
                    margin="dense"
                  />
                  <TextField
                    label="Terminal"
                    variant="standard"
                    type="text"
                    name="terminal"
                    value={dialogValueBranchOffice.terminal}
                    onChange={(event) =>
                      setDialogValueBranchOffice({
                        ...dialogValueBranchOffice,
                        terminal: event.target.value.toLowerCase(),
                      })
                    }
                    margin="dense"
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

          {/* Cargos */}
          <InputCharge>
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

          {/* Esado: */}
          <InputStatus>
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
