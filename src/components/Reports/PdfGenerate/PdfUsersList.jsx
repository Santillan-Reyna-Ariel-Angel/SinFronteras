import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './PdfGenerateStyles';
import { generarListaUsuarios } from './js/generar-pdfs.js';
import usuariosData from './data/usuarios.data.json';

export const PdfUsersList = ({ usuariosDataProps }) => {
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
          width="100%"
          height="96%"
          style={{ display: embedSrc ? 'block' : 'none' }}
        />
      </div>
    </>
  );
};
