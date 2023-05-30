import { encryptPasswordSync, verifyPasswordSync } from './globalFunctions.js';

let passwordInput = '80000004';

let hashedPassword = encryptPasswordSync(passwordInput);
// console.log('hashedPassword: ', hashedPassword);

let verify = verifyPasswordSync({ passwordInput, hashedPassword });
// console.log('verify: ', verify);

console.log(
  `passwordInput: ${passwordInput} | hashedPassword ${hashedPassword} | verify: ${verify} `
);
