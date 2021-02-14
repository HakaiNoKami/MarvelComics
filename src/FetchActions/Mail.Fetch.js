import MailClient from "../Services/Mail.Service";
import { sendMail } from "../Actions/Mail.Action";

export const sendComicsToMail = (mail, comics) => {
  return (dispatch) =>
    MailClient.post("", { mail, comics })
      .then((response) => {
        if (response.data.success) dispatch(sendMail(true, "Success"));
        else dispatch(sendMail(false, response.data.message));
      })
      .catch((err) => dispatch(sendMail(false, err.message)));
};
