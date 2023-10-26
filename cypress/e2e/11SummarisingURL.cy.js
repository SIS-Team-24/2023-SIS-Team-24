describe("Testing 'Summarise Website (URL)' feature", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1536, 960);
  });

  it("Check the required elements for a URL exists", () => {
    cy.url().should("include", "/");
    cy.get("#inputForUrl");
    cy.get("#inputForUrlBtn");
  });

  it("Test that text is extracted from the inputted URL", () => {
    cy.get("#inputForUrl").type("https://www.boulderbrighton.com/what-is-bouldering", { delay: 0 });

    cy.get("#inputForUrlBtn").click();

    // Assert that the input text box contains an expected input text
    cy.get("#inputted-text", { timeout: 20000 }).should(($div) => {
      // Get the text content of the <div> element
      const inputText = $div.text();
      expect(inputText).to.not.be.empty;
    });
  });
});
