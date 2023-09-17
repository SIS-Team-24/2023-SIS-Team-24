describe("About Page", () => {
  it("Going to About Page", () => {
    cy.visit("/");
    cy.contains("About").click();

    cy.url().should("include", "about");

    cy.get("#AboutDesc").should("contain", "Natural Language Processing");
  });
});
