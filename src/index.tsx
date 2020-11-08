import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import LuxonUtils from "@date-io/luxon";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "firebase/analytics";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";
import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import ThemeProvider from "./components/ThemeProvider";
import { AuthProvider } from "./contexts/authentication";

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

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
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
    },
  }),
  uri: "http://localhost:8072/graphql",
});

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <ThemeProvider>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
              <ErrorBoundary>
                <Layout />
              </ErrorBoundary>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </AuthProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("root"));
