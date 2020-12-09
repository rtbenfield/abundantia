import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import LuxonUtils from "@date-io/luxon";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
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

const AuthorizedApolloProvider: React.FC = ({ children }) => {
  const { getIdTokenClaims } = useAuth0();

  const cache = new InMemoryCache({
    typePolicies: {
      Loan: {
        fields: {
          startDate: {
            read(existing) {
              return new Date(existing);
            },
          },
        },
      },
      ScenarioPayment: {
        fields: {
          from: {
            read(existing) {
              return new Date(existing);
            },
          },
          to: {
            read(existing) {
              return new Date(existing);
            },
          },
        },
      },
    },
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await getIdTokenClaims();
    return {
      headers: {
        ...headers,
        Authorization: token.__raw,
      },
    };
  });

  const httpLink = createHttpLink({
    credentials: "same-origin",
    uri: "https://abundantia.us-west-2.aws.cloud.dgraph.io/graphql",
  });

  const client = new ApolloClient({
    cache,
    connectToDevTools: true,
    link: authLink.concat(httpLink),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Auth0Provider
        domain="abundantia-dev.us.auth0.com"
        clientId="60A41Bdl96M1U3tC54ZYMfpUcfNrezH5"
        redirectUri={window.location.origin}
      >
        <AuthorizedApolloProvider>
          <ThemeProvider>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
              <ErrorBoundary>
                <Layout />
              </ErrorBoundary>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </AuthorizedApolloProvider>
      </Auth0Provider>
    </Router>
  );
};

const SentryApp = Sentry.withProfiler(App);

render(<SentryApp />, document.getElementById("root"));
