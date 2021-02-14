import * as loadingConstants from "../Constants/Loading.Constant";

export default function loading(state = false, action) {
  switch (action.type) {
    case loadingConstants.changeLoading:
      return action.status;
    default:
      return state;
  }
}
