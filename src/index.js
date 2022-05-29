import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
//Archivo de rutas
import AppRoutes from './AppRoutes';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={'Cargando datos...'}>
      <AppRoutes />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
