//icons-material
import { People } from '@mui/icons-material';
// Otros iconos
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
// import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import FormatListNumberedRoundedIcon from '@mui/icons-material/FormatListNumberedRounded';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import DepartureBoardRoundedIcon from '@mui/icons-material/DepartureBoardRounded';
import MovingRoundedIcon from '@mui/icons-material/MovingRounded';
//Reportes:
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
//Viajes:
import AddLocationRoundedIcon from '@mui/icons-material/AddLocationRounded';
// import MoneyOffRoundedIcon from '@mui/icons-material/MoneyOffRounded';
// perfil:
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
//contraseña:
// import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
// import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';

const menuBodyItemList = [
  {
    path: '/ventas',
    icon: <PointOfSaleRoundedIcon />,
    title: 'Ventas',
    children: [
      {
        path: '/ventas/pasajes',
        title: 'Pasajes',
        icon: <ConfirmationNumberRoundedIcon />,
      },
    ],
  },
  {
    path: '/personal',
    icon: <People />,
    title: 'Personal',
    children: [
      {
        path: '/personal/registro-de-usuarios',
        title: 'Registro de Usuarios',
        icon: <PersonAddRoundedIcon />,
      },
      {
        path: '/personal/lista-de-usuarios',
        title: 'Lista de Usuarios',
        icon: <FormatListNumberedRoundedIcon />,
      },
      // {
      //   path: '/personal/roles-y-permisos',
      //   title: 'Roles y permisos',
      //   icon: <FactCheckRoundedIcon />,
      // },
    ],
  },
  {
    path: '/Buses',
    icon: <DirectionsBusRoundedIcon />,
    title: 'Buses',
    children: [
      {
        path: '/buses/registro-de-buses',
        title: 'Registro de Buses',
        icon: <AddCircleRoundedIcon />,
      },
      {
        path: '/buses/lista-de-buses',
        title: 'Lista de buses',
        icon: <FormatListNumberedRoundedIcon />,
      },
    ],
  },
  {
    path: '/Viajes',
    icon: <MovingRoundedIcon />, // <DirectionsBusRoundedIcon />,
    title: 'Viajes',
    children: [
      {
        path: '/viajes/registrar-destinos',
        title: 'Registrar Destinos',
        icon: <AddLocationRoundedIcon />,
      },

      {
        path: '/viajes/programar-viaje',
        title: 'Programar viaje',
        icon: <DepartureBoardRoundedIcon />,
      },
    ],
  },
  {
    path: '/Reportes',
    icon: <QueryStatsRoundedIcon />,
    title: 'Reportes',
    children: [
      {
        path: '/reportes/lista-de-ventas',
        title: 'Lista de ventas',
        icon: <FormatListNumberedRoundedIcon />,
      },
      {
        path: '/reportes/lista-de-viajes',
        title: 'Lista de viajes',
        icon: <FormatListNumberedRoundedIcon />,
      },
    ],
  },
  {
    path: '/sucursales',
    icon: <HomeWorkRoundedIcon />,
    title: 'Sucursales',
    children: [
      {
        path: '/sucursales/registro-de-sucursales',
        title: 'Registro de sucursales',
        icon: <MapsHomeWorkRoundedIcon />,
      },
      // {
      //   path: '/sucursales/lista-de-sucursales',
      //   title: 'Lista de Sucursales',
      //   icon: <FormatListNumberedRoundedIcon />,
      // },
    ],
  },

  {
    path: '/perfil',
    icon: <ManageAccountsRoundedIcon />,
    title: 'Perfil',
    children: [
      {
        path: '/perfil/mi-perfil',
        title: 'Mi perfil',
        icon: <PersonRoundedIcon />,
      },
      {
        path: '/perfil/cambiar-contrasenia', // NO USAR Ñ o la ruta no se pone en focus
        title: 'Seguridad',
        icon: <PersonRoundedIcon />,
      },
    ],
  },
];
const [sales, users, buses, travels, reports, branchOffices, perfil] =
  menuBodyItemList;

const OWNER_MENU = [
  perfil,
  sales,
  users,
  buses,
  travels,
  reports,
  branchOffices,
];

const GENERAL_ADMINISTRATOR_MENU = [
  perfil,
  sales,
  users,
  buses,
  travels,
  reports,
  branchOffices,
]; //  o const GENERAL_ADMINISTRATOR_MENU = OWNER_MENU;

const BRANCH_MANAGER_MENU = [
  perfil,
  sales,
  users,
  buses,
  { ...travels, children: [travels.children[1]] }, // solo se mostrara el item de "programar viaje"
  reports,
];

const SECRETARY_MENU = [
  perfil,
  sales,
  { ...users, children: [users.children[1]] }, // solo se mostrara el item de "lista de usuarios"
  { ...buses, children: [buses.children[1]] }, // solo se mostrara el item de "lista de buses"
  { ...travels, children: [travels.children[1]] }, // solo se mostrara el item de "programar viaje"
  reports,
];

const TICKET_HOLDER_MENU = [
  perfil,
  sales,
  { ...reports, children: [reports.children[0]] }, // solo se mostrara el item de "lista de ventas"
];

const DRIVER_MENU = [perfil, reports];

export const getMenuBodyItemList = (charge) => {
  let menuBodyItemList;

  switch (charge) {
    case 'dueño':
      menuBodyItemList = OWNER_MENU;
      break;
    case 'adm-general':
      menuBodyItemList = GENERAL_ADMINISTRATOR_MENU;
      break;
    case 'adm-sucursal':
      menuBodyItemList = BRANCH_MANAGER_MENU;
      break;
    case 'secretaria(o)':
      menuBodyItemList = SECRETARY_MENU;
      break;
    case 'boletero(a)':
      menuBodyItemList = TICKET_HOLDER_MENU;
      break;
    case 'chofer':
      menuBodyItemList = DRIVER_MENU;
      break;

    default:
      console.log(`El cargo no coincide.`);
      menuBodyItemList = [];
  }

  return menuBodyItemList;
};
