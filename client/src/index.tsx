import { createMuiTheme, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "./apollo";
import Layout from "./components/Layout";
import { UserProvider } from "./contexts/userContext";

const darkModePreferred = window.matchMedia("(prefers-color-scheme: dark)").matches;
const theme = createMuiTheme({
  palette: {
    primary: {
      dark: "#455A64",
      light: "#CFD8DC",
      main: "#607D8B",
    },
    secondary: {
      main: "#FF5252",
    },
    type: darkModePreferred ? "dark" : "light",
  },
});

const App: React.FunctionComponent = () => {
  return (
    <UserProvider>
      <ApolloProvider>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Layout />
          </MuiThemeProvider>
        </BrowserRouter>
      </ApolloProvider>
    </UserProvider>
  );
};

render(<App />, document.getElementById("root"));
