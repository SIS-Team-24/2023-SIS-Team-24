describe("Cypress Testing PDF", () => {
  it("Summarise PDF", () => {
    // visit our beautiful website
    cy.visit("/");

    // check if the summarise button is disabled
    cy.get("#summarise-button-id").should("be.disabled");

    // wait
    cy.wait(1000);

    // const textareaSelector = '[data-cy="input_textarea"]';

    cy.get("textarea#inputted-text").selectFile("case-study.pdf", {
      action: "drag-drop",
    });

    cy.get("#summarise-button-id").should("be.enabled");

    cy.get("#summarise-button-id").click();
  });
});
