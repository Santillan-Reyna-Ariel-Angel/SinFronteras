import React, { useState, useContext } from 'react';
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
import { useMediaQuery } from '@mui/material';

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
import { ContextBranchOffice } from './../../contexts/ContextBranchOffice';
//Firebase Functions:
import { createDestination } from './Firebase/createDestination';
//States:
//Components:
import { PlainModalButton } from './../PlainModalButton/PlainModalButton';
//Others:
import { uuid } from './functions';
import { Css_TextField_Select } from './../constantData';

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
//Crear 1 lista independiente de asientos para cada tipo de bus, esto pra evitar error en BD:
const typeOfSeatsList_busNormal = ['semi-cama'];
const typeOfSeatsList_busLeito = ['cama'];

let llave = uuid(); // IMPORTANTE: Es necesario que la funcion uuid este fuera del componente, esto para que se cre una sola id por mas actualizaciones(renderizados del componente) tenga los estado.

export const RegisterDestination = () => {
  const isScreenMaxW_768 = useMediaQuery('(max-width:768px)'); // useMediaQuery para verificar si la pantalla es de 768px o menos
  // console.log('isScreenMaxW_768', isScreenMaxW_768);

  console.log('llave', llave);

  //ContextBranchOffice:
  const branchOffice = useContext(ContextBranchOffice);
  // console.log('branchOffice', branchOffice);

  const {
    branchInformation: { branchNumber },
  } = branchOffice
    ? branchOffice
    : { branchInformation: { branchNumber: 'codeX' } };
  // console.log('branchNumber: ', branchNumber);

  const defaultDestinationData = {
    destinations: {
      [llave]: {
        destinationDepartment: '',
        destinationLocation: '',
        prices: {
          leito: {
            maximumPrice: 0,
            minimalPrice: 0,
            seatType: '',
            typeOfBus: 'leito',
          },
          normal: {
            maximumPrice: 0,
            minimalPrice: 0,
            seatType: '',
            typeOfBus: 'normal',
          },
        },
      },
    },
  };

  const [destinationData, setDestinationData] = useState(
    defaultDestinationData
  );
  console.log('destinationData: ', destinationData);

  const [checks, setChecks] = useState({
    normalChek: false,
    leitoCheck: false,
  });

  const defaultPricesData = (typeOfBus) => {
    setDestinationData({
      ...destinationData,
      destinations: {
        ...destinationData.destinations,
        [llave]: {
          ...destinationData.destinations[llave],
          prices: {
            ...destinationData.destinations[llave].prices,
            [typeOfBus]: {
              maximumPrice: 0,
              minimalPrice: 0,
              seatType: '',
              typeOfBus: typeOfBus,
            },
          },
        },
      },
    });
  };

  const componentDefaultData = () => {
    setDestinationData(defaultDestinationData);
    setChecks({
      normalChek: false,
      leitoCheck: false,
    });
    //IMPORTANTE: NECESARIO recargar la pagina para que "let llave = uuid();" se ejecute de nuevo y entregue un nuevo valor:
    window.location.assign('/viajes/registrar-destinos'); //añade la nueva URL a la historia del navegador y la redirecciona cargando la pagina.
  };
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
                value={
                  destinationData.destinations[llave].destinationDepartment
                }
                name="destinationDepartment"
                onChange={(event) =>
                  setDestinationData({
                    ...destinationData,
                    destinations: {
                      ...destinationData.destinations,
                      [llave]: {
                        ...destinationData.destinations[llave],
                        [event.target.name]: event.target.value,
                      },
                    },
                  })
                }
                size={isScreenMaxW_768 ? 'small' : 'medium'}
                sx={{
                  '.MuiSelect-select': {
                    fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                    fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768,
                    color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                    backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                  },
                  //breakpoint:
                  [`@media screen and (max-width: 768px)`]: {
                    // For Select:
                    '.MuiSelect-select': {
                      fontSize: Css_TextField_Select.fontSize, // 14 or Css_TextField_Select.fontSize
                    },
                  },
                }}
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
              name="destinationLocation"
              label="Localidad"
              variant="outlined"
              value={destinationData.destinations[llave].destinationLocation}
              onChange={(event) =>
                setDestinationData({
                  ...destinationData,
                  destinations: {
                    ...destinationData.destinations,
                    [llave]: {
                      ...destinationData.destinations[llave],
                      [event.target.name]: event.target.value,
                    },
                  },
                })
              }
              size={isScreenMaxW_768 ? 'small' : 'medium'}
              sx={{
                '.MuiInputBase-root': {
                  fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                  fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768,
                  color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                  backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                },
                //breakpoint:
                [`@media screen and (max-width: 768px)`]: {
                  // For TextField:
                  '.MuiInputBase-root': {
                    fontSize: Css_TextField_Select.fontSize, // 14 or Css_TextField_Select.fontSize
                  },
                },
              }}
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
                      name="normalChek"
                      checked={checks.normalChek}
                      onChange={(event) => [
                        setChecks({
                          ...checks,
                          [event.target.name]: !checks.normalChek,
                        }),
                        defaultPricesData('normal'),
                      ]}
                      size="small"
                    />
                  }
                  label="Bus Normal"
                />
              </FormGroup>
            </FormControl>
          </NormalTypeOfBusCheck>

          {checks.normalChek && (
            <>
              {/* Type de Asiento: */}
              <NormalSeatType>
                <FormControl className="input">
                  <InputLabel>Tipo Asiento</InputLabel>
                  <Select
                    value={
                      destinationData.destinations[llave].prices.normal.seatType
                    }
                    name="seatType"
                    onChange={(event) =>
                      setDestinationData({
                        ...destinationData,
                        destinations: {
                          ...destinationData.destinations,
                          [llave]: {
                            ...destinationData.destinations[llave],
                            prices: {
                              ...destinationData.destinations[llave].prices,
                              normal: {
                                ...destinationData.destinations[llave].prices
                                  .normal,
                                [event.target.name]: event.target.value, //talves seria colocar seatType:[event.target.value]
                              },
                            },
                          },
                        },
                      })
                    }
                    size={isScreenMaxW_768 ? 'small' : 'medium'}
                    sx={{
                      '.MuiSelect-select': {
                        fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                        fontWeight:
                          Css_TextField_Select.fontWeighScreenUpperW_768,
                        color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                        backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                      },
                      //breakpoint:
                      [`@media screen and (max-width: 768px)`]: {
                        // For Select:
                        '.MuiSelect-select': {
                          fontSize: Css_TextField_Select.fontSize, // 14 or Css_TextField_Select.fontSize
                        },
                      },
                    }}
                  >
                    {typeOfSeatsList.map((typeOfSeat, index) => (
                      //typeOfSeatsList_busNormal.map()
                      <MenuItem key={index} value={typeOfSeat}>
                        {typeOfSeat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </NormalSeatType>

              {/* Precio Minimo: */}
              <NormalMinimalPrice>
                <TextField
                  name="minimalPrice"
                  label="Precio minimo"
                  variant="outlined"
                  value={
                    destinationData.destinations[llave].prices.normal
                      .minimalPrice
                  }
                  type="number"
                  helperText={'Decimales con ","'}
                  onChange={(event) =>
                    setDestinationData({
                      ...destinationData,
                      destinations: {
                        ...destinationData.destinations,
                        [llave]: {
                          ...destinationData.destinations[llave],
                          prices: {
                            ...destinationData.destinations[llave].prices,
                            normal: {
                              ...destinationData.destinations[llave].prices
                                .normal,
                              [event.target.name]:
                                event.target.value === '' ||
                                isNaN(event.target.value)
                                  ? 0
                                  : parseFloat(event.target.value), //talves seria colocar seatType:[event.target.value]
                            },
                          },
                        },
                      },
                    })
                  }
                  size={isScreenMaxW_768 ? 'small' : 'medium'}
                  sx={{
                    '.MuiInputBase-root': {
                      fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                      fontWeight:
                        Css_TextField_Select.fontWeighScreenUpperW_768,
                      color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                      backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                    },
                    //breakpoint:
                    [`@media screen and (max-width: 768px)`]: {
                      // For TextField:
                      '.MuiInputBase-root': {
                        fontSize: Css_TextField_Select.fontSize, // 14 or Css_TextField_Select.fontSize
                      },
                    },
                  }}
                />
              </NormalMinimalPrice>

              {/* Precio Maximo: */}
              <NormalMaximumPrice>
                <TextField
                  name="maximumPrice"
                  label="Precio maximo"
                  variant="outlined"
                  value={
                    destinationData.destinations[llave].prices.normal
                      .maximumPrice
                  }
                  type="number"
                  helperText={'Ej: 90 o 90,00'}
                  onChange={(event) =>
                    setDestinationData({
                      ...destinationData,
                      destinations: {
                        ...destinationData.destinations,
                        [llave]: {
                          ...destinationData.destinations[llave],
                          prices: {
                            ...destinationData.destinations[llave].prices,
                            normal: {
                              ...destinationData.destinations[llave].prices
                                .normal,
                              [event.target.name]:
                                event.target.value === '' ||
                                isNaN(event.target.value)
                                  ? 0
                                  : parseFloat(event.target.value), //talves seria colocar seatType:[event.target.value]
                            },
                          },
                        },
                      },
                    })
                  }
                  size={isScreenMaxW_768 ? 'small' : 'medium'}
                  sx={{
                    '.MuiInputBase-root': {
                      fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                      fontWeight:
                        Css_TextField_Select.fontWeighScreenUpperW_768,
                      color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                      backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                    },
                    //breakpoint:
                    [`@media screen and (max-width: 768px)`]: {
                      // For TextField:
                      '.MuiInputBase-root': {
                        fontSize: Css_TextField_Select.fontSize, // 14 or Css_TextField_Select.fontSize
                      },
                    },
                  }}
                />
              </NormalMaximumPrice>
            </>
          )}

          {/* Leito Check: */}
          <LeitoTypeOfBusCheck>
            <FormControl>
              <FormGroup row={true}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="leitoCheck"
                      checked={checks.leitoCheck}
                      onChange={(event) => [
                        setChecks({
                          ...checks,
                          [event.target.name]: !checks.leitoCheck,
                        }),
                        defaultPricesData('leito'),
                      ]}
                      size="small"
                    />
                  }
                  label="Bus Leito"
                />
              </FormGroup>
            </FormControl>
          </LeitoTypeOfBusCheck>

          {checks.leitoCheck && (
            <>
              {/* Leito SeatType: */}
              <LeitoSeatType>
                <FormControl className="input">
                  <InputLabel>Tipo Asiento</InputLabel>
                  <Select
                    value={
                      destinationData.destinations[llave].prices.leito.seatType
                    }
                    name="seatType"
                    onChange={(event) =>
                      setDestinationData({
                        ...destinationData,
                        destinations: {
                          ...destinationData.destinations,
                          [llave]: {
                            ...destinationData.destinations[llave],
                            prices: {
                              ...destinationData.destinations[llave].prices,
                              leito: {
                                ...destinationData.destinations[llave].prices
                                  .leito,
                                [event.target.name]: event.target.value, //talves seria colocar seatType:[event.target.value]
                              },
                            },
                          },
                        },
                      })
                    }
                    size={isScreenMaxW_768 ? 'small' : 'medium'}
                    sx={{
                      '.MuiSelect-select': {
                        fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                        fontWeight:
                          Css_TextField_Select.fontWeighScreenUpperW_768,
                        color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                        backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                      },
                      //breakpoint:
                      [`@media screen and (max-width: 768px)`]: {
                        // For Select:
                        '.MuiSelect-select': {
                          fontSize: Css_TextField_Select.fontSize, // 14 or Css_TextField_Select.fontSize
                        },
                      },
                    }}
                  >
                    {typeOfSeatsList.map((typeOfSeat, index) => (
                      //typeOfSeatsList_busLeito.map()
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
                  name="minimalPrice"
                  label="Precio minimo"
                  variant="outlined"
                  value={
                    destinationData.destinations[llave].prices.leito
                      .minimalPrice
                  }
                  type="number"
                  helperText={'Decimales con ","'}
                  onChange={(event) =>
                    setDestinationData({
                      ...destinationData,
                      destinations: {
                        ...destinationData.destinations,
                        [llave]: {
                          ...destinationData.destinations[llave],
                          prices: {
                            ...destinationData.destinations[llave].prices,
                            leito: {
                              ...destinationData.destinations[llave].prices
                                .leito,
                              [event.target.name]:
                                event.target.value === '' ||
                                isNaN(event.target.value)
                                  ? 0
                                  : parseFloat(event.target.value), //talves seria colocar seatType:[event.target.value]
                            },
                          },
                        },
                      },
                    })
                  }
                  size={isScreenMaxW_768 ? 'small' : 'medium'}
                  sx={{
                    '.MuiInputBase-root': {
                      fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                      fontWeight:
                        Css_TextField_Select.fontWeighScreenUpperW_768,
                      color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                      backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                    },
                    //breakpoint:
                    [`@media screen and (max-width: 768px)`]: {
                      // For TextField:
                      '.MuiInputBase-root': {
                        fontSize: Css_TextField_Select.fontSize, // 14 or Css_TextField_Select.fontSize
                      },
                    },
                  }}
                />
              </LeitoMinimalPrice>

              {/* Leito Maximum Price: */}
              <LeitoMaximumPrice>
                <TextField
                  name="maximumPrice"
                  label="Precio maximo"
                  variant="outlined"
                  value={
                    destinationData.destinations[llave].prices.leito
                      .maximumPrice
                  }
                  type="number"
                  helperText={'Ej: 90 o 90,00'}
                  onChange={(event) =>
                    setDestinationData({
                      ...destinationData,
                      destinations: {
                        ...destinationData.destinations,
                        [llave]: {
                          ...destinationData.destinations[llave],
                          prices: {
                            ...destinationData.destinations[llave].prices,
                            leito: {
                              ...destinationData.destinations[llave].prices
                                .leito,
                              [event.target.name]:
                                event.target.value === '' ||
                                isNaN(event.target.value)
                                  ? 0
                                  : parseFloat(event.target.value), //talves seria colocar seatType:[event.target.value]
                            },
                          },
                        },
                      },
                    })
                  }
                  size={isScreenMaxW_768 ? 'small' : 'medium'}
                  sx={{
                    '.MuiInputBase-root': {
                      fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                      fontWeight:
                        Css_TextField_Select.fontWeighScreenUpperW_768,
                      color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                      backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                    },
                    //breakpoint:
                    [`@media screen and (max-width: 768px)`]: {
                      // For TextField:
                      '.MuiInputBase-root': {
                        fontSize: Css_TextField_Select.fontSize, // 14 or Css_TextField_Select.fontSize
                      },
                    },
                  }}
                />
              </LeitoMaximumPrice>
            </>
          )}

          {/* Boton */}
          <Btn>
            <PlainModalButton
              primaryBtnText="Registrar"
              dialogTitle="Registrar Destinos"
              dialogText="Esta seguro de registrar este destino?"
              closeBtnText="cancelar"
              continueBtnText="si"
              functionToExecute={createDestination}
              functionParameters={{ destinationData, branchNumber, llave }}
              thirdFunctionToExecute={componentDefaultData}
            />
          </Btn>
        </BodyContainer>
      </Background>
    </>
  );
};
