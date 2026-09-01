import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './PdfGenerateStyles';
import { generarPlanillasLiquidacion } from './js/generar-pdfs.js';

export const PdfSettlementForms = ({ settlementFormsProps }) => {
  // Es necesario que "settlementFormsList" sea un array:
  //  *si se presiona el boton de cada fila "settlementFormsProps" llega como "obejeto"
  //  *si se imprime en masa "settlementFormsProps" llega como un "array"
  const settlementFormsList = Array.isArray(settlementFormsProps)
    ? settlementFormsProps
    : [settlementFormsProps];

  const [embedSrc, setEmbedSrc] = useState('');

  useEffect(() => {
    const handlePlanillasLiquidacion = () => {
      setTimeout(() => {
        const srcEmbed = generarPlanillasLiquidacion(settlementFormsList);
        setEmbedSrc(srcEmbed);
      }, 500);
    };

    handlePlanillasLiquidacion(); // Llamada inicial
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
