import LuxonUtils from "@date-io/luxon";
import { CssBaseline } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
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
import ErrorHandler from "./components/ErrorHandler";
import SnackbarProvider from "./components/SnackbarProvider";
import ThemeProvider from "./components/ThemeProvider";

ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID || "", {
  debug: process.env.NODE_ENV !== "production",
});

Sentry.init({ dsn: process.env.SENTRY_DSN_FRONTEND, environment: process.env.NODE_ENV || "development" });

const App: React.FunctionComponent = () => {
  return (
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <DocumentTitleProvider defaultTitle="Home" suffix=" - Loan Rover">
        <UserProvider>
          <ApolloProvider>
            <BrowserRouter>
              <RouteAnalytics />
              <ThemeProvider>
                <CssBaseline />
                <SnackbarProvider anchorOrigin={{ horizontal: "right", vertical: "bottom" }} maxSnack={1}>
                  <ErrorHandler>
                    <Layout />
                  </ErrorHandler>
                </SnackbarProvider>
              </ThemeProvider>
            </BrowserRouter>
          </ApolloProvider>
        </UserProvider>
      </DocumentTitleProvider>
    </MuiPickersUtilsProvider>
  );
};

render(<App />, document.getElementById("root"));
