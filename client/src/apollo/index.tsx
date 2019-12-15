import { ApolloProvider as ApolloProviderCore } from "@apollo/react-common";
import ApolloClient from "apollo-boost";
import * as React from "react";
import { useUserContext } from "../contexts/userContext";

export const ApolloProvider: React.FC = ({ children }) => {
  const { connectionString, user } = useUserContext();

  const client = React.useMemo(() => {
    return new ApolloClient({
      uri: "/api",
      headers: {
        Authorize: user ? `Bearer ${user.authToken}` : "",
      },
    });
  }, [connectionString]);

  return <ApolloProviderCore client={client}>{children}</ApolloProviderCore>;
};
