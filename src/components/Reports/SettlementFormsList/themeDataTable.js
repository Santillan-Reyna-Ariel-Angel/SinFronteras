import { createTheme } from '@mui/material/styles';
import createCache from '@emotion/cache';

//Styles Manejo de Tablas:
export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

//Styles Manejo de Tablas:
export const getMuiTheme = () =>
  createTheme({
    components: {
      //Cabecera superior(titulo):
      MUIDataTableToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: '#051e34', //#051e34 #00bdb2 #9ca3af
            color: 'white', //color del titlulo de la tabla
          },
          icon: {
            color: 'white',
          },
          // iconActive: {
          //   // color: 'green', //cuando se hace click aun icono
          // },
        },
      },

      //Tabla General:
      MuiTableCell: {
        //Aqui controlaremos el padding de cada(todas) celda
        styleOverrides: {
          root: {
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingLeft: '5px',
            paddingRight: '5px',
          },
          footer: {
            backgroundColor: '#051e34',
          },
        },
      },

      //Cabecera Table:
      MUIDataTableHeadCell: {
        //Aqui controlaremos el color de la cabecera
        styleOverrides: {
          root: {
            backgroundColor: '#051e34', //   #051e34 #00bdb2 #9ca3af
            color: 'white',
          },
          sortActive: {
            color: 'white',
          },
        },
      },

      //Icono para odenar columna:
      MuiTableSortLabel: {
        styleOverrides: {
          icon: {
            backgroundColor: 'white',
            // color: 'red',
          },
        },
      },

      //Cuerpo Celdas Tabla:
      MUIDataTableBodyCell: {
        //Aqui controlaremos el color de cada(todas) celda
        styleOverrides: {
          root: {
            backgroundColor: '#00bdb2', //   #051e34 #00bdb2 #9ca3af
          },
        },
      },

      //Styles Pagination (textos e iconos):
      MUIDataTablePagination: {
        styleOverrides: {
          root: {
            color: 'white',
          },
        },
      },

      //Textos de entrada(Search):
      MuiInputBase: {
        styleOverrides: {
          root: {
            input: {
              color: 'white', //textos
            },
          },
        },
      },

      //Styles del area donde aparecen los filtros (area chips)
      MUIDataTableFilterList: {
        styleOverrides: {
          root: {
            backgroundColor: '#051e34',
            margin: '0px',
          },
        },
      },

      //Styles de los chips(filtrado)
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: 'white',
          },
        },
      },

      //Styles Barra busqueda:
      MUIDataTableSearch: {
        styleOverrides: {
          searchIcon: {
            color: 'white',
          },
          clearIcon: {
            color: 'red',
          },
        },
      },
    },
  });
