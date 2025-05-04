"use client";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Text, useToast, Center, Image } from "@chakra-ui/react";
import {
  CharactersData,
  CharactersVars,
  GET_CHARACTERS,
} from "../graphql/queries/getCharacters";
import Error from "../components/Error";
import { CharactersGrid, CharactersPager } from "../components/Characters";

const RickAndMortyCharacters = () => {
  const [page, setPage] = useState(1);
  const toast = useToast();

  const { loading, error, data, fetchMore } = useQuery<
    CharactersData,
    CharactersVars
  >(GET_CHARACTERS, {
    variables: { page },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Wubba Lubba Dub Dub! Error!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handlePrevPage = useCallback(() => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);

      // Use fetchMore to get the previous page
      fetchMore({
        variables: { page: prevPage },
        // This will replace the current data with the new page data
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return fetchMoreResult;
        },
      });
    }
  }, [page, fetchMore]);

  const handleNextPage = useCallback(() => {
    if (data?.characters.info.next) {
      const nextPage = page + 1;
      setPage(nextPage);

      // Use fetchMore to get the next page
      fetchMore({
        variables: { page: nextPage },
        // This will replace the current data with the new page data
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return fetchMoreResult;
        },
      });
    }
  }, [data?.characters.info.next, page, fetchMore]);

  // If we're loading and don't have any data yet, show a centered spinner
  if (loading && !data) {
    return (
      <Center h="50vh" data-cy="loading-spinner" flexDirection="column">
        <Image src="/portal-spinner.gif" alt="Loading Portal" boxSize="150px" />
        <Text mt={4} color="portalGreen.500">
          Opening a portal to fetch characters...
        </Text>
      </Center>
    );
  }

  // Error state with refresh option
  if (error && !data) {
    return (
      <Error
        message={error.message}
        retry={() => {
          // Retry the current page
          fetchMore({
            variables: { page },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return fetchMoreResult;
            },
          });
        }}
      />
    );
  }

  const characters = data?.characters.results || [];
  const info = data?.characters.info;

  return (
    <>
      <Text
        mx={4}
        textAlign="center"
        fontSize="lg"
        color="gray.300"
        px={4}
        py={3}
        borderRadius="md"
        bg="space.600"
        borderWidth="1px"
        borderColor="portalGreen.500"
      >
        <Box as="span" color="portalGreen.500" fontWeight="bold">
          *burp*
        </Box>{" "}
        Explore characters from across the multiverse. Don&apos;t get too
        attached Morty, they&apos;re just data from an API.
      </Text>

      <Box px={4} pb={8} mt={6}>
        <CharactersGrid characters={characters} />
        {loading && (
          <Center my={4}>
            <Image
              src="/portal-spinner.gif"
              alt="Loading Portal"
              width="80px"
            />
          </Center>
        )}
        <CharactersPager
          pageNo={page}
          totalPages={info?.pages}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          disableNextPaging={!info?.next || loading}
          disablePrevPaging={page === 1 || loading}
        />
      </Box>
    </>
  );
};

export default RickAndMortyCharacters;
