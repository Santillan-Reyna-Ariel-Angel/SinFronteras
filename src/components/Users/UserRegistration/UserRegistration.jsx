import React, { useState, useContext } from 'react';
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
  InputLabel,
  MenuItem,
  Select,
  //for autoComplete:
  Autocomplete,
  createFilterOptions,
} from '@mui/material';
//  import Stack from "@mui/material/Stack";
// manejo de fechas:
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers/';
// idioma del calentario:
import { es } from 'date-fns/locale';

//  MUI-icons:
import SaveIcon from '@mui/icons-material/Save';
//Styles:
import {
  Background,
  HeaderContainer,
  HeaderTitle,
  BtnToRegistrer,
  BodyContainer,
  InputAddress,
  InputBranchOffice2,
  InputCharge,
  InputCi,
  InputDateOfBirdth,
  InputEmail,
  InputMobile,
  InputNames,
  InputSex,
  InputStatus,
  InputSurnames,
  BtnRegistrer,
} from './UserRegistrationStyles';
//Contexts:
import { ContextAllUserData } from './../../../contexts/ContextAllUserData';
import { ContextAllBranchOffices } from './../../../contexts/ContextAllBranchOffices';

//Firebase Functions:
import { saveUser } from './UserRegistrationFunctios';
//Others:
import { listOfCharges, stateList } from './data';
import { dateFormat } from './../../globalFunctions';
import { handleClose } from './../../DialogBasic/DialogBasic';
import { PlainModalButton } from './../../PlainModalButton/PlainModalButton';

const filter = createFilterOptions();

