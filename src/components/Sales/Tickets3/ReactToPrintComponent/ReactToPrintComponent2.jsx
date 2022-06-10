import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import { Tickets3 } from './../Tickets3.jsx';
//MUI:
import Button from '@mui/material/Button';

const ReactToPrintComponent2 = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Sin Fronteras - Boletos de Viaje',
  });

  return (
    <div>
      <Tickets3 ref={componentRef} />

      <Button variant="contained" color="success" onClick={() => handlePrint()}>
        Ver Pdf Component2
      </Button>
    </div>
  );
};
export { ReactToPrintComponent2 };
