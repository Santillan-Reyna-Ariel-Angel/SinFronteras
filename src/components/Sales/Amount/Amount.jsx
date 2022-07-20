import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Checkbox, FormControlLabel } from '@mui/material';
//StylesComponents:
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
} from './AmountStyles';

const Amount = ({ passengersDataTable }) => {
  let prices = passengersDataTable.map((passanger) => passanger.price);

  //Sumar precios
  let initialValue = 0;
  let priceTotal = prices.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );
  console.log('priceTotal:', priceTotal);

  //amountData default:
  const [amountData, setAmountData] = useState({
    subtotal: priceTotal,
    discountCheckbox: false,
    discount: '',
    description: '',
    amountTotal: priceTotal,
  });
  console.log('amountData: ', amountData);

  const updateAmountTotal = (discount) => {
    // let updateAmountTotal = amountData.subtotal - amountData.discount; //ERROR DE CALCULO, PROBABLEMENTE amountData.discount NO SE ACTUALIZA A TIEMPO
    let updateAmountTotal = amountData.subtotal - discount;
    setAmountData((prevState) => ({
      ...prevState,
      amountTotal: updateAmountTotal.toFixed(2),
    }));

    return amountData.amountTotal;
  };

  return (
    <>
      <Background>
        <HeaderContainer>
          <HeaderTitle>
            <span>Importe</span>
          </HeaderTitle>
        </HeaderContainer>
        <BodyContainer>
          <TextSubtotal>SubTotal (Bs): </TextSubtotal>
          <Subtotal>{amountData.subtotal}</Subtotal>

          <DiscountCheckbox>
            <FormControlLabel
              className="check"
              control={
                <Checkbox
                  // sx={{ color: '#051E34' }}
                  checked={amountData.discountCheckbox}
                  onChange={(event) => [
                    setAmountData((prevState) => ({
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
            />
          </DiscountCheckbox>

          {amountData.discountCheckbox ? (
            <>
              <InputDiscount>
                <TextField
                  className="input"
                  placeholder="Cantidad..."
                  type="number"
                  variant="outlined"
                  label="Descuento (Bs): "
                  name="discount"
                  value={amountData.discount}
                  onChange={(event) => [
                    setAmountData((prevState) => ({
                      ...prevState,
                      [event.target.name]:
                        event.target.value === ''
                          ? ''
                          : parseFloat(event.target.value), // Number()
                    })),
                    updateAmountTotal(event.target.value),
                  ]}
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
                  value={amountData.description}
                  onChange={(event) =>
                    setAmountData((prevState) => ({
                      ...prevState,
                      [event.target.name]: event.target.value,
                    }))
                  }
                />
              </DiscountDescription>
            </>
          ) : null}

          <TextAmountTotal>Importe Total (Bs): </TextAmountTotal>
          <AmountTotal>
            {(amountData.subtotal - amountData.discount).toFixed(2)}
          </AmountTotal>
        </BodyContainer>
      </Background>
    </>
  );
};

export { Amount };
