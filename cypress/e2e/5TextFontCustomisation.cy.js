describe("Text Font Customisation", () => {
  it("Customising the font", () => {
    cy.visit("/");
    cy.contains("Change Font").click();

    // Select the Roboto font from the dropdown box
    cy.get(".rounded.absolute.text-gray-700.pt-1").contains("Roboto");
    // Select the Open Sans font from the dropdown box
    cy.get(".rounded.absolute.text-gray-700.pt-1").contains("Open Sans");
    // Select the Mooli font from the dropdown box
    cy.get(".rounded.absolute.text-gray-700.pt-1").contains("Mooli");
  });
});
