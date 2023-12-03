import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './PdfGenerateStyles';
import { useMediaQuery } from '@mui/material';
import { generarListaUsuarios } from './js/generar-pdfs.js';
import usuariosData from './data/usuarios.data.json';

export const PdfUsersList = ({ usuariosDataProps }) => {
  const isScreenMaxW_768 = useMediaQuery('(max-width:768px)'); // useMediaQuery para verificar si la pantalla es de 768px o menos
  // console.log('isScreenMaxW_768', isScreenMaxW_768);

  // Es necesario que "passengerManifestList" sea un array:
  //  *si se presiona el boton de cada fila "usuariosDataProps" llega como "obejeto"
  //  *si se imprime en masa "usuariosDataProps" llega como un "array"
  // const passengerManifestList = Array.isArray(usuariosDataProps)
  //   ? usuariosDataProps
  //   : [usuariosDataProps];

  const usuariosDataObj = usuariosDataProps ? usuariosDataProps : usuariosData;

  const [embedSrc, setEmbedSrc] = useState('');

  useEffect(() => {
    const handleListaUsuarios = () => {
      setTimeout(() => {
        const srcEmbed = generarListaUsuarios(usuariosDataObj);
        setEmbedSrc(srcEmbed);
      }, 500);
    };

    handleListaUsuarios(); // Llamada inicial
  }, []); // El array vacío hace que useEffect se ejecute solo una vez al montar el componente

  return (
    <>
      <GlobalStyle />

      <div className="container">
        <embed
          id="js-embed"
          src={embedSrc}
          type="application/pdf"
          width={isScreenMaxW_768 ? '100%' : '600px'} //100% , 425px, 450px, 600px
          height="96%"
          style={{ display: embedSrc ? 'block' : 'none' }}
        />
      </div>
    </>
  );
};
