import { createMuiTheme, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import * as Sentry from "@sentry/browser";
import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "./apollo";
import Layout from "./components/Layout";
import { UserProvider } from "./contexts/userContext";
import ErrorHandler from "./components/ErrorHandler/ErrorHandler";

Sentry.init({ dsn: process.env.SENTRY_DSN });

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
            <ErrorHandler>
              <Layout />
            </ErrorHandler>
          </MuiThemeProvider>
        </BrowserRouter>
      </ApolloProvider>
    </UserProvider>
  );
};

render(<App />, document.getElementById("root"));
