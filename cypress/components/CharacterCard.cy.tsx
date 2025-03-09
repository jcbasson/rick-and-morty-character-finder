import CharacterCard from "../../src/app/components/CharacterCard";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

// Mock theme for the component test
const theme = extendTheme({
  colors: {
    portalGreen: {
      500: "#3bec97",
    },
    space: {
      500: "#1f2937",
      700: "#0d131c",
    },
    mortyYellow: {
      500: "#fafd7c",
    },
  },
});

describe("CharacterCard Component", () => {
  const mockCharacter = {
    id: "1",
    name: "Rick Sanchez",
    species: "Human",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  };

  beforeEach(() => {
    cy.mount(
      <ChakraProvider theme={theme}>
        <CharacterCard character={mockCharacter} />
      </ChakraProvider>
    );
  });

  it("displays the character name and species", () => {
    cy.get('[data-cy="character-name"]').should("contain", "Rick Sanchez");
    cy.get('[data-cy="character-species"]').should("contain", "Human");
  });

  it("displays the character image", () => {
    cy.get("img").should("have.attr", "src", mockCharacter.image);
    cy.get("img").should("have.attr", "alt", mockCharacter.name);
  });

  it("has the correct styling", () => {
    // Check if the card has portal styling class
    cy.get('[data-cy="character-card"]').should("have.class", "portal-card");

    // Check if the name has the right color
    cy.get('[data-cy="character-name"]').should("have.css", "color");
  });
});
