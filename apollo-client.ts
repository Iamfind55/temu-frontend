import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  // ApolloLink,
  split,
} from "@apollo/client";
import Cookies from "js-cookie";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

const createApolloClient = () => {
  // HTTP link for queries and mutations
  const httpLink = new HttpLink({
    uri: "https://temu.tiktokshop.online/graphql",
  });

  // WebSocket link for subscriptions
  const wsLink = new GraphQLWsLink(
    createClient({
      url: "wss://temu.tiktokshop.online/graphql",
      connectionParams: () => ({
        Authorization: Cookies.get("auth_token") || "",
      }),
    })
  );

  // Middleware for setting Authorization headers
  const authLink = setContext((_, { headers }) => {
    const token = Cookies.get("auth_token");
    return {
      headers: {
        ...headers,
        Authorization: token ? token : "",
      },
    };
  });

  // Use WebSocket for subscriptions, HTTP for queries/mutations
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    authLink.concat(httpLink)
  );

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
};

export default createApolloClient;
