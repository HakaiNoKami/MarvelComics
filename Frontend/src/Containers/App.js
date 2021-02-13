import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Comics from "../Pages/Comics/Comics";
import "./App.scss";

import store from "./Store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Comics} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
