// pages/_app.tsx
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import apolloClient from "../../../apollo-client";
import "../styles/globals.css";
import theme from "../themes/ricknmortyTheme";

// Customize the Chakra UI theme with Rick and Morty inspired colors

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
