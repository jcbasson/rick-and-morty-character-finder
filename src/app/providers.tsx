"use client";

import { ChakraProvider as BaseChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../../apollo-client";
import createCache, { EmotionCache } from "@emotion/cache";
import { useState, useEffect } from "react";
import theme from "./themes/ricknmortyTheme";

const ChakraProvider = ({ children }: { children: React.ReactNode }) => {
  // Create Emotion cache on client side
  const [emotionCache, setEmotionCache] = useState<EmotionCache>();

  useEffect(() => {
    // This ensures the Emotion cache is only created on the client
    const cache = createCache({ key: "css" });
    setEmotionCache(cache);
  }, []);

  // Only render ChakraProvider on the client
  if (!emotionCache) {
    // Return a minimal skeleton or loading state that matches your layout
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <CacheProvider value={emotionCache}>
      <BaseChakraProvider theme={theme}>{children}</BaseChakraProvider>
    </CacheProvider>
  );
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>{children}</ChakraProvider>
    </ApolloProvider>
  );
};

export default Providers;
