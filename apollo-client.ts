import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  split,
} from "@apollo/client";
import Cookies from "js-cookie";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { visit } from "graphql";

// Helper function to get the appropriate auth token based on current route
const getAuthToken = (): string => {
  if (typeof window !== "undefined") {
    const isShopRoute = window.location.pathname.startsWith("/shop-");
    if (isShopRoute) {
      return Cookies.get("shop_auth_token") || "";
    }
  }
  return Cookies.get("auth_token") || "";
};

const createApolloClient = () => {
  // HTTP link for queries and mutations
  const httpLink = new HttpLink({
    uri: "https://api.temushop.online/graphql",
  });

  // WebSocket link for subscriptions
  const wsLink = new GraphQLWsLink(
    createClient({
      url: "wss://api.temushop.online/graphql",
      connectionParams: () => ({
        Authorization: getAuthToken(),
      }),
    })
  );

  // Middleware for setting Authorization headers
  const authLink = setContext((_, { headers }) => {
    const token = getAuthToken();
    return {
      headers: {
        ...headers,
        Authorization: token,
      },
    };
  });

  // Custom link to remove __typename from queries
  const removeTypenameLink = new ApolloLink((operation, forward) => {
    if (operation.query) {
      operation.query = visit(operation.query, {
        Field(node) {
          if (node.name.value === "__typename") {
            return null;
          }
        },
      });
    }
    return forward(operation);
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
    ApolloLink.from([removeTypenameLink, authLink, httpLink])
  );

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
      addTypename: false,
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "network-only",
      },
      query: {
        fetchPolicy: "network-only",
      },
    },
  });
};

export default createApolloClient;
