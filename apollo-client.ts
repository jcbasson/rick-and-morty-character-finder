// lib/apollo-client.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: {
            // Create a single cache across all pages for characters regardless of what query variables are used
            keyArgs: false,
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
