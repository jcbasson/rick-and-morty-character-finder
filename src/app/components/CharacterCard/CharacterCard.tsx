"use client";
import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { Character } from "../graphql/queries";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <Box
      borderWidth="2px"
      borderColor="portalGreen.500"
      borderRadius="lg"
      overflow="hidden"
      bg="space.500"
      data-cy="character-card"
      transition="all 0.3s"
      className="portal-card"
      position="relative"
      _hover={{
        transform: "translateY(-5px) scale(1.03)",
      }}
    >
      <Box position="relative" overflow="hidden">
        <Image
          src={character.image}
          alt={character.name}
          width="100%"
          height="auto"
          loading="lazy"
          transition="transform 0.5s"
          _hover={{ transform: "scale(1.1)" }}
        />
        <Box
          position="absolute"
          top="0"
          right="0"
          bg="portalGreen.500"
          color="space.700"
          px={2}
          py={1}
          borderBottomLeftRadius="md"
          fontWeight="bold"
        >
          {character.species}
        </Box>
      </Box>

      <VStack p={4} spacing={1} align="start">
        <Text
          fontWeight="bold"
          fontSize="lg"
          data-cy="character-name"
          color="mortyYellow.500"
          textShadow="0 0 2px #fafd7c"
        >
          {character.name}
        </Text>
        <Flex align="center" mt={1}>
          <Box
            w={3}
            h={3}
            borderRadius="full"
            bg={character.species === "Human" ? "blue.400" : "portalGreen.500"}
            mr={2}
          />
          <Text fontSize="sm" color="gray.300" data-cy="character-species">
            {character.species}
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default CharacterCard;
