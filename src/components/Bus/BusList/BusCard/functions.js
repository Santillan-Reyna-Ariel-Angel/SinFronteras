export const getBusesByUserRole = ({
  charge,
  branchNumber,
  companyBusesArray,
}) => {
  let busesFilteredByUserRole = [];

  if (charge === 'dueño' || charge === 'adm-general') {
    busesFilteredByUserRole = companyBusesArray;
  }

  if (charge === 'adm-sucursal') {
    busesFilteredByUserRole = companyBusesArray.filter(
      (bus) =>
        bus.designatedBranch === 'DISPONIBLE' ||
        bus.designatedBranch === branchNumber
    );
  }

  return busesFilteredByUserRole;
};

export const isEdit = ({ charge, designatedBranch }) => {
  if (charge === 'dueño' || charge === 'adm-general') {
    return true;
  }

  if (charge === 'adm-sucursal') {
    return designatedBranch === 'DISPONIBLE' ? true : false;
  }
};

export const isDelete = ({ charge, designatedBranch }) => {
  if (charge === 'dueño' || charge === 'adm-general') {
    return designatedBranch === 'DISPONIBLE' ? true : false;
  }

  if (charge === 'adm-sucursal') {
    return false;
  }
};
