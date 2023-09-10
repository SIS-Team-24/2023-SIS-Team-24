describe("Navigation Bar", () => {
  it("Going to Navigation Bar Page", () => {
    cy.visit("/");

    cy.url().should("include", "/");

    cy.get("#Navbar");

    //cy.get("#Home").get("div").should("have.id", "Navbar");
  });
});
