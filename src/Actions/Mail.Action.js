import * as mailConstants from "../Constants/Mail.Constant";

export function sendMail(status, message) {
  return {
    type: mailConstants.sendMail,
    status,
    message,
  };
}
