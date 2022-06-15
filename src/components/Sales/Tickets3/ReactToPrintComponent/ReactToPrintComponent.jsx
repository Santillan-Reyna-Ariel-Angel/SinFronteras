import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

import { Tickets3 } from '../Tickets3.jsx';
//Css
import Button from '@mui/material/Button';

const ReactToPrintComponent = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        documentTitle="Sin Fronteras - Boletos de Viaje"
        trigger={() => (
          <Button variant="contained" color="success">
            Mostar Component
          </Button>
        )}
        content={() => componentRef.current}
      />

      <Tickets3 ref={componentRef} />
    </div>
  );
};

export { ReactToPrintComponent };
