import { ref, set } from 'firebase/database';
import { modulesFirebase } from './../../../firebase-config.js';
//funtions:
import { travelKey } from './../Functions/functions';
//Modulos Firebase:
const { fire_db } = modulesFirebase;

export const createTripSchedule = ({ travelData, branchNumber }) => {
  let { travelDate, departureTime, busEnrollment } = travelData;

  let travelKeyAux = travelKey({
    travelDate,
    departureTime,
    busEnrollment,
  });

  //data default para tripsMade:
  const travelExpenses = {
    busEnrollment: busEnrollment ? busEnrollment : '', // Necesario para que la tabla "lista de viajes" pueda mostrar la matricula del bus.
    expenses: {
      diesel: '',
      laborUnion: '',
      otherDescription: '',
      others: '',
      toll: '',
      viaticos: '',
      washed: '',
    },
    totalExpenses: 0, //Por default numerico
    tripMadeKey: travelKeyAux, //travel_10-12-2022_20-30_bus-001
  };
  const travelIncome = {
    incomeTickets: [
      // {
      //   numTickets: 1,
      //   priceTicket: '55',
      //   totalPrice: 55,
      // },
    ],
    totalAmountDiscounts: 0,
    totalAmountIncome: 0,
    totalAmountTickets: 0,
  };

  //Enviar Datos a BD:
  set(ref(fire_db, `branchOffices/${branchNumber}/travels/${travelKeyAux}/`), {
    ...travelData, // se hace una copia de todos los datos
    // numberOfSeats: travelData.bus.numberOfSeats, // Posteriormente considerar asietos de 1er y 2do piso
  });

  //Crear viaje en tripsMade, para poder buscar viaje y selecionar sus asientos:
  set(ref(fire_db, `tripsMade/branch_${branchNumber}/${travelKeyAux}/`), {
    occupiedSeat: { 0: 'vendido-74747472' },
    passengers: {},
    travelExpenses,
    travelIncome,
    tripMadeKey: travelKeyAux,
  });
};
