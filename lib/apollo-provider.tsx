"use client";

import { ApolloProvider } from "@apollo/client/react";
import createApolloClient from "@/apollo-client";

const client = createApolloClient();

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
