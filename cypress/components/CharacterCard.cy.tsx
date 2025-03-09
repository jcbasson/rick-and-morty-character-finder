import { ChakraProvider } from "@chakra-ui/react";
import { CharactersGrid } from "../../src/app/components/Characters";

describe("CharactersGrid", () => {
  afterEach(() => {
    cy.wait(1000);
  });

  it("renders with no characters", () => {
    cy.mount(
      <ChakraProvider>
        <CharactersGrid characters={[]} />
      </ChakraProvider>
    );

    cy.get('[data-cy="character-grid"]').should("exist");
    cy.get('[data-cy="character-card"]').should("not.exist");
  });

  it("renders with different numbers of characters", () => {
    const mockCharacters = [
      {
        id: "1",
        name: "Rick Sanchez",
        species: "Human",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
      {
        id: "2",
        name: "Morty Smith",
        species: "Human",
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      },
    ];

    // Mount component with ChakraProvider
    cy.mount(
      <ChakraProvider>
        <CharactersGrid characters={mockCharacters} />
      </ChakraProvider>
    );

    // Verify component rendering
    cy.get('[data-cy="character-grid"]').should("exist");
    cy.get('[data-cy="character-card"]').should("have.length", 2);
  });

  it("renders with single character", () => {
    const singleCharacter = [
      {
        id: "1",
        name: "Rick Sanchez",
        species: "Human",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
    ];

    cy.mount(
      <ChakraProvider>
        <CharactersGrid characters={singleCharacter} />
      </ChakraProvider>
    );

    cy.get('[data-cy="character-card"]').should("have.length", 1);
  });
});
