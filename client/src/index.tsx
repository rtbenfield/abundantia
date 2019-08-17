import { createMuiTheme, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import * as Sentry from "@sentry/browser";
import * as React from "react";
import { render } from "react-dom";
import ReactGA from "react-ga";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "./apollo";
import Layout from "./components/Layout";
import RouteAnalytics from "./components/RouteAnalytics";
import { DocumentTitleProvider } from "./contexts/documentTitleContext";
import { UserProvider } from "./contexts/userContext";
import ErrorHandler from "./components/ErrorHandler/ErrorHandler";

ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID || "", {
  debug: process.env.NODE_ENV !== "production",
});

Sentry.init({ dsn: process.env.SENTRY_DSN_FRONTEND, environment: process.env.NODE_ENV || "development" });

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
ReactGA.set({
  theme: darkModePreferred ? "dark" : "light",
});

const App: React.FunctionComponent = () => {
  return (
    <DocumentTitleProvider defaultTitle="Home" suffix=" - Loan Rover">
      <UserProvider>
        <ApolloProvider>
          <BrowserRouter>
            <RouteAnalytics />
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <ErrorHandler>
                <Layout />
              </ErrorHandler>
            </MuiThemeProvider>
          </BrowserRouter>
        </ApolloProvider>
      </UserProvider>
    </DocumentTitleProvider>
  );
};

render(<App />, document.getElementById("root"));
