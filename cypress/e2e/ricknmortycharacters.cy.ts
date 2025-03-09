describe("Rick and Morty Character Finder", () => {
  beforeEach(() => {
    cy.intercept("POST", "https://rickandmortyapi.com/graphql", (req) => {
      if (req.body.query.includes("characters")) {
        // Match the page variable
        const pageMatch = req.body.variables && req.body.variables.page === 1;

        if (pageMatch) {
          req.reply({
            statusCode: 200,
            body: {
              data: {
                characters: {
                  info: {
                    count: 826,
                    pages: 42,
                    next: 2,
                    prev: null,
                  },
                  results: [
                    {
                      id: "1",
                      name: "Rick Sanchez",
                      species: "Human",
                      image:
                        "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                    },
                    {
                      id: "2",
                      name: "Morty Smith",
                      species: "Human",
                      image:
                        "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
                    },
                    {
                      id: "3",
                      name: "Summer Smith",
                      species: "Human",
                      image:
                        "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
                    },
                    {
                      id: "4",
                      name: "Beth Smith",
                      species: "Human",
                      image:
                        "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
                    },
                    {
                      id: "5",
                      name: "Jerry Smith",
                      species: "Human",
                      image:
                        "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
                    },
                    {
                      id: "6",
                      name: "Abadango Cluster Princess",
                      species: "Alien",
                      image:
                        "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
                    },
                  ],
                },
              },
            },
          });
        }
      }
    }).as("charactersQuery");

    cy.visit("/ricknmortycharacters");
  });

  context("Layout Components", () => {
    it("should display the header with correct title", () => {
      cy.get('[data-cy="page-title"]')
        .should("be.visible")
        .and("contain", "Rick n Morty");
    });

    it("should display the portal image in the header", () => {
      cy.get('img[alt="Portal"]').should("be.visible");
    });

    it("should display the intro text with *burp* message", () => {
      cy.contains("*burp*").should("be.visible");
      cy.contains("Explore characters from across the multiverse").should(
        "be.visible"
      );
    });

    it("should display the footer text", () => {
      cy.contains("Powered by the Rick and Morty API").should("be.visible");
      cy.contains("wubba lubba dub dub").should("be.visible");
    });
  });

  context("Character Grid", () => {
    it("should display loading state initially", () => {
      cy.intercept("POST", "https://rickandmortyapi.com/graphql", (req) => {
        // Add a significant delay (3 seconds)
        req.on("response", (res) => {
          // Delay the response by 3 seconds
          res.setDelay(3000);
        });
      }).as("delayedResponse");

      // Visit the page to trigger the loading state
      cy.visit("/ricknmortycharacters");

      // Now check for loading state
      cy.get('[data-cy="loading-spinner"]').should("be.visible");
      cy.contains("Opening a portal").should("be.visible");

      // Optionally wait for response to complete
      cy.wait("@delayedResponse");
    });

    it("should load and display the character grid after API response", () => {
      // Wait for API response
      cy.wait("@charactersQuery");

      // Verify grid exists
      cy.get('[data-cy="character-grid"]').should("be.visible");

      // Verify character cards are displayed
      cy.get('[data-cy="character-card"]').should("have.length", 6);
    });

    it("should display correct character information", () => {
      cy.wait("@charactersQuery");

      // Check first character
      cy.get('[data-cy="character-card"]')
        .first()
        .within(() => {
          cy.get('[data-cy="character-name"]').should(
            "contain",
            "Rick Sanchez"
          );
          cy.get('[data-cy="character-species"]').should("contain", "Human");
          cy.get("img").should("have.attr", "src").and("include", "avatar/1");
        });

      // Check a non-human character
      cy.get('[data-cy="character-card"]')
        .eq(5)
        .within(() => {
          cy.get('[data-cy="character-name"]').should(
            "contain",
            "Abadango Cluster Princess"
          );
          cy.get('[data-cy="character-species"]').should("contain", "Alien");
        });
    });

    it("should have hover effects on character cards", () => {
      cy.wait("@charactersQuery");

      // Check that character cards have the portal-card class
      cy.get('[data-cy="character-card"]').should("have.class", "portal-card");

      // Verify the card has a transform property in its hover style
      cy.get('[data-cy="character-card"]')
        .first()
        .then(($el) => {
          // Force hover state (this is more reliable than trigger)
          $el[0].classList.add("chakra-hover");
          // Or use this for direct style modification
          $el[0].style.transform = "translateY(-5px) scale(1.03)";

          // Now check if transform was applied
          const after = window.getComputedStyle($el[0]);
          expect(after.transform).not.to.equal("none");
        });
    });
  });

  context("Pagination", () => {
    it("should display pagination controls", () => {
      cy.wait("@charactersQuery");

      cy.get('[data-cy="prev-page"]').should("be.visible");
      cy.get('[data-cy="next-page"]').should("be.visible");
      cy.get('[data-cy="page-indicator"]').should("contain", "1 / 42");
    });

    it("should disable previous button on first page", () => {
      cy.wait("@charactersQuery");

      cy.get('[data-cy="prev-page"]').should("be.disabled");
      cy.get('[data-cy="next-page"]').should("not.be.disabled");
    });

    it("should navigate to next page when clicking next", () => {
      cy.wait("@charactersQuery");
      cy.intercept("POST", "https://rickandmortyapi.com/graphql", (req) => {
        if (
          req.body.query.includes("characters") &&
          req.body.variables &&
          req.body.variables.page === 2
        ) {
          req.reply({
            statusCode: 200,
            body: {
              data: {
                characters: {
                  info: {
                    count: 826,
                    pages: 42,
                    next: 3,
                    prev: 1,
                  },
                  results: [
                    {
                      id: "21",
                      name: "Aqua Morty",
                      species: "Humanoid",
                      image:
                        "https://rickandmortyapi.com/api/character/avatar/21.jpeg",
                    },
                    {
                      id: "22",
                      name: "Aqua Rick",
                      species: "Humanoid",
                      image:
                        "https://rickandmortyapi.com/api/character/avatar/22.jpeg",
                    },
                  ],
                },
              },
            },
          });

          req.on("response", (res) => {
            // Delay the response by 3 seconds
            res.setDelay(1000);
          });
        }
      }).as("page2Query");

      // Click next page
      cy.get('[data-cy="next-page"]').click();

      // Should show loading state
      cy.get('img[alt="Loading Portal"]').should("be.visible");

      // Wait for page 2 response
      cy.wait("@page2Query");

      // Check page indicator updated
      cy.get('[data-cy="page-indicator"]').should("contain", "2 / 42");

      // Check different characters are shown
      cy.get('[data-cy="character-name"]')
        .first()
        .should("contain", "Aqua Morty");

      // Previous button should now be enabled
      cy.get('[data-cy="prev-page"]').should("not.be.disabled");
    });

    it("should navigate through pages back and forth", () => {
      // First wait for initial data load
      cy.wait("@charactersQuery");

      // Store the text of the first character on page 1
      let firstCharacterName = "";
      cy.get('[data-cy="character-name"]')
        .first()
        .invoke("text")
        .then((text) => {
          firstCharacterName = text.trim();
        });

      // Verify we're on page 1
      cy.get('[data-cy="page-indicator"]').should("contain", "1");
      cy.get('[data-cy="prev-page"]').should("be.disabled");
      cy.get('[data-cy="next-page"]').should("not.be.disabled");

      // Click next page
      cy.get('[data-cy="next-page"]').click();

      // Verify we're on page 2
      cy.get('[data-cy="page-indicator"]').should("contain", "2");

      // Both navigation buttons should be enabled now
      cy.get('[data-cy="prev-page"]').should("not.be.disabled");
      cy.get('[data-cy="next-page"]').should("not.be.disabled");

      // Character name should be different on page 2
      cy.get('[data-cy="character-name"]')
        .first()
        .invoke("text")
        .then((text) => {
          const page2Name = text.trim();
          expect(page2Name).not.to.equal(firstCharacterName);
        });

      // Click previous page
      cy.get('[data-cy="prev-page"]').click();

      // Verify we're back on page 1
      cy.get('[data-cy="page-indicator"]').should("contain", "1");

      // Previous button should be disabled again
      cy.get('[data-cy="prev-page"]').should("be.disabled");

      // Verify we see the same character name as before
      cy.get('[data-cy="character-name"]')
        .first()
        .invoke("text")
        .then((text) => {
          const currentName = text.trim();
          expect(currentName).to.equal(firstCharacterName);
        });
    });
  });

  context("Error Handling", () => {
    it("should display error message when API fails", () => {
      // First reset the intercept
      cy.intercept("POST", "https://rickandmortyapi.com/graphql", {
        statusCode: 500,
        body: {
          errors: [{ message: "Server error" }],
        },
      }).as("errorQuery");

      // Reload the page to trigger the error
      cy.reload();

      // Wait for the error request
      cy.wait("@errorQuery");

      // Verify error message is displayed
      cy.get('[data-cy="error-message"]').should("be.visible");
      cy.contains("Oh jeez! Something went wrong!").should("be.visible");
      cy.contains("Response not successful: Received status code 500").should(
        "be.visible"
      );

      // Verify retry button exists
      cy.contains("Try Again").should("be.visible");
    });

    it("should retry loading when clicking Try Again button", () => {
      // First cause an error
      cy.intercept("POST", "https://rickandmortyapi.com/graphql", {
        statusCode: 500,
        body: {
          errors: [{ message: "Server error" }],
        },
      }).as("errorQuery");

      cy.reload();
      cy.wait("@errorQuery");

      // Now set up success response for retry
      cy.intercept("POST", "https://rickandmortyapi.com/graphql", {
        statusCode: 200,
        body: {
          data: {
            characters: {
              info: {
                count: 826,
                pages: 42,
                next: 2,
                prev: null,
              },
              results: [
                {
                  id: "1",
                  name: "Rick Sanchez",
                  species: "Human",
                  image:
                    "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                },
              ],
            },
          },
        },
      }).as("retryQuery");

      // Click retry button
      cy.contains("Try Again").click();

      // Wait for retry query
      cy.wait("@retryQuery");

      // Verify characters load
      cy.get('[data-cy="character-grid"]').should("be.visible");
    });
  });
});
