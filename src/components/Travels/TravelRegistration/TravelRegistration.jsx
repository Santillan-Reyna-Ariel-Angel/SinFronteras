import React, { useState, useContext } from 'react';

//MUI:
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from '@mui/material/';
// Manejo de fechas:
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  LocalizationProvider,
  TimePicker,
  DatePicker,
} from '@mui/x-date-pickers/';

//Styles:
import {
  Background,
  HeaderContainer,
  HeaderTitle,
  BodyContainer,
  DptOriginStyle,
  LocOriginStyle,
  TravelDateStyle,
  DepartureTimeStyle,
  DptDestinationStyle,
  LocDestinationStyle,
  BusEnrollmentStyle,
  IdNumberDriverStyle,
  LaneStyle,
  Btn,
} from './TravelRegistrationStyles';
//Contexts:
import { ContextBranchOffice } from './../../../contexts/ContextBranchOffice';
import { ContextCompanyBuses } from './../../../contexts/ContextCompanyBuses';
import { ContextAllUserData } from './../../../contexts/ContextAllUserData';
//Firebase Functions:
import { createTripSchedule } from './../Firebase/createTripSchedule';
//States:
//Components:
import { PlainModalButton } from './../../PlainModalButton/PlainModalButton';
//Others:
import {
  dateFormat,
  timeFormat,
  isDateOutOfRange,
} from './../Functions/functions';

const DatePicker_maxDate = new Date('2046-01-01'); // new Date('yyyy-mm-dd') - 1(dia), es la fecha que se establecera en el <DatePicker ... />
const departments = [
  'beni',
  'chuquisaca',
  'cochabamba',
  'la paz',
  'oruro',
  'pando',
  'potosi',
  'santa cruz',
  'tarija',
];

