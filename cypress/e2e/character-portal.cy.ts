describe("Rick and Morty Character Portal", () => {
  beforeEach(() => {
    // Visit the application
    cy.visit("/");
  });

  it("displays the header with the correct title", () => {
    cy.get('[data-cy="page-title"]').should("contain", "Rick and Morty");
  });

  it("should show loading state and then display characters", () => {
    // Should initially show loading state
    cy.get('[data-cy="loading-spinner"]').should("exist");

    // Should eventually show character grid
    cy.get('[data-cy="character-grid"]').should("exist");

    // Should display character cards
    cy.get('[data-cy="character-card"]').should("have.length.at.least", 1);

    // Should display character names
    cy.get('[data-cy="character-name"]').first().should("not.be.empty");

    // Should display character species
    cy.get('[data-cy="character-species"]').first().should("not.be.empty");
  });

  it("navigates through pagination correctly", () => {
    // Wait for the first page to load
    cy.get('[data-cy="character-grid"]').should("exist");

    // Get the current page indicator
    cy.get('[data-cy="page-indicator"]').should("contain", "1");

    // Click next page
    cy.get('[data-cy="next-page"]').click();

    // Loading should appear
    cy.get('[data-cy="loading-spinner"]').should("exist");

    // Page indicator should update
    cy.get('[data-cy="page-indicator"]').should("contain", "2");

    // Character grid should update with new characters
    cy.get('[data-cy="character-card"]').should("have.length.at.least", 1);

    // Click previous page
    cy.get('[data-cy="prev-page"]').click();

    // Page indicator should go back to 1
    cy.get('[data-cy="page-indicator"]').should("contain", "1");
  });

  it("handles errors gracefully", () => {
    // Intercept the GraphQL request and force an error
    cy.intercept("POST", "https://rickandmortyapi.com/graphql", {
      statusCode: 500,
      body: { errors: [{ message: "Test error message" }] },
    });

    // Reload the page to trigger the error
    cy.reload();

    // Should show error message
    cy.get('[data-cy="error-message"]').should("exist");

    // Should have a retry button
    cy.get('[data-cy="error-message"]').contains("Try Again");
  });
});
