import { DialogBasic } from '../../DialogBasic/DialogBasic';
// import { UserRegistration } from './../UserRegistration/UserRegistration';
import { PlainModalButton } from '../../PlainModalButton/PlainModalButton';
// import { deleteUser } from './../UserRegistration/Firebase/deleteUser';

export const getDataTableNecesary = ({ reserveSeatsList }) => {
  // console.log('reserveSeatsList', reserveSeatsList);
  if (reserveSeatsList.length === 0) {
    return [];
  } else {
    let dataTableNecesary = reserveSeatsList.map((reserveSeat) => {
      let buyerIdList = Object.keys(reserveSeat);
      // console.log('buyerIdList', buyerIdList);

      let dataTableNecesaryAux = buyerIdList.map((buyerId) => {
        return {
          identificationNumberUser:
            reserveSeat[buyerId].userData.identificationNumber,
          userFullName: `${reserveSeat[buyerId].userData.surnames} ${reserveSeat[buyerId].userData.names}`,
          identificationNumberBuyer: reserveSeat[buyerId].buyerData.ciOrNit,
          buyerFullName: reserveSeat[buyerId].buyerData.fullName,
          reserveSeats: reserveSeat[buyerId].seats.join(' , '),

          // btnEdit: (
          //   <DialogBasic
          //     primaryBtnText="editar"
          //     componentView={
          //       <UserRegistration
          //         identificationNumber={userData.identificationNumber}
          //         isDataUpdate={true}
          //       />
          //     }
          //   />
          // ),

          // btnDelete: (
          //   <PlainModalButton
          //     primaryBtnText="Eliminar"
          //     dialogTitle="Lista de usuarios"
          //     dialogText={`Esta seguro de eliminar al usuario ${userData.surnames} ${userData.names}?`}
          //     closeBtnText="cancelar"
          //     continueBtnText="si"
          //     functionToExecute={deleteUser}
          //     functionParameters={userData.identificationNumber}
          //     primaryBtnColor="error"
          //   />
          // ),
        };
      });

      return dataTableNecesaryAux;
    });

    // dataTableNecesary:
    //  * sale como un array  de arrays.
    //  * flat(1) aplana(convierte) el array de arrays en un solo array.

    // console.log('dataTableNecesary', dataTableNecesary.flat(1));

    return dataTableNecesary.flat(1);
  }
};

export const getColumnsByUserRole = ({ charge, columns }) => {
  let columnsFilteredByUserRole = [];

  if (
    charge === 'dueño' ||
    charge === 'adm-general' ||
    charge === 'adm-sucursal'
  ) {
    columnsFilteredByUserRole = columns;
  }

  if (charge === 'secretaria(o)') {
    columnsFilteredByUserRole = columns.filter(
      (column) => column.name !== 'btnEdit' && column.name !== 'btnDelete'
    );
  }

  return columnsFilteredByUserRole;
};

export const isEdit = ({ charge, columns }) => {
  let columnsFilteredByUserRole = [];

  if (
    charge === 'dueño' ||
    charge === 'adm-general' ||
    charge === 'adm-sucursal'
  ) {
    columnsFilteredByUserRole = columns;
  }

  if (charge === 'secretaria(o)') {
    columnsFilteredByUserRole = columns.filter(
      (column) => column.name !== 'btnEdit'
    );
  }

  return columnsFilteredByUserRole;
};

export const isDelete = ({ charge, columns_isEditResponse }) => {
  let columnsFilteredByUserRole = [];

  if (
    charge === 'dueño' ||
    charge === 'adm-general' ||
    charge === 'adm-sucursal'
  ) {
    columnsFilteredByUserRole = columns_isEditResponse;
  }

  if (charge === 'secretaria(o)') {
    columnsFilteredByUserRole = columns_isEditResponse.filter(
      (column) => column.name !== 'btnDelete'
    );
  }

  return columnsFilteredByUserRole;
};
