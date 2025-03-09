"use client";

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: {
            // Cache records by page number, if the data changes regularly then set this to false
            keyArgs: ["page"],
            // Merge already retrieved data with newly fetched data
            merge(existing = { results: [] }, incoming) {
              return {
                ...incoming,
                results: [...existing.results, ...incoming.results],
              };
            },
          },
        },
      },
    },
  }),
});

export default client;
