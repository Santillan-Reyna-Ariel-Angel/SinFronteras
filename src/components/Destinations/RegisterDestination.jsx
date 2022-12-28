import React from 'react';
// MUI:
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from '@mui/material';
//Styles:
import {
  Background,
  HeaderContainer,
  HeaderTitle,
  BodyContainer,
  DepartmentStyle,
  LocationStyle,
  AssignPricesText,
  NormalTypeOfBusCheck,
  NormalSeatType,
  NormalMinimalPrice,
  NormalMaximumPrice,
  LeitoTypeOfBusCheck,
  LeitoSeatType,
  LeitoMinimalPrice,
  LeitoMaximumPrice,
  Btn,
} from './RegisterDestinationStyles';
//Contexts:
//Firebase Functions:
//States:
//Components:
import { PlainModalButton } from './../PlainModalButton/PlainModalButton';
//Others:
const departmentsList = [
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
// const typeOfBus = ['normal', 'leito'];
const typeOfSeatsList = ['normal', 'semi-cama', 'cama'];

export const RegisterDestination = () => {
  return (
    <>
      <Background>
        <HeaderContainer>
          <HeaderTitle>
            <span>REGISTRAR DESTINOS</span>
          </HeaderTitle>
        </HeaderContainer>

        <BodyContainer>
          {/* Departamento: */}
          <DepartmentStyle>
            <FormControl className="input">
              <InputLabel>Departamento</InputLabel>
              <Select
                value={''} //travelData.departmentOfOrigin
                name="department"
                // onChange={(event) =>
                //   setTravelData({
                //     ...travelData,
                //     [event.target.name]: event.target.value,
                //   })
                // }
              >
                {departmentsList.map((department, index) => (
                  <MenuItem key={index} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DepartmentStyle>

          {/* Localidad: */}
          <LocationStyle>
            <TextField
              className="input"
              name="localityOfOrigin"
              label="Localidad"
              variant="outlined"
              value={''} //travelData.localityOfOrigin
              // disabled
              //   onChange={(event) =>
              //     setTravelData({
              //       ...travelData,
              //       [event.target.name]: event.target.value,
              //     })
              //   }
            />
          </LocationStyle>

          {/* Asignar precios: */}
          <AssignPricesText>
            <span>Asignar Precios</span>
          </AssignPricesText>

          {/* Normal Check: */}
          <NormalTypeOfBusCheck>
            <FormControl>
              <FormGroup row={true}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={false} //busData.services.bathroom
                      //   onChange={changeServiceStatus}
                      name="NormalTypeOfBusCheck"
                    />
                  }
                  label="Bus Normal"
                />
              </FormGroup>
            </FormControl>
          </NormalTypeOfBusCheck>

          {/* Type de Asiento */}
          <NormalSeatType>
            <FormControl className="input">
              <InputLabel>T. Asiento</InputLabel>
              <Select
                value={''} //travelData.departmentOfOrigin
                name="NormalSeatType"
                // onChange={(event) =>
                //   setTravelData({
                //     ...travelData,
                //     [event.target.name]: event.target.value,
                //   })
                // }
              >
                {typeOfSeatsList.map((typeOfSeat, index) => (
                  <MenuItem key={index} value={typeOfSeat}>
                    {typeOfSeat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </NormalSeatType>

          {/* Precio Minimo */}
          <NormalMinimalPrice>
            <TextField
              name="normalMinimalPrice"
              label="Precio minimo"
              variant="outlined"
              value={0} //branchData.destinations[llave].prices.normal.minimalPrice
              type="number"
              onChange={(event) => {}}
            />
          </NormalMinimalPrice>

          {/* Precio Maximo */}
          <NormalMaximumPrice>
            <TextField
              name="normalMaximumPrice"
              label="Precio maximo"
              variant="outlined"
              value={0} //branchData.destinations[llave].prices.normal.maximumPrice
              type="number"
              //   onChange={(event) => {}}
            />
          </NormalMaximumPrice>

          {/* Leito Check: */}
          <LeitoTypeOfBusCheck>
            <FormControl>
              <FormGroup row={true}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={false} //busData.services.bathroom
                      //   onChange={changeServiceStatus}
                      name="LeitoTypeOfBusCheck"
                    />
                  }
                  label="Bus Leito"
                />
              </FormGroup>
            </FormControl>
          </LeitoTypeOfBusCheck>

          {/* Leito SeatType: */}
          <LeitoSeatType>
            <FormControl className="input">
              <InputLabel>T. Asiento</InputLabel>
              <Select
                value={''} //travelData.departmentOfOrigin
                name="LeitoSeatType"
                // onChange={(event) =>
                //   setTravelData({
                //     ...travelData,
                //     [event.target.name]: event.target.value,
                //   })
                // }
              >
                {typeOfSeatsList.map((typeOfSeat, index) => (
                  <MenuItem key={index} value={typeOfSeat}>
                    {typeOfSeat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </LeitoSeatType>

          {/* Leito Minimal Price: */}
          <LeitoMinimalPrice>
            <TextField
              name="LeitoMinimalPrice"
              label="Precio minimo"
              variant="outlined"
              value={0} //branchData.destinations[llave].prices.normal.minimalPrice
              type="number"
              onChange={(event) => {}}
            />
          </LeitoMinimalPrice>

          {/* Leito Maximum Price: */}
          <LeitoMaximumPrice>
            <TextField
              name="LeitoMaximumPrice"
              label="Precio maximo"
              variant="outlined"
              value={0} //branchData.destinations[llave].prices.normal.maximumPrice
              type="number"
              //   onChange={(event) => {}}
            />
          </LeitoMaximumPrice>

          {/* Boton */}
          <Btn>
            <PlainModalButton
              primaryBtnText="Registrar"
              dialogTitle="Registrar Destinos"
              dialogText="Esta seguro de registrar este destino?"
              closeBtnText="cancelar"
              continueBtnText="si"
              //   functionToExecute={createBus}
              //   functionParameters={busData}
              //   thirdFunctionToExecute={componentDefaultData}
            />
          </Btn>
        </BodyContainer>
      </Background>
    </>
  );
};
