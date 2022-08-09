//generateTicketNumber:
export const generateTicketNumber = ({
  identificationNumber,
  branchNumber,
}) => {
  let date = new Date();
  let suc = `suc${branchNumber}`;
  let dateTN = `${date.getMonth() + 1}${date.getFullYear()}`;
  let ticketNumber = `${suc}-${dateTN}-${identificationNumber}`;
  // console.log('ticketNumber:', ticketNumber);
  return ticketNumber;
};
