// "Create, Read, Update, Delete" (Crear, Leer, Actualizar, Eliminar).

// const permissionsAux = {
//   dueño: {
//     venderPasajes: true,
//     registrarUsuarios: true,
//     listarUsuarios: true,
//     editarInfoUsuarios: true,
//     eliminarUsuarios: true,
//     registrarBuses: true,
//     listarBuses: true,
//     editarInfoBuses: true,
//     eliminarBuses: true,
//     registrarDestinos: true,
//     programarViaje: true,
//     listarVentas: true,
//     verTicket: true,
//     imprimirTicket: true,
//     listarViajes: true,
//     registrarEgresos: true,
//     verEgresos: true,
//     actualizarEgresos: true,
//     verPlanillaLiquidacion: true,
//     imprimirPlanillaLiquidacion: true,
//     registrarSucursales: true,
//   },
//   'adm-general': {
//     venderPasajes: true,
//     registrarUsuarios: true,
//     listarUsuarios: true,
//     editarInfoUsuarios: true,
//     eliminarUsuarios: true,
//     registrarBuses: true,
//     listarBuses: true,
//     editarInfoBuses: true,
//     eliminarBuses: true,
//     registrarDestinos: true,
//     programarViaje: true,
//     listarVentas: true,
//     verTicket: true,
//     imprimirTicket: true,
//     listarViajes: true,
//     registrarEgresos: true,
//     verEgresos: true,
//     actualizarEgresos: true,
//     verPlanillaLiquidacion: true,
//     imprimirPlanillaLiquidacion: true,
//     registrarSucursales: true,
//   },
//   'adm-sucursal': {
//     venderPasajes: true,
//     registrarUsuarios: true,
//     listarUsuarios: true,
//     editarInfoUsuarios: true,
//     eliminarUsuarios: true,
//     registrarBuses: true,
//     listarBuses: true,
//     editarInfoBuses: true,
//     eliminarBuses: true,
//     registrarDestinos: true,
//     programarViaje: true,
//     listarVentas: true,
//     verTicket: true,
//     imprimirTicket: true,
//     listarViajes: true,
//     registrarEgresos: true,
//     verEgresos: true,
//     actualizarEgresos: true,
//     verPlanillaLiquidacion: true,
//     imprimirPlanillaLiquidacion: true,
//     registrarSucursales: true,
//   },
//   secretaria: {
//     venderPasajes: true,
//     registrarUsuarios: false,
//     listarUsuarios: true,
//     editarInfoUsuarios: false,
//     eliminarUsuarios: false,
//     registrarBuses: false,
//     listarBuses: false,
//     editarInfoBuses: false,
//     eliminarBuses: false,
//     registrarDestinos: false,
//     programarViaje: false,
//     listarVentas: true,
//     verTicket: true,
//     imprimirTicket: true,
//     listarViajes: true,
//     registrarEgresos: false,
//     verEgresos: true,
//     actualizarEgresos: false,
//     verPlanillaLiquidacion: true,
//     imprimirPlanillaLiquidacion: true,
//     registrarSucursales: false,
//   },
// };
// console.log('resp: ', permissionsAux.dueño.venderPasajes);

const permissions = {
  pasajes: {
    crear: true,
    leer: true,
    // btnTicket: true, // Es igual a leer
    imprimir: true,
  },
  usuarios: {
    crear: true,
    leer: true,
    actualizar: true,
    eliminar: true,
  },
  buses: {
    crear: true,
    leer: true,
    actualizar: true,
    eliminar: true,
  },
  destinos: {
    crear: true,
  },
  viajes: {
    crear: true, // => programar viaje
    leer: true,
  },
  egresos: {
    crear: true, // Se crea automaticamente al crear un viaje, esto pude ser innecesario
    leer: true,
    actualizar: true, // Es el boton "REGISTRAR EGRESO DEL VAIJE" esta ligado a "leer"
  },
  planillaLiquidacion: {
    leer: true, // Es el Btn "Planilla Liquidacion" habilitado
    imprimir: true,
  },
  sucursales: {
    crear: true,
  },
};

export const rolesAndPermissions = {
  dueño: {
    ...permissions,
  },
  'adm-general': {
    ...permissions,
  },
  'adm-sucursal': {
    pasajes: {
      ...permissions.pasajes,
    },
    usuarios: {
      ...permissions.usuarios,
    },
    buses: {
      crear: true,
      leer: true, // solo puede ver los buses de su sucursal y disponibles
      actualizar: true, // solo los buses disponibles.
      eliminar: false, // no puede eliminar ningun bus
    },
    viajes: {
      crear: true, // => programar viaje
      leer: true,
    },
  },
  'secretaria(o)': {
    pasajes: {
      crear: true,
      leer: true,
      // btnTicket: true, // Es igual a leer
      imprimir: true,
    },
    usuarios: {
      crear: false,
      leer: true,
      actualizar: false,
      eliminar: false,
    },
    buses: {
      crear: false,
      leer: true, // solo puede ver los buses de su sucursal y disponibles
      actualizar: false, // no puede actualizar ningun bus (ocultar BtnEdit)
      eliminar: false, // no puede eliminar ningun bus (ocultar BtnDelete)
    },
    viajes: {
      crear: true, // => programar viaje
      leer: true,
    },
  },
  'boletero(a)': {
    pasajes: {
      crear: true,
      leer: true,
      // btnTicket: true, // Es igual a leer
      imprimir: true,
    },
  },
  chofer: {
    pasajes: {
      crear: false,
      leer: true,
      // btnTicket: true, // Es igual a leer
      imprimir: false,
    },
    planillaLiquidacion: {
      leer: false, // Es el Btn "Planilla Liquidacion"
      imprimir: false,
    },
  },
};

console.log(
  'resp: ',
  rolesAndPermissions['adm-general'].planillaLiquidacion.imprimir
);
