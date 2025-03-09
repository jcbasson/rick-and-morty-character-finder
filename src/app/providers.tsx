"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../../apollo-client";
import theme from "./themes/ricknmortyTheme";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </ApolloProvider>
  );
};

export default Providers;
