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

    it("Double Checking the Text Font Customisation Exists", () => {
        cy.visit("/");
        cy.contains("Change font").click();

        // Check if the Roboto font exists in the dropdown box
        cy.get(".absolute.text-gray-700.pt-1").contains("Roboto");
        // Check if the Open Sans font exists in the dropdown box
        cy.get(".absolute.text-gray-700.pt-1").contains("Open Sans");
        // Check if the Mooli font exists in the dropdown box
        cy.get(".absolute.text-gray-700.pt-1").contains("Mooli");
    });

    it("Customising the Text Font to Open Sans", () => {
        cy.visit("/");
        const text = "NLP Sentiment Analysis";
        // Enter text in the input area text box
        cy.get("#inputted-text").type(text);
        // Check if the entered text exists in the input area box
        cy.get("#inputted-text").should("have.value", text);

        // Check if the font is equivalent to Open Sans
        cy.get("#inputted-text").should("have.css", "font-family", `"Open Sans"`);

        // Click the button to open the font options
        cy.get('button:contains("Change font")').click();
        // wait
        cy.wait(1000);
        // Click on the 'Roboto' font option
        cy.contains("Roboto").click({ force: true });

        // Check if the font is equivalent to Roboto
        cy.get("#inputted-text").should("have.css", "font-family", `roboto`);

        // Re-Click the button to open the font options again
        cy.get('button:contains("Font: Roboto")').click();
        // wait
        cy.wait(1000);
        // Click on the 'Mooli' font option
        cy.contains("Mooli").click({ force: true });

        // Check if the font is equivalent to Mooli
        cy.get("#inputted-text").should("have.css", "font-family", `mooli`);
    });

    it("Customising the Text Font to Roboto", () => {
        cy.visit("/");
        const text = "NLP Sentiment Analysis";
        // Enter text in the input area text box
        cy.get("#inputted-text").type(text);
        // Check if the entered text exists in the input area box
        cy.get("#inputted-text").should("have.value", text);

        // Click the button to open the font options
        cy.get('button:contains("Change font")').click();
        // wait
        cy.wait(1000);
        // Click on the 'Roboto' font option
        cy.contains("Roboto").click({ force: true });

        // Check if the font is equivalent to Roboto
        cy.get("#inputted-text").should("have.css", "font-family", `roboto`);
    });

    it("Customising the Text Font to Mooli", () => {
        cy.visit("/");
        const text = "NLP Sentiment Analysis";
        // Enter text in the input area text box
        cy.get("#inputted-text").type(text);
        // Check if the entered text exists in the input area box
        cy.get("#inputted-text").should("have.value", text);

        // Re-Click the button to open the font options again
        cy.get('button:contains("Change font")').click();
        // wait
        cy.wait(1000);
        // Click on the 'Mooli' font option
        cy.contains("Mooli").click({ force: true });

        // Check if the font is equivalent to Mooli
        cy.get("#inputted-text").should("have.css", "font-family", `mooli`);
    });
});