const UserRegistration = ({ identificationNumber = '' }) => {
  console.log('identificationNumber Prop: ', identificationNumber);

  //ContextAllUserData:
  const allUserData = useContext(ContextAllUserData);
  console.log('allUserData: ', allUserData);

  let { [identificationNumber]: userProp } = allUserData ? allUserData : {};
  console.log('userProp', userProp);
  let {
    names,
    surnames,
    identificationNumber: identificationNumberUser,
    address,
    mobile,
    email,
    dateOfBirth,
    sex: sexUser,
    branchOfficeName,
    branchNumberOrCode,
    charge: chargeUser,
    status: statusUser,
  } = userProp ? userProp : {};

  //ContextAllBranchOffices:
  const allBranchOffices = useContext(ContextAllBranchOffices);
  console.log('allBranchOffices', allBranchOffices);
  let branchKeysList = allBranchOffices ? Object.keys(allBranchOffices) : [];
  console.log('branchKeysList', branchKeysList);

  //Lista de Sucursales:
  let optionsBranchList = branchKeysList.map((branchKey) => {
    let { branchNumber, name } = allBranchOffices[branchKey].branchInformation;
    return { branchNumber, name };
  });
  console.log('optionsBranchList', optionsBranchList);

  //basicInformation:
  let defaultDataBasicInformation = {
    names: names ? names : '',
    surnames: surnames ? surnames : '',
    ci: identificationNumberUser ? identificationNumberUser : '',
    address: address ? address : '',
    mobile: mobile ? mobile : '',
    email: email ? email : '',
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

  // Fecha de nacimiento:
  const getDateOfBirthUser = (dateOfBirth) => {
    console.log('dateOfBirth BD:', dateOfBirth);

    if (
      dateOfBirth !== '' &&
      dateOfBirth !== undefined &&
      dateOfBirth !== null
    ) {
      let dateArray = dateOfBirth.split('/');
      let day = dateArray[0];
      let month = dateArray[1] - 1;
      let year = dateArray[2];

      return new Date(year, month, day);
    } else {
      return null;
    }
  };

  let dateOfBirthUser = getDateOfBirthUser(dateOfBirth);
  // console.log('dateOfBirthUser :', dateOfBirthUser);

  const [date, setDate] = useState(dateOfBirthUser);
  // console.log('date: ', date);

  const formattedDate = dateFormat({ date: date, format: 'dd/mm/yyyy' }); //formattedDate podria cambairse a dateOfBirth
  console.log('formattedDate: ', formattedDate);

  // Sexo:
  const [sex, setSex] = useState(sexUser ? sexUser : 'hombre');
  console.log(`sexUser: ${sexUser} | sex : ${sex} `);
  const changeSex = (event) => {
    setSex(event.target.value);
  };

  //Sucursal:
  let defaultDataBranchOffice2 = {
    branchOfficeName: branchOfficeName ? branchOfficeName : '',
    branchNumber: branchNumberOrCode ? branchNumberOrCode : '',
  };
  const [branchOffice, setBranchOffice] = useState(defaultDataBranchOffice2);
  console.log('branchOffice: ', branchOffice);

  const changeBranchOffice = (branchOfficeName) => {
    let selectedBranch = optionsBranchList.filter(
      (optionBranch) => optionBranch.name === branchOfficeName
    );

    setBranchOffice({
      ...branchOffice,
      branchOfficeName: branchOfficeName,
      branchNumber: selectedBranch[0].branchNumber,
    });
  };

  // Cargos:
  let defaultDataCharge = {
    chargeOfType: chargeUser ? chargeUser : '',
  };
  const [charge, setCharge] = useState(defaultDataCharge);
  console.log('charge:', charge);

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
    });

    handleCloseCharge();
  };

  // Estado:
  let defaultDataStatus = { statusType: statusUser ? statusUser : '' };
  const [status, setStatus] = useState(defaultDataStatus);
  console.log('status:', status);
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

  //Boton Registrar:
  //No se usa con BtnRegistrer:
  // const registerUser = () => {
  //   let response = saveUser(
  //     basicInformation,
  //     formattedDate,
  //     sex,
  //     branchOffice,
  //     charge,
  //     status
  //   );

  //   if (response === 'exitoso') {
  //     console.log(response);
  //   } else {
  //     console.log(response);
  //   }
  // };

  //Alet-Dialog:
  //No se usa con BtnRegistrer:
  // const [openAlertDialog, setOpenAlertDialog] = useState(false);
  // const handleClickOpenDialog = () => {
  //   setOpenAlertDialog(true);
  // };
  //No se usa con BtnRegistrer:
  // const handleCloseDialogBack = () => {
  //   setOpenAlertDialog(false);
  // };

  //componentDefaultData:
  const componentDefaultData = () => {
    // setOpenAlertDialog(false);
    setBasicInformation(defaultDataBasicInformation);
    setDate(null);
    setSex('hombre');
    setBranchOffice(defaultDataBranchOffice2);
    setCharge(defaultDataCharge);
    setStatus(defaultDataStatus);
    //Si usamos <BasicDialog> para actualizar data, debemos cerrar el modal:
    let currentUrl = window.location.pathname; // sacamos el la ruta actual
    if (currentUrl === '/personal/lista-de-usuarios') {
      handleClose();
    }
  };

  //Data and Functions MUI:
  const muiTextField = ({
    ClassName = '',
    Label,
    Type = 'text',
    Name,
    Value,
    OnChange = changeBasicInformation,
    Margin = 'none',
    Variant = 'outlined',
    Disabled = false,
  }) => {
    return (
      <>
        <TextField
          className={ClassName}
          label={Label}
          type={Type}
          name={Name}
          value={Value}
          onChange={OnChange}
          margin={Margin}
          variant={Variant}
          disabled={Disabled}
          inputProps={{ style: { color: 'black' } }} // Necesario si <DialogBasic/> llama a este componente
        />
      </>
    );
  };

  const muiDialogActions = ({ OnClick }) => {
    return (
      <>
        <DialogActions>
          <Button variant="contained" color="error" onClick={OnClick}>
            Cancelar
          </Button>
          <Button variant="contained" color="success" type="submit">
            Añadir
          </Button>
        </DialogActions>
      </>
    );
  };

  return (
    <>
      <Background>
        {/* <br />
        <br /> */}
        <HeaderContainer>
          <HeaderTitle>
            <span>REGISTRO DE USUARIOS</span>
          </HeaderTitle>
        </HeaderContainer>
        <BodyContainer>
          <InputNames>
            {muiTextField({
              ClassName: 'input',
              Label: 'Nombres',
              Name: 'names',
              Value: basicInformation.names,
            })}
          </InputNames>
          <InputSurnames>
            {muiTextField({
              ClassName: 'input',
              Label: 'Apellidos',
              Name: 'surnames',
              Value: basicInformation.surnames,
            })}
          </InputSurnames>
          <InputCi>
            {muiTextField({
              ClassName: 'input',
              Label: 'Carnet de identidad',
              Type: 'number',
              Name: 'ci',
              Value: basicInformation.ci,
              Disabled: userProp ? true : false,
            })}
          </InputCi>
          <InputAddress>
            {muiTextField({
              ClassName: 'input',
              Label: 'Domicilio',
              Name: 'address',
              Value: basicInformation.address,
            })}
          </InputAddress>
          <InputMobile>
            {muiTextField({
              ClassName: 'input',
              Label: 'Celular',
              Type: 'number',
              Name: 'mobile',
              Value: basicInformation.mobile,
            })}
          </InputMobile>
          <InputEmail>
            {muiTextField({
              ClassName: 'input',
              Label: 'Correo',
              Type: 'email',
              Name: 'email',
              Value: basicInformation.email,
            })}
          </InputEmail>

          {/* Fecha de nacimiento: */}
          <InputDateOfBirdth>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
            >
              <DatePicker
                disableFuture
                label="Fecha de nacimiento" // F. nacimiento(dia/mes/año)
                minDate={new Date('1942-01-01')}
                maxDate={new Date()}
                openTo="year"
                views={['year', 'month', 'day']}
                value={date}
                inputFormat="dd/MM/yyyy" //IMPORTANTE formato de fecha
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                inputProps={{ style: { color: 'black' } }} // Necesario si <DialogBasic/> llama a este componente
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
          <InputBranchOffice2>
            <FormControl className="input">
              <InputLabel>Sucursal</InputLabel>
              <Select
                value={branchOffice.branchOfficeName}
                name="branchOfficeName"
                onChange={(event) => changeBranchOffice(event.target.value)}
              >
                {optionsBranchList.map((branch, index) => (
                  <MenuItem key={index} value={branch.name}>
                    {branch.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </InputBranchOffice2>

          {/* Cargos: */}
          <InputCharge>
            <Autocomplete
              value={charge}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  toggleOpenCharge(true);
                  setDialogValueCharge({
                    ...defaultDataCharge,
                    chargeOfType: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  toggleOpenCharge(true);
                  setDialogValueCharge({
                    ...defaultDataCharge,
                    chargeOfType: newValue.inputValue.toLowerCase(),
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
              sx={{ input: { color: '#000000' } }} // Necesario si <DialogBasic/> llama a este componente
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

                  {/* Creando TextFields: */}
                  {muiTextField({
                    Label: 'Cargo',
                    Name: 'chargeOfType',
                    Value: dialogValueCharge.chargeOfType,
                    OnChange: (event) =>
                      setDialogValueCharge({
                        ...dialogValueCharge,
                        [event.target.name]: event.target.value.toLowerCase(),
                      }),
                    Margin: 'dense',
                    Variant: 'standard',
                  })}
                </DialogContent>

                {/* Crear botones de Dialog: */}
                {muiDialogActions({ OnClick: handleCloseCharge })}
              </form>
            </Dialog>
          </InputCharge>

          {/* Estado: */}
          <InputStatus>
            <Autocomplete
              value={status}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  toggleOpenStatus(true);
                  setDialogValueStatus({
                    ...defaultDataStatus,
                    statusType: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  toggleOpenStatus(true);
                  setDialogValueStatus({
                    ...defaultDataStatus,
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
              sx={{ input: { color: '#000000' } }} // Necesario si <DialogBasic/> llama a este componente
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

                  {/* Creando TextFields: */}
                  {muiTextField({
                    Label: 'Estado',
                    Name: 'statusType',
                    Value: dialogValueStatus.statusType,
                    OnChange: (event) =>
                      setDialogValueStatus({
                        ...dialogValueStatus,
                        [event.target.name]: event.target.value.toLowerCase(),
                      }),
                    Margin: 'dense',
                    Variant: 'standard',
                  })}
                </DialogContent>

                {/* Crear botones de Dialog: */}
                {muiDialogActions({ OnClick: handleCloseStatus })}
              </form>
            </Dialog>
          </InputStatus>

          {/*Boton y alerta registrar:  BtnToRegistrer CAMBIAR POR "DialogBasic" */}

          {/* <BtnToRegistrer>
            <Button
              color="success"
              onClick={handleClickOpenDialog}
              disabled={false}
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Registrar
            </Button>
            <Dialog open={openAlertDialog} onClose={componentDefaultData}>
              <DialogTitle>{`REGISTRO DE USUSARIOS`}</DialogTitle>
              <DialogContent>
                <DialogContentText>
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
                    componentDefaultData();
                  }}
                  // autoFocus
                >
                  Si
                </Button>
              </DialogActions>
            </Dialog>
          </BtnToRegistrer> */}

          <BtnRegistrer>
            <PlainModalButton
              primaryBtnText="registrar"
              dialogTitle="REGISTRO DE USUSARIOS"
              dialogText={`Esta seguro de registrar a ${basicInformation.names} ${basicInformation.surnames} ?`}
              closeBtnText="atras"
              continueBtnText="si"
              functionToExecute={saveUser}
              functionParameters={{
                basicInformation,
                formattedDate,
                sex,
                branchOffice,
                charge,
                status,
              }}
              thirdFunctionToExecute={componentDefaultData}
            />
          </BtnRegistrer>
        </BodyContainer>
      </Background>
    </>
  );
};

export { UserRegistration };
