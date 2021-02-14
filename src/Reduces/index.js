import { combineReducers } from "redux";

import comics from "../Reduces/Comics.Reduce";
import mail from "../Reduces/Mail.Reduce";

const reduces = combineReducers({ comics, mail });

export default reduces;
