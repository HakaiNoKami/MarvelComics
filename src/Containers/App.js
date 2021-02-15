import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Comics from "../Pages/Comics/Comics";
import "./App.scss";

import { store } from "./Store";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ed1d24",
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/MarvelComics" exact={true} component={Comics} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
