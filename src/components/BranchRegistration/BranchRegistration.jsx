import React, { useState } from 'react';
//MUI:
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from '@mui/material/';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers/';

//Styles:
import {
  Background,
  HeaderContainer,
  HeaderTitle,
  BodyContainer,
  DepartmentStyle,
  LocalityStyle,
  TerminalStyle,
  AddressStyle,
  BranchNameStyle,
  BranchNumberStyle,
  AttentionScheduleText,
  OpeningTimeStyle,
  ClosingTimeStyle,
  BranchContactNumbersText,
  TelephoneStyle,
  CellphoneStyle,
  Btn,
} from './BranchRegistrationStyles';
//Contexts:
//Firebase Functions:
import { createBranch } from './Firebase/createBranch';
//States:
//Components:
import { PlainModalButton } from './../PlainModalButton/PlainModalButton';
//Others:
import { DEPARTMENT_LIST } from './../constantData';
import { timeFormat } from './../globalFunctions';

export const BranchRegistration = () => {
  const defaultBranchData = {
    department: '',
    locality: '',
    terminal: '',
    address: '',
    branchName: '',
    branchNumber: '',
    attentionSchedule: {
      openingTime: '08:00',
      closingTime: '18:30',
    },
    branchContactNumbers: {
      telephone: '',
      cellphone: '',
    },
  };

  //State General:
  const [branchData, setBranchData] = useState(defaultBranchData);
  console.log('branchData', branchData);

  const [openingTime, setOpeningTime] = useState(
    new Date('2022-12-16T08:00:00')
  );
  const [closingTime, setClosingTime] = useState(
    new Date('2022-12-16T18:30:00')
  );

  // componentDefaultData
  const componentDefaultData = () => {
    setBranchData(defaultBranchData);
    setOpeningTime(new Date('2022-12-16T08:00:00'));
    setClosingTime(new Date('2022-12-16T18:30:00'));
  };

  return (
    <>
      <Background>
        <HeaderContainer>
          <HeaderTitle>
            <span>REGISTRO DE SUCURSALES</span>
          </HeaderTitle>
        </HeaderContainer>
        <BodyContainer>
          {/* Departamento:  NOTA: DARLE WITH 100%*/}
          <DepartmentStyle>
            <FormControl className="input">
              <InputLabel>Departamento</InputLabel>
              <Select
                value={branchData.department}
                name="department"
                onChange={(event) =>
                  setBranchData({
                    ...branchData,
                    [event.target.name]: event.target.value,
                  })
                }
              >
                {DEPARTMENT_LIST.map((department, index) => (
                  <MenuItem key={index} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DepartmentStyle>

          {/* Localidad: */}
          <LocalityStyle>
            <TextField
              className="input"
              name="locality"
              label="Localidad"
              variant="outlined"
              value={branchData.locality}
              onChange={(event) =>
                setBranchData({
                  ...branchData,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </LocalityStyle>

          {/* Terminal: */}
          <TerminalStyle>
            <TextField
              className="input"
              name="terminal"
              label="Terminal"
              variant="outlined"
              value={branchData.terminal}
              onChange={(event) =>
                setBranchData({
                  ...branchData,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </TerminalStyle>

          {/* Direccion: */}
          <AddressStyle>
            <TextField
              className="input"
              name="address"
              label="Direccion"
              variant="outlined"
              value={branchData.address}
              onChange={(event) =>
                setBranchData({
                  ...branchData,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </AddressStyle>

          {/* SucursalName: */}
          <BranchNameStyle>
            <TextField
              className="input"
              name="branchName"
              label="Sucursal"
              variant="outlined"
              value={branchData.branchName}
              onChange={(event) =>
                setBranchData({
                  ...branchData,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </BranchNameStyle>

          {/* BranchCode: */}
          <BranchNumberStyle>
            <TextField
              className="input"
              name="branchNumber"
              label="Num/Cod Sucursal"
              variant="outlined"
              value={branchData.branchNumber}
              onChange={(event) =>
                setBranchData({
                  ...branchData,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </BranchNumberStyle>

          {/* Title Horarios */}
          <AttentionScheduleText>
            <span>Horarios de Atencion</span>
            <br />
            <span>Lunes a Domingo</span>
          </AttentionScheduleText>

          {/* HoraEntrada:  */}
          <OpeningTimeStyle>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Hora de Apertura"
                value={openingTime}
                ampm={false}
                onChange={(newTime) => {
                  setOpeningTime(newTime);
                  setBranchData({
                    ...branchData,
                    attentionSchedule: {
                      ...branchData.attentionSchedule,
                      openingTime: timeFormat({
                        newTime: newTime,
                        format: ':',
                      }),
                    },
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} className="input" />
                )}
              />
            </LocalizationProvider>
          </OpeningTimeStyle>

          {/* HoraSalida:  */}
          <ClosingTimeStyle>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Hora de Cierre"
                value={closingTime}
                ampm={false}
                onChange={(newTime) => {
                  setClosingTime(newTime);
                  setBranchData({
                    ...branchData,
                    attentionSchedule: {
                      ...branchData.attentionSchedule,
                      closingTime: timeFormat({
                        newTime: newTime,
                        format: ':',
                      }),
                    },
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} className="input" />
                )}
              />
            </LocalizationProvider>
          </ClosingTimeStyle>

          {/* Title Numeros Contacto */}
          <BranchContactNumbersText>
            <span>Numeros de Contacto</span>
          </BranchContactNumbersText>

          {/* Telefono */}
          <TelephoneStyle>
            <TextField
              className="input"
              name="telephone"
              label="Telefono"
              variant="outlined"
              value={branchData.branchContactNumbers.telephone}
              onChange={(event) =>
                setBranchData({
                  ...branchData,
                  branchContactNumbers: {
                    ...branchData.branchContactNumbers,
                    [event.target.name]: event.target.value,
                  },
                })
              }
            />
          </TelephoneStyle>

          {/* Celular: */}
          <CellphoneStyle>
            <TextField
              className="input"
              name="cellphone"
              label="Celular"
              variant="outlined"
              value={branchData.branchContactNumbers.cellphone}
              type="number"
              onChange={(event) =>
                setBranchData({
                  ...branchData,
                  branchContactNumbers: {
                    ...branchData.branchContactNumbers,
                    [event.target.name]: parseInt(event.target.value),
                  },
                })
              }
            />
          </CellphoneStyle>

          {/* Boton:  */}
          <Btn>
            <PlainModalButton
              primaryBtnText="Registrar"
              dialogTitle="Registro de suculsales"
              dialogText="Esta seguro de registrar esta sucursal?"
              closeBtnText="cancelar"
              continueBtnText="si"
              functionToExecute={createBranch}
              functionParameters={branchData}
              thirdFunctionToExecute={componentDefaultData}
            />
          </Btn>
        </BodyContainer>
      </Background>
    </>
  );
};
