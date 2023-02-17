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
        branchOfficeName: userData.branchOfficeName,
        mobile: userData.mobile,
        status: userData.status,

        btnEdit: (
          <DialogBasic
            primaryBtnText="editar"
            componentView={
              <UserRegistration
                identificationNumber={userData.identificationNumber}
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
