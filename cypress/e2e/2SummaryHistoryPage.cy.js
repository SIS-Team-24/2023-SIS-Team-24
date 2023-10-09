describe("Summary History Page", () => {
    beforeEach(() => {
        cy.viewport(1536, 960);
    });

    it("Going to Summary History Page", () => {
        cy.visit("/");
        cy.contains("Summary History").click();

        cy.url().should("include", "history");
    });
});
