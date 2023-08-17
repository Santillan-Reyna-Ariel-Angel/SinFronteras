import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './PdfGenerateStyles';
import { generarPlanillasPasajes } from './js/generar-pdfs.js';

export const PdfTicket = ({ ticketDataProps }) => {
  //Es necesario que "ticketsListOfList" sea una lista de listas:
  const ticketsListOfList = Array.isArray(ticketDataProps)
    ? [ticketDataProps] // si ticketDataProps es un array, solo se necesita 1 [] para que sea una lista de listas
    : [[ticketDataProps]];

  const [embedSrc, setEmbedSrc] = useState('');

  useEffect(() => {
    const handlePlanillasPasajes = () => {
      setTimeout(() => {
        const srcEmbed = generarPlanillasPasajes(ticketsListOfList);
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
