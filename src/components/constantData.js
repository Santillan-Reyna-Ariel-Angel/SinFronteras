export const DEPARTMENT_LIST = [
  'beni',
  'chuquisaca',
  'cochabamba',
  'la paz',
  'oruro',
  'pando',
  'potosi',
  'santa cruz',
  'tarija',
];

// MUIDataTable IDIOMA ESPAÑOL (import MUIDataTable from 'mui-datatables'):
export const MUI_DATA_TABLE___TEXT_LABELS_ES = {
  body: {
    noMatch: 'No se encontraron coincidencias',
    toolTip: 'Ordenar',
  },
  pagination: {
    next: 'Siguiente página',
    previous: 'Página anterior',
    rowsPerPage: 'Filas por página:',
    displayRows: 'de',
  },
  toolbar: {
    search: 'Buscar',
    downloadCsv: 'Descargar CSV',
    print: 'Imprimir',
    viewColumns: 'Ver columnas',
    filterTable: 'Filtrar tabla',
  },
  filter: {
    all: 'Todos',
    title: 'FILTRO',
    reset: 'REINICIAR',
  },
  viewColumns: {
    title: 'Ver columnas',
    titleAria: 'Ver/Ocultar columnas',
  },
  selectedRows: {
    text: 'fila(s) seleccionada(s)',
    delete: 'Eliminar',
    deleteAria: 'Eliminar filas seleccionadas',
  },
};

export const globalColors = {
  background: '#00bdb2', // verde turqueza
  border: '#051e34', //contornos azul oscuro
};

// FOR Css_TextField_Select:
export const Css_TextField_Select = {
  // fontFamily: 'Times New Roman',
  fontSize: 14,
  fontWeight: 'bold', // bold, 500
  fontWeighScreenUpperW_768: '500', // bold, 500
  color: 'black', // Cambia el color del texto que se escribe en el TextField/ combinaciones: amarillo, blanco, rojo, negro
  backgroundColor: 'rgba(255, 255, 255, 0.4)', //  Cambia el color de fondo del TextField. ""=>transparente
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VALUES: font-weight
/* <font-weight-absolute> keyword values */
// font-weight: normal;
// font-weight: bold;

/* <font-weight-absolute> numeric values [1,1000] */
// font-weight: 100;
// font-weight: 200;
// font-weight: 300;
// font-weight: 400; /* normal */
// font-weight: 500;
// font-weight: 600;
// font-weight: 700; /* bold */
// font-weight: 800;
// font-weight: 900;
// sx={{
//   '.MuiInputBase-root': {
//     fontSize: Css_TextField_Select.fontSize,
//     // fontWeight: Css_TextField_Select.fontWeight,
//     // backgroundColor: 'white', // Cambia el color de fondo del TextField
//     color: 'blue', // Cambia el color del texto que se escribe
//     fontWeight: 500,
//     // border: '1px solid #007bff', // '1px solid rgba(0, 0, 0, 0.2)' NO FUNCIONA BIEN CUANDO SE HACE CLICK EN EL TEXTFIELD
//   },
//   '& label': {
//     // color: 'black', // Cambia el color de la propiedad "label"
//     // opacity: 1, // Cambia la opacidad de la etiqueta (valores entre 0 y 1(default))
//   },
//   '& .Mui-focused': {
//     // NO USAR MUCHO ESTA PROPIEDAD, YA QUE NO CAMBIA COMO SE ESPERAN LAS COSAS
//     // Establece estilos adicionales cuando el TextField está enfocado
//     // color: 'green',
//     // border: '1px solid #ff00b3', // Cambia el color del borde al estar enfocado
//   },
// }}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//NOTA: Para usarlo en un TextField o Select, se debe usar de la siguiente manera:
// <TextField>
// sx={{
//   '.MuiInputBase-root': {
//     fontSize: Css_TextField_Select.fontSize,
//   },
// }}

// <Select>
// sx={{
//   '.MuiSelect-select': {
//     fontSize: Css_TextField_Select.fontSize,
//   },
// }}
