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

        // btnSettlementForm: (
        //   <DialogBasic
        //     primaryBtnText="ver planilla"
        //     componentView={
        //       <PrintSettlementForm settlementFormData={settlementData} />
        //     }
        //   />
        // ),
      };
    });
    // console.log('dataTableNecesary', dataTableNecesary);

    return dataTableNecesary;
  }
};
