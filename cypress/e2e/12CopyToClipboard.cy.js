describe("Copy to Clipboard Functionality", () => {
  it("Should copy text to the clipboard", () => {
    // Visit the page
    cy.visit("/");

    // Type some input text into the textarea
    cy.get('[data-cy="input_textarea"]').type(
      "In the tapestry of life, there are countless moments that fill our hearts with joy and gratitude. From the simple pleasure of a warm sunrise to the embrace of loved ones, positivity abounds. Acts of kindness ripple through communities, inspiring hope and connection. Achievements, big and small, fuel our sense of accomplishment and drive. Nature's beauty, with its serene landscapes and vibrant blooms, reminds us of the wonder that surrounds us. Each day is a canvas on which we can paint our dreams and aspirations. Embracing optimism, we can navigate life's challenges with resilience, knowing that the future holds endless opportunities for growth, love, and happiness"
    );

    // Click the Summarize button
    cy.get("#summarise-button-id").click();

    // Wait for the summary to be generated
    cy.get("#summary-result").invoke("text").should("not.be.empty");

    // Wait for the "Copy Summary Text" button to appear
    cy.get("button:contains('Copy Summary Text')", { timeout: 50000 }).should(
      "be.visible"
    );

    // Click the Copy Summary Text button
    cy.get("button:contains('Copy Summary Text')").click();

    // Check if the clipboard has some text
    cy.window().then((win) => {
      cy.wrap(win.navigator.clipboard.readText()).should("not.be.empty");
    });
  });
});
