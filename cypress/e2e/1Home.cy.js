describe("Testing the Home Page", () => {
  beforeEach(() => {
    cy.viewport(1536, 960);
  });

  it("Checking the NavBar Element Exists", () => {
    cy.visit("/");
    cy.url().should("include", "/");
    cy.get("#Navbar");
  });

  it("Visiting the Summary History Page", () => {
    cy.visit("/");
    cy.contains("Summary History").click();
    cy.url().should("include", "history");
    cy.visit("/");
  });

  it("Visiting the LearnMore Page", () => {
    cy.visit("/");
    cy.contains("Learn More").click();
    cy.url().should("include", "learnmore");
    cy.visit("/");
  });

  it("Visiting the About Page", () => {
    cy.visit("/");
    cy.contains("About").click();
    cy.url().should("include", "about");
    cy.visit("/");
  });

  // function to test font so that we can keep the code DRY hahahaha, please no more changes on cypress, i don't want to do it
  function testFont(fontKey, font) {
    const text = "NLP Sentiment Analysis";
    cy.visit("/");

    cy.get("#inputted-text").type(text);
    cy.get("#inputted-text").should("have.value", text);

    // Click the font customization button
    cy.get('button:contains("Change font")').click();

    // Wait for the font options to appear
    cy.wait(1000); // Adjust the wait time as needed

    // Click on the specified font
    cy.contains(fontKey).click({ force: true });

    // Check if the font is equivalent to the selected font
    cy.get("#inputted-text").should("have.css", "font-family", `${font}`);
  }

  // Test Open Sans
  it("Select and Test Open Sans", () => {
    testFont("Open Sans", "open-sans");
  });

  // Test Roboto
  it("Select and Test Roboto", () => {
    testFont("Roboto", "roboto");
  });

  // Test Mooli
  it("Select and Test Mooli", () => {
    testFont("Mooli", "mooli");
  });
});
