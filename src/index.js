//React 18:
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client'; //import ReactDOM from 'react-dom';
//Archivo de rutas
import AppRoutes from './AppRoutes';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Suspense fallback={'Cargando datos...'}>
    <AppRoutes />
  </Suspense>
);
