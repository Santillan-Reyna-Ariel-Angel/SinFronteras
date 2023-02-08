import { DialogBasic } from './../DialogBasic/DialogBasic';
import { UserRegistration } from './../UserRegistration/UserRegistration';

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
      };
    });
    // console.log('dataTableNecesary', dataTableNecesary);

    return dataTableNecesary;
  }
};
