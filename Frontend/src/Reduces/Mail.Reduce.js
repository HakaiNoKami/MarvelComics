import * as mailConstants from "../Constants/Mail.Constant";

const initalState = {
  status: true,
  message: "",
};

export default function mail(state = initalState, action) {
  switch (action.type) {
    case mailConstants.sendMail:
      return action;
    default:
      return state;
  }
}