export const TravelRegistration = () => {
  //ContextBranchOffice:
  const branchOffice = useContext(ContextBranchOffice);
  const {
    branchInformation: { branchNumber, department, location },
  } = branchOffice
    ? branchOffice
    : { branchInformation: { branchNumber: '', department: '', location: '' } };

  //ContextCompanyBuses:
  const companyBuses = useContext(ContextCompanyBuses);

  //ContextUserData
  const allUserData = useContext(ContextAllUserData);
  // console.log('allUserData', allUserData);

  // json to array:
  let companyBusesArray = [];
  for (let i in companyBuses) companyBusesArray.push(companyBuses[i]);
  let allUserDataArray = [];
  for (let i in allUserData) allUserDataArray.push(allUserData[i]);

  const travelsDataDefaul = {
    bus: {
      // enrollment: '',
      // filing: '',
      identificationNumberDriver: '',
      // numberOfFloors: 1,
      // numberOfSeats: 29,
      // services: {
      //   bathroom: true,
      //   drinks: false,
      //   tv: true,
      // },
      // status: '',
      // typeOfBus: '',
      // typeOfSeats: '',
    },
    departureTime: '20:30',
    destinationLocation: '',
    lane: '0', //CarrilDefault
    localityOfOrigin: location === undefined ? '' : location, // '',
    travelDate: '',
    travelStatus: 'pendiente', // pendiente, realizado, cancelado
    //extraData
    departmentOfOrigin: department === undefined ? '' : department,
    destinationDepartment: '',
    busEnrollment: '',
  };

  const [travelData, setTravelData] = useState(travelsDataDefaul);
  console.log('travelData', travelData);

  const [travelDate, setTravelDate] = useState(null); //new Date()

  const [departureTime, setDepartureTime] = useState(
    new Date('2022-12-16T20:30:00')
  );

  const changeDate = (inputDate) => {
    let dateOutOfRange = isDateOutOfRange({
      startDate: dateFormat({
        date: new Date(),
        format: 'yyyy/mm/dd',
      }),
      inputDate,
      endDate: dateFormat({
        date: DatePicker_maxDate,
        format: 'yyyy/mm/dd',
      }),
    });

    setTravelData({
      ...travelData,
      travelDate: dateOutOfRange
        ? ''
        : dateFormat({ date: inputDate, format: 'dd/mm/yyyy' }),
    });
  };

  let busEnrollmentsList = companyBusesArray
    .filter(
      (bus) => bus.status === 'activo' && bus.designatedBranch === branchNumber
    )
    .map((bus) => bus.enrollment);
  // console.log('busEnrollmentsList', busEnrollmentsList);

  //obtener busData:
  const getBusData = (enrollment) => {
    let busData = companyBusesArray.filter(
      (bus) => bus.enrollment === enrollment
    );
    // console.log('busData[0]: ', busData[0]);
    return busData[0];
  };

  // Choferes:
  let listOfDrivers = allUserDataArray.filter(
    (user) => user.charge === 'chofer'
  );
  let fullNamesDriversList = listOfDrivers.map(
    (user) => `${user.surnames} ${user.names}`
  );

  const getIdentificationNumberDriver = (nameDriver) => {
    let identificationNumberDriver = listOfDrivers
      .filter((driver) => `${driver.surnames} ${driver.names}` === nameDriver)
      .map((driver) => driver.identificationNumber);
    console.log('identificationNumberDriver[0]', identificationNumberDriver[0]);
    return identificationNumberDriver[0];
  };

  const [fullNameDriver, setFullNameDriver] = useState(undefined);
  // console.log('fullNameDriver', fullNameDriver);

  //travelStatus:
  // const travelStatusList = ['cancelado', 'pendiente', 'realizado'];

  // componentDefaultData
  const componentDefaultData = () => {
    setTravelData(travelsDataDefaul);
    setDepartureTime(new Date('2022-12-16T20:30:00'));
  };

  return (
    <Background>
      <HeaderContainer>
        <HeaderTitle>
          <span>PROGRAMACION DE VIAJES</span>
        </HeaderTitle>
      </HeaderContainer>

      <BodyContainer>
        {/* Departamento origen: */}
        <DptOriginStyle>
          <FormControl className="input">
            <InputLabel>Dpt. origen</InputLabel>
            <Select
              value={travelData.departmentOfOrigin}
              name="departmentOfOrigin"
              onChange={(event) =>
                setTravelData({
                  ...travelData,
                  [event.target.name]: event.target.value,
                })
              }
            >
              {departments.map((department, index) => (
                <MenuItem key={index} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DptOriginStyle>

        {/* Localidad origen: */}
        <LocOriginStyle>
          <TextField
            className="input"
            name="localityOfOrigin"
            label="Localidad origen"
            variant="outlined"
            value={travelData.localityOfOrigin}
            // disabled
            onChange={(event) =>
              setTravelData({
                ...travelData,
                [event.target.name]: event.target.value,
              })
            }
          />
        </LocOriginStyle>

        {/* Fecha viaje */}
        <TravelDateStyle>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              name="travelDate"
              label="Fecha de viaje" //(dia/mes/año)
              minDate={new Date()}
              maxDate={DatePicker_maxDate} // new Date('yyyy-mm-dd') - 1(dia), es la fecha que se establecera en el <DatePicker ... />
              inputFormat="dd/MM/yyyy" //IMPORTANTE formato de fecha
              //   onError={() => console.log('error')} //solo se ejecuta en ciertas partes al escribir la fecha
              //   onAccept={() => {}} //Funciona Solo si se usa la ventana emergente
              value={travelDate}
              onChange={(newDate) => [
                setTravelDate(newDate),
                changeDate(newDate),
              ]}
              renderInput={(params) => (
                <TextField
                  className="input"
                  {...params}
                  helperText={'Ej. 21/09/2022'} //Texto de ayuda (debajo del input)
                />
              )}
            />
          </LocalizationProvider>
        </TravelDateStyle>

        {/* Hora de viaje:  */}
        <DepartureTimeStyle>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Hora de viaje"
              value={departureTime}
              ampm={false}
              onChange={(newTime) => {
                setDepartureTime(newTime);
                setTravelData({
                  ...travelData,
                  departureTime: timeFormat(newTime),
                });
              }}
              renderInput={(params) => (
                <TextField {...params} className="input" />
              )}
            />
          </LocalizationProvider>
        </DepartureTimeStyle>

        {/* Departamento destino: */}
        <DptDestinationStyle>
          <FormControl className="input">
            <InputLabel>Dpt. destino</InputLabel>
            <Select
              value={travelData.destinationDepartment}
              name="destinationDepartment"
              onChange={(event) =>
                setTravelData({
                  ...travelData,
                  [event.target.name]: event.target.value,
                })
              }
            >
              {departments.map((department, index) => (
                <MenuItem key={index} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DptDestinationStyle>

        {/* Localidad destino: */}
        <LocDestinationStyle>
          <TextField
            className="input"
            name="destinationLocation"
            label="Localidad destino"
            variant="outlined"
            value={travelData.destinationLocation}
            // disabled
            onChange={(event) =>
              setTravelData({
                ...travelData,
                [event.target.name]: event.target.value,
              })
            }
          />
        </LocDestinationStyle>

        {/* Placa bus: */}
        <BusEnrollmentStyle>
          <FormControl className="input">
            <InputLabel>Placa del bus</InputLabel>
            <Select
              value={travelData.busEnrollment}
              name="busEnrollment"
              onChange={(event) => [
                setTravelData({
                  ...travelData,
                  [event.target.name]: event.target.value,
                  bus: getBusData(event.target.value),
                }),

                setTravelData((prevState) => ({
                  ...prevState,
                  bus: {
                    ...prevState.bus,
                    identificationNumberDriver:
                      getIdentificationNumberDriver(fullNameDriver) ===
                      undefined
                        ? ''
                        : getIdentificationNumberDriver(fullNameDriver),
                  },
                })),
              ]}
            >
              {busEnrollmentsList.map((enrollment, index) => (
                <MenuItem key={index} value={enrollment}>
                  {enrollment}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </BusEnrollmentStyle>

        {/* CI Chofer: */}
        <IdNumberDriverStyle>
          <FormControl className="input">
            <InputLabel>Designar Chofer</InputLabel>
            <Select
              value={fullNameDriver} //travelData.bus.identificationNumberDriver
              name="identificationNumberDriver"
              onChange={(event) => [
                setTravelData({
                  ...travelData,
                  bus: {
                    ...travelData.bus,
                    [event.target.name]: getIdentificationNumberDriver(
                      event.target.value
                    ),
                  },
                }),
                setFullNameDriver(event.target.value),
              ]}
            >
              {fullNamesDriversList.map((identificationNumber, index) => (
                <MenuItem key={index} value={identificationNumber}>
                  {identificationNumber}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </IdNumberDriverStyle>

        {/* Carril: */}
        <LaneStyle>
          <TextField
            className="input"
            name="lane"
            label="Carril de salida"
            variant="outlined"
            value={travelData.lane}
            // disabled
            onChange={(event) =>
              setTravelData({
                ...travelData,
                [event.target.name]: event.target.value,
              })
            }
          />
        </LaneStyle>

        {/* Estado del viaje: */}
        {/* <FormControl className="input">
          <InputLabel>Estado del viaje</InputLabel>
          <Select
            value={travelData.travelStatus}
            name="travelStatus"
            onChange={(event) =>
              setTravelData({
                ...travelData,
                [event.target.name]: event.target.value,
              })
            }
          >
            {travelStatusList.map((status, index) => (
              <MenuItem key={index} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        <Btn>
          <PlainModalButton
            primaryBtnText="Programar viaje"
            dialogTitle="Registro de viajes"
            dialogText="Esta seguro de programar este viaje?"
            closeBtnText="cancelar"
            continueBtnText="si"
            functionToExecute={createTripSchedule}
            functionParameters={{ travelData, branchNumber }}
            thirdFunctionToExecute={componentDefaultData}
          />
        </Btn>
      </BodyContainer>
    </Background>
  );
};
