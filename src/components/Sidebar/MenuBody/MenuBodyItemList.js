//icons-material
import { People } from '@mui/icons-material';
// Otros iconos
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import FormatListNumberedRoundedIcon from '@mui/icons-material/FormatListNumberedRounded';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import DepartureBoardRoundedIcon from '@mui/icons-material/DepartureBoardRounded';
import MovingRoundedIcon from '@mui/icons-material/MovingRounded';

export const menuBodyItemList = [
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
        path: '/personal/registro-de-cargos',
        title: 'Registro de Usuarios',
        icon: <PersonAddRoundedIcon />,
      },
      {
        path: '/personal/roles-y-permisos',
        title: 'Roles y permisos',
        icon: <FactCheckRoundedIcon />,
      },
    ],
  },
  {
    path: '/Buses',
    icon: <DirectionsBusRoundedIcon />,
    title: 'Bueses',
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
        path: '/viajes/programar-viaje',
        title: 'Programar viaje',
        icon: <DepartureBoardRoundedIcon />,
      },
      // {
      //   path: '/viajes/lista-de-viajes',
      //   title: 'Lista de viajes',
      //   icon: <FormatListNumberedRoundedIcon />,
      // },
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
      {
        path: '/sucursales/lista-de-sucursales',
        title: 'Lista de Sucursales',
        icon: <FormatListNumberedRoundedIcon />,
      },
    ],
  },
];
