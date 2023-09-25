describe("Sentiment Analysis Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should enter positive text, click Sentiment, and check for a positive result", () => {
    // Type text into the textarea
    cy.get("#inputted-text").type("I am delighted to announce that this test was a success!");

    // Click the Sentiment button
    cy.get("button").contains("Sentiment").click();

    // Wait for the API call and result to appear (you may need to adjust the wait time)
    cy.wait(3000); // Adjust the wait time as needed

    // Assert that the sentiment result is displayed
    cy.get("#sentiment-result").should("contain", "Positive");
  });

  it("should enter neutral text, click Sentiment, and check for a neutral result", () => {
    // Type text into the textarea
    cy.get("#inputted-text").type("This is a test text.");

    // Click the Sentiment button
    cy.get("button").contains("Sentiment").click();

    // Wait for the API call and result to appear (you may need to adjust the wait time)
    cy.wait(3000); // Adjust the wait time as needed

    // Assert that the sentiment result is displayed
    cy.get("#sentiment-result").should("contain", "Neutral");
  });

  it("should enter negative text, click Sentiment, and check for a negative result", () => {
    // Type text into the textarea
    cy.get("#inputted-text").type("I am very disappointed with the outcome of this test.");

    // Click the Sentiment button
    cy.get("button").contains("Sentiment").click();

    // Wait for the API call and result to appear (you may need to adjust the wait time)
    cy.wait(3000); // Adjust the wait time as needed

    // Assert that the sentiment result is displayed
    cy.get("#sentiment-result").should("contain", "Negative");
  });
});
