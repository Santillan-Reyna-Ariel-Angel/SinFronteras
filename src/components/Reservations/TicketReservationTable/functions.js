import { DialogBasic } from '../../DialogBasic/DialogBasic';
import { UserRegistration } from './../UserRegistration/UserRegistration';
import { PlainModalButton } from '../../PlainModalButton/PlainModalButton';
import { deleteUser } from './../UserRegistration/Firebase/deleteUser';

export const getDataTableNecesary = ({ allUserDataList }) => {
  if (allUserDataList.length === 0) {
    return [];
  } else {
    let dataTableNecesary = allUserDataList.map((userData) => {
      return {
        identificationNumber: userData.identificationNumber,
        userFullName: `${userData.surnames} ${userData.names}`,
        charge: userData.charge,
        branchNumberOrCode: userData.branchNumberOrCode,
        branchOfficeName: userData.branchOfficeName,
        mobile: userData.mobile,
        status: userData.status,

        btnEdit: (
          <DialogBasic
            primaryBtnText="editar"
            componentView={
              <UserRegistration
                identificationNumber={userData.identificationNumber}
                isDataUpdate={true}
              />
            }
          />
        ),

        btnDelete: (
          <PlainModalButton
            primaryBtnText="Eliminar"
            dialogTitle="Lista de usuarios"
            dialogText={`Esta seguro de eliminar al usuario ${userData.surnames} ${userData.names}?`}
            closeBtnText="cancelar"
            continueBtnText="si"
            functionToExecute={deleteUser}
            functionParameters={userData.identificationNumber}
            primaryBtnColor="error"
          />
        ),
      };
    });
    // console.log('dataTableNecesary', dataTableNecesary);

    return dataTableNecesary;
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
