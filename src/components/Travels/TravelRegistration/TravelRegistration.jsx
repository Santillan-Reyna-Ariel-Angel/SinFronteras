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
// idioma del calentario:
import { es } from 'date-fns/locale';

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
import { ContextUserData } from './../../../contexts/ContextUserData';
//Firebase Functions:
import { createTripSchedule } from './../Firebase/createTripSchedule';
//States:
//Components:
import { PlainModalButton } from './../../PlainModalButton/PlainModalButton';
//Others:
import {
  isDateOutOfRange,
  getDepartmentList,
  getLocationsList,
} from './../Functions/functions';
import { DEPARTMENT_LIST } from './../../constantData';
import { dateFormat, timeFormat } from './../../globalFunctions';

const DatePicker_maxDate = new Date('2046-01-01'); // new Date('yyyy-mm-dd') - 1(dia), es la fecha que se establecera en el <DatePicker ... />

export const TravelRegistration = () => {
  //sessionStorage:
  const storedData = sessionStorage.getItem('branchOffice');
  let branchOffice_seStorage = storedData
    ? JSON.parse(storedData)
    : {
        branchInformation: {
          branchNumber: '',
          department: '',
          destinations: {},
          location: '',
        },
      };
  console.log('branchOffice_seStorage:', branchOffice_seStorage);

  //ContextBranchOffice:
  const branchOffice = useContext(ContextBranchOffice);
  const {
    branchInformation: { branchNumber, department, destinations, location },
  } = branchOffice ? branchOffice : branchOffice_seStorage;

  //ContextCompanyBuses:
  const companyBuses = useContext(ContextCompanyBuses);

  //ContextUserData
  const allUserData = useContext(ContextAllUserData);
  // console.log('allUserData', allUserData);

  //ContextUserData:
  const userData = useContext(ContextUserData);
  let { identificationNumber } = userData
    ? userData
    : { identificationNumber: '' };

  // json to array:
  let companyBusesArray = [];
  for (let i in companyBuses) companyBusesArray.push(companyBuses[i]);
  let allUserDataArray = [];
  for (let i in allUserData) allUserDataArray.push(allUserData[i]);
  let destinationsList = [];
  for (let i in destinations) destinationsList.push(destinations[i]);

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
    localityOfOrigin: location, // context o session storage garantiza este dato
    travelDate: '',
    travelStatus: 'pendiente', // pendiente, realizado, cancelado
    //extraData
    departmentOfOrigin: department, // context o session storage garantiza este dato
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

  // companyBusesArray: apartir de esta filtrar solo aquellos que sean diferentes en fecha y hora de viaje de los ya registrados.
  // esto afecta a : busEnrollmentsList y getBusData()

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

  // Choferes en Sucursal(su branchNumberOrCode === branchNumber de la sucursal actual):
  //  * IMPORTANTE: CADA VEZ QUE UN CHOFER LLEGUE A SU DESTINO DEBERA ACTUALIZAR SU branchNumberOrCode
  let listOfDrivers = allUserDataArray.filter(
    (user) =>
      user.charge === 'chofer' && user.branchNumberOrCode === branchNumber
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

  const [fullNameDriver, setFullNameDriver] = useState(''); //undefined trae warnings
  // console.log('fullNameDriver', fullNameDriver);

  //travelStatus:
  // const travelStatusList = ['cancelado', 'pendiente', 'realizado'];

  //getDepartmentList:
  let destinationDepartmentList = getDepartmentList({
    destinationsList: destinationsList,
  });
  console.log('destinationDepartmentList: ', destinationDepartmentList);

  // getLocationsList (Estado para select destinationLocation):
  const [destinationLocationList, setDestinationLocationList] = useState([]);
  console.log('destinationLocationList: ', destinationLocationList);

  // componentDefaultData
  const componentDefaultData = () => {
    setTravelData(travelsDataDefaul);
    setDepartureTime(new Date('2022-12-16T20:30:00'));
    setTravelDate(null);
    setFullNameDriver('');
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
              {DEPARTMENT_LIST.map((department, index) => (
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
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
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
                  departureTime: timeFormat({ newTime }),
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
              onChange={(event) => [
                setTravelData({
                  ...travelData,
                  destinationLocation: '', // para evitar warnings
                  [event.target.name]: event.target.value,
                }),

                setDestinationLocationList(
                  getLocationsList({
                    department: event.target.value, //example: 'tarija' o 'santa cruz
                    destinationsList: destinationsList,
                  })
                ),
              ]}
            >
              {destinationDepartmentList.map((department, index) => (
                <MenuItem key={index} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DptDestinationStyle>

        {/* Localidad destino: */}
        <LocDestinationStyle>
          <FormControl className="input">
            <InputLabel>Localidad destino</InputLabel>
            <Select
              value={travelData.destinationLocation}
              name="destinationLocation"
              onChange={(event) =>
                setTravelData({
                  ...travelData,
                  [event.target.name]: event.target.value,
                })
              }
            >
              {destinationLocationList.map((location, index) => (
                <MenuItem key={index} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            functionParameters={{
              travelData,
              branchNumber,
              identificationNumber,
            }}
            thirdFunctionToExecute={componentDefaultData}
          />
        </Btn>
      </BodyContainer>
    </Background>
  );
};
