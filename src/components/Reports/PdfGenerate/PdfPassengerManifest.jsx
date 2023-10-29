import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './PdfGenerateStyles';
import { generarManifiestoPasajeros } from './js/generar-pdfs.js';
import manifiestoPasajerosData from './data/manifiesto-pasajeros.data.json';

export const PdfPassengerManifest = ({ passengerManifestProps }) => {
  // Es necesario que "passengerManifestList" sea un array:
  //  *si se presiona el boton de cada fila "passengerManifestProps" llega como "obejeto"
  //  *si se imprime en masa "passengerManifestProps" llega como un "array"
  // const passengerManifestList = Array.isArray(passengerManifestProps)
  //   ? passengerManifestProps
  //   : [passengerManifestProps];

  const passengerManifestObj = passengerManifestProps
    ? passengerManifestProps
    : manifiestoPasajerosData;

  const [embedSrc, setEmbedSrc] = useState('');

  useEffect(() => {
    const handleManifiestoPasajeros = () => {
      setTimeout(() => {
        const srcEmbed = generarManifiestoPasajeros(passengerManifestObj);
        setEmbedSrc(srcEmbed);
      }, 500);
    };

    handleManifiestoPasajeros(); // Llamada inicial
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
