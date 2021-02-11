import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Comics from "../Pages/Comics/Comics";
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Comics} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
