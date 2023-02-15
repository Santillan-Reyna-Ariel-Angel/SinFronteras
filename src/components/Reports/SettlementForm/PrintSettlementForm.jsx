import React, { useRef } from 'react';
// MUI:
import Button from '@mui/material/Button';
//Styles:
//Contexts:
//Firebase Functions:
//States:
//Components:
import { SettlementForm } from './SettlementForm';
//Others:
import { useReactToPrint } from 'react-to-print';
import { handleClose } from './../../DialogBasic/DialogBasic';

export const PrintSettlementForm = ({
  settlementFormData,
  //   documentTitle = 'Planilla de Liquidacion',
}) => {
  let { formCode } = settlementFormData;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Sin Fronteras - Planilla de Liquidacion - ${formCode}`, //${documentTitle}
  });

  return (
    <>
      <SettlementForm
        ref={componentRef}
        settlementFormData={settlementFormData}
      />

      <Button
        variant="contained"
        color="success"
        // onClick={() => handlePrint()}
        onClick={() => [handlePrint(), handleClose()]} //Hara que se nos cierre automaticamente el modal de <DialogBasic/> al presionar el boton
        sx={{ margin: '8px 8px 30px 8px' }}
      >
        Imprimir Pdf
      </Button>
    </>
  );
};
