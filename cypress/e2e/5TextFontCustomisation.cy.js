describe("Text Font Customisation", () => {
  it("Customising the font", () => {
    cy.visit("/");
    cy.contains("Change Font").click();

    const text = "NLP Sentiment Analysis";

    // Check if the Roboto font exists in the dropdown box
    cy.get(".rounded.absolute.text-gray-700.pt-1").contains("Roboto");
    // Check if the Open Sans font exists in the dropdown box
    cy.get(".rounded.absolute.text-gray-700.pt-1").contains("Open Sans");
    // Check if the Mooli font exists in the dropdown box
    cy.get(".rounded.absolute.text-gray-700.pt-1").contains("Mooli");

    // Enter text in the input area text box
    cy.get("#inputted-text").type(text);
    // Check if the entered text exists in the input area box
    cy.get("#inputted-text").should("have.value", text);

    // Check if the font is equivalent to Open Sans
    cy.get("#inputted-text").should("have.css", "font-family", `"Open Sans"`);

    // Click the button to open the font options
    cy.get('button:contains("Change Font")').click();
    // wait
    cy.wait(1000);
    // Click on the 'Roboto' font option
    cy.contains("Roboto").click({ force: true });

    // Check if the font is equivalent to Roboto
    cy.get("#inputted-text").should("have.css", "font-family", `roboto`);

    // Re-Click the button to open the font options again
    cy.get('button:contains("Change Font")').click();
    // wait
    cy.wait(1000);
    // Click on the 'Roboto' font option
    cy.contains("Mooli").click({ force: true });

    // Check if the font is equivalent to Roboto
    cy.get("#inputted-text").should("have.css", "font-family", `mooli`);
  });
});
