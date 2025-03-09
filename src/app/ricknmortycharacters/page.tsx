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

  const { loading, error, data, refetch } = useQuery<
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
      setPage((prevPage) => prevPage - 1);
    }
  }, [page]);

  const handleNextPage = useCallback(() => {
    if (data?.characters.info.next) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [data?.characters.info.next]);

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
    return <Error message={error.message} retry={() => refetch()} />;
  }

  const characters = data?.characters.results || [];
  const info = data?.characters.info;

  return (
    <Box px={4} pb={8} mt={6}>
      <CharactersGrid characters={characters} />
      {loading && (
        <Center my={4}>
          <Image src="/portal-spinner.gif" alt="Loading Portal" width="80px" />
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
  );
};

export default RickAndMortyCharacters;
