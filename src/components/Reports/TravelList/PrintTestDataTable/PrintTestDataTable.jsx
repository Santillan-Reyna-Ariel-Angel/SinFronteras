import React from 'react';

export const PrintTestDataTable = ({ Table }) => {
  const printDocument = () => {
    window.print();
  };

  return (
    <>
      <span>{'Titulo Tabla'}</span>
      <Table />
      <button onClick={printDocument}>Print</button>
    </>
  );
};
