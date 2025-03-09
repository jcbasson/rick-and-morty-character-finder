"use client";

import { Box, Grid } from "@chakra-ui/react";
import { Character } from "../../graphql/queries/getCharacters";
import CharacterCard from "./Card";

interface CharactersGridProps {
  characters: Character[];
}

const CharactersGrid = ({ characters }: CharactersGridProps) => {
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
    </Box>
  );
};

export default CharactersGrid;
