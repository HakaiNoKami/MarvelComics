import { createStore, applyMiddleware } from "redux";
import { enableBatching } from "redux-batched-actions";

import thunk from "redux-thunk";

import reduces from "../Reduces";

const store = createStore(enableBatching(reduces), applyMiddleware(thunk));

export default store;
