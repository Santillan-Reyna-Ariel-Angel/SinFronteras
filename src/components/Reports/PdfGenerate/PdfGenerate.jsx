import React, { useState } from 'react';
import { GlobalStyle } from './PdfGenerateStyles';

import planillaData from './data/planilla.data.json';
import planillaPasajesData from './data/planilla-pasajes.data.json';
import manifiestoPasajerosData from './data/manifiesto-pasajeros.data.json';
import usuariosData from './data/usuarios.data.json';

import {
  generarPlanillasLiquidacion,
  generarPlanillasPasajes,
  generarManifiestoPasajeros,
  generarListaUsuarios,
} from './js/generar-pdfs.js';

export const PdfGenerate = () => {
  const planillaLiquidacionList = [planillaData, planillaData, planillaData];
  const pasajesList = [
    planillaPasajesData,
    planillaPasajesData,
    planillaPasajesData,
  ];

  const [embedSrc, setEmbedSrc] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const handlePlanillasLiquidacion = () => {
    setIsFetching(true);
    setTimeout(() => {
      const srcEmbed = generarPlanillasLiquidacion(planillaLiquidacionList);
      setEmbedSrc(srcEmbed);
      setIsFetching(false);
    }, 500); // 2000
  };

  const handlePlanillasPasajes = () => {
    setIsFetching(true);
    setTimeout(() => {
      const srcEmbed = generarPlanillasPasajes(pasajesList);
      setEmbedSrc(srcEmbed);
      setIsFetching(false);
    }, 500); //2000
  };

  const handleManifiestoPasajeros = () => {
    setIsFetching(true);
    setTimeout(() => {
      const srcEmbed = generarManifiestoPasajeros(manifiestoPasajerosData);
      setEmbedSrc(srcEmbed);
      setIsFetching(false);
    }, 500); // 2000
  };

  const handleListaUsuarios = () => {
    setIsFetching(true);
    setTimeout(() => {
      const srcEmbed = generarListaUsuarios(usuariosData);
      setEmbedSrc(srcEmbed);
      setIsFetching(false);
    }, 500); // 2000
  };

  return (
    <>
      <GlobalStyle />
      <div>
        <button onClick={handlePlanillasLiquidacion}>
          Generar Planillas Liquidacion
        </button>
        <button onClick={handlePlanillasPasajes}>
          Generar Planillas Pasajes
        </button>

        <button onClick={handleManifiestoPasajeros}>
          Generar Manifiesto Pasajeros
        </button>

        <button onClick={handleListaUsuarios}>Generar Lista Usuarios</button>

        <div className="container">
          {isFetching ? (
            <div className="spinner"></div>
          ) : (
            <embed
              id="js-embed"
              src={embedSrc}
              type="application/pdf"
              width="100%"
              height="90%"
              style={{ display: embedSrc ? 'block' : 'none' }}
            />
          )}
        </div>
      </div>
    </>
  );
};
