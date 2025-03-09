"use client";
import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  HStack,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import {
  Character,
  CharactersData,
  CharactersVars,
  GET_CHARACTERS,
} from "../graphql/queries";
import CharacterCard from "../CharacterCard";
import Error from "../Error";

const CharacterGrid = () => {
  const [page, setPage] = useState(1);
  const toast = useToast();

  const { loading, error, data, refetch } = useQuery<
    CharactersData,
    CharactersVars
  >(GET_CHARACTERS, {
    variables: { page },
    notifyOnNetworkStatusChange: true,
  });

  // Error handling with user-friendly toast notifications
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
    <Box>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap={6}
        mb={8}
        data-cy="character-grid"
      >
        {characters.map((character: Character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </Grid>

      {/* Show a loading spinner when paginating */}
      {loading && (
        <Center my={4}>
          <Image src="/portal-spinner.gif" alt="Loading Portal" height="80px" />
        </Center>
      )}

      <Flex
        mb={8}
        justifyContent="center"
        alignItems="center"
        bg="space.600"
        p={4}
        borderRadius="lg"
        borderWidth="2px"
        borderColor="portalGreen.500"
        maxW="md"
        mx="auto"
      >
        <HStack spacing={4}>
          <Button
            onClick={handlePrevPage}
            isDisabled={page === 1 || loading}
            variant="rickStyle"
            data-cy="prev-page"
            leftIcon={<Box as="span">👈</Box>}
          >
            Previous
          </Button>
          <Text
            data-cy="page-indicator"
            px={4}
            py={2}
            borderRadius="md"
            bg="space.700"
            color="portalGreen.500"
            fontWeight="bold"
          >
            {page} / {info?.pages || "?"}
          </Text>
          <Button
            onClick={handleNextPage}
            isDisabled={!info?.next || loading}
            variant="rickStyle"
            data-cy="next-page"
            rightIcon={<Box as="span">👉</Box>}
          >
            Next
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default CharacterGrid;
