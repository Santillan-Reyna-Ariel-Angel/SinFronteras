import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './PdfGenerateStyles';
import { generarPlanillasPasajes } from './js/generar-pdfs.js';

export const PdfTicket = ({ ticketDataProps }) => {
  const pasajesListOfList = [[ticketDataProps]]; //Necesario que sea una lista de listas

  const [embedSrc, setEmbedSrc] = useState('');

  useEffect(() => {
    const handlePlanillasPasajes = () => {
      setTimeout(() => {
        const srcEmbed = generarPlanillasPasajes(pasajesListOfList);
        setEmbedSrc(srcEmbed);
      }, 500);
    };

    handlePlanillasPasajes(); // Llamada inicial
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
