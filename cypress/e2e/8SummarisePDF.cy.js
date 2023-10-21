describe("Cypress Testing PDF", () => {
  it("Summarise PDF", () => {
    // visit our beautiful website
    cy.visit("/");

    // check if the summarise button is disabled
    cy.get("#summarise-button-id").should("be.disabled");

    // wait
    cy.wait(1000);

    // call my readPdf custom function (cypress.config.ts) on task
    cy.task("readPdf", "/cypress/case-study.pdf").then((pdfText) => {
      // Input/Type it on to the text area
      cy.get("#inputted-text").type(pdfText);

      cy.get("#summarise-button-id").click();
    });
  });
});
