import React, { useState } from 'react';
//MUI:
import TextField from '@mui/material/TextField';
import { Checkbox, FormControlLabel } from '@mui/material';
//Styles:
import {
  Background,
  HeaderContainer,
  HeaderTitle,
  BodyContainer,
  TextSubtotal,
  Subtotal,
  DiscountCheckbox,
  InputDiscount,
  DiscountDescription,
  TextAmountTotal,
  AmountTotal,
} from './SalesAmountDataStyles';
//Others:
import { Css_TextField_Select } from './../../constantData.js';

export let salesAmountData, setSalesAmountData;

const SalesAmountData = ({ passengersDataTable }) => {
  let prices = passengersDataTable.map((passanger) => passanger.seatPrice);

  //Sumar precios:
  let initialValue = 0;
  let priceTotal = prices.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );
  // console.log('priceTotal:', priceTotal);

  //salesAmountData default:
  [salesAmountData, setSalesAmountData] = useState({
    subtotal: priceTotal,
    discountCheckbox: false,
    discount: '',
    description: '',
    amountTotal: priceTotal,
  });
  // console.log('salesAmountData: ', salesAmountData);

  const updateAmountTotal = (discount) => {
    // let updateAmountTotal = salesAmountData.subtotal - salesAmountData.discount; //ERROR DE CALCULO, PROBABLEMENTE salesAmountData.discount NO SE ACTUALIZA A TIEMPO
    let updateAmountTotal = salesAmountData.subtotal - discount;
    setSalesAmountData((prevState) => ({
      ...prevState,
      amountTotal: updateAmountTotal.toFixed(2),
    }));

    return salesAmountData.amountTotal;
  };

  return (
    <>
      <Background>
        <HeaderContainer>
          <HeaderTitle>
            <span>IMPORTE</span>
          </HeaderTitle>
        </HeaderContainer>
        <BodyContainer>
          <TextSubtotal>SubTotal (Bs): </TextSubtotal>
          <Subtotal>{salesAmountData.subtotal}</Subtotal>

          <DiscountCheckbox>
            <FormControlLabel
              className="check"
              control={
                <Checkbox
                  sx={{
                    color: '#051E34',
                    marginLeft: '-10px',
                  }}
                  checked={salesAmountData.discountCheckbox}
                  onChange={(event) => [
                    setSalesAmountData((prevState) => ({
                      ...prevState,
                      discountCheckbox: !prevState.discountCheckbox,
                      discount: '',
                      description: '',
                    })),
                    updateAmountTotal(0),
                  ]}
                />
              }
              label="Descuento (Bs): "
              labelPlacement="start" //end, start
              sx={{
                '.MuiTypography-root': {
                  fontFamily: 'Times New Roman',
                  fontSize: 'large',
                },
              }}
            />
          </DiscountCheckbox>

          {salesAmountData.discountCheckbox ? (
            <>
              <InputDiscount>
                <TextField
                  className="input"
                  placeholder="Cantidad..."
                  type="number"
                  variant="outlined"
                  label="Descuento (Bs): "
                  name="discount"
                  value={salesAmountData.discount}
                  onChange={(event) => [
                    setSalesAmountData((prevState) => ({
                      ...prevState,
                      [event.target.name]:
                        event.target.value === ''
                          ? ''
                          : parseFloat(event.target.value), // or Number()
                    })),
                    updateAmountTotal(event.target.value),
                  ]}
                  size="small"
                  sx={{
                    '.MuiInputBase-root': {
                      // fontSize: Css_TextField_Select.fontSize,
                      fontWeight: 'bold', // Css_TextField_Select.fontWeighScreenUpperW_768,
                      color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                      backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                    },
                  }}
                />
              </InputDiscount>

              <DiscountDescription>
                <TextField
                  placeholder="Motivo del descuento..."
                  multiline
                  maxRows={4}
                  className="input"
                  type="text"
                  variant="outlined"
                  label="Descripcion: "
                  name="description"
                  value={salesAmountData.description}
                  onChange={(event) =>
                    setSalesAmountData((prevState) => ({
                      ...prevState,
                      [event.target.name]: event.target.value,
                    }))
                  }
                  size="small"
                  sx={{
                    '.MuiInputBase-root': {
                      fontSize: Css_TextField_Select.fontSize,
                      // fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768, // o 500
                      color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                      backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                    },
                  }}
                />
              </DiscountDescription>
            </>
          ) : null}

          <TextAmountTotal>Importe Total (Bs): </TextAmountTotal>
          <AmountTotal>
            {(salesAmountData.subtotal - salesAmountData.discount).toFixed(2)}
          </AmountTotal>
        </BodyContainer>
      </Background>
    </>
  );
};

export { SalesAmountData };
