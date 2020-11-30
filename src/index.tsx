import LuxonUtils from "@date-io/luxon";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";
import { createBrowserHistory } from "history";
import * as React from "react";
import { render } from "react-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import { Router } from "./components/Router";
import ThemeProvider from "./components/ThemeProvider";

const history = createBrowserHistory();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT,
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
    }),
  ],
  release: process.env.GITHUB_SHA,
  tracesSampleRate: 1,
});

firebase.initializeApp({
  apiKey: "AIzaSyB9Ed9FL223yYKfwTLpT43n1MJ_TcnyzbU",
  authDomain: "abundantia-io.firebaseapp.com",
  databaseURL: "https://abundantia-io.firebaseio.com",
  projectId: "abundantia-io",
  storageBucket: "abundantia-io.appspot.com",
  messagingSenderId: "175120670657",
  appId: "1:175120670657:web:9d9e8c0dff64f9db9b5940",
  measurementId: "G-HZN9PN91NL",
});
firebase.performance();

const App: React.FC = () => {
  return (
    <Router history={history}>
      <ThemeProvider>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <ErrorBoundary>
            <Layout />
          </ErrorBoundary>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Router>
  );
};

const SentryApp = Sentry.withProfiler(App);

render(<SentryApp />, document.getElementById("root"));
