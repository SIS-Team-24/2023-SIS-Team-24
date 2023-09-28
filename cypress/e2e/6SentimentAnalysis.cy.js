describe("Sentiment Analysis Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should enter positive text, click Sentiment, and check for a positive result", () => {
    // Type text into the textarea
    cy.get("#inputted-text").type(
      "I am delighted to announce that this test was a success!"
    );

    // Click the Sentiment button
    cy.get("button").contains("Sentiment").click();

    // Wait for the API call and result to appear (you may need to adjust the wait time)
    cy.wait(3000); // Adjust the wait time as needed

    // Assert that the text contains the sentiment and score
    cy.get("#sentiment-result", { timeout: 10000 }).then(($span) => {
      // Get the text content of the <span> element
      const spanText = $span.text();
      expect(spanText).to.include("Positive");
      expect(spanText).to.include("99%");
    });
  });

  it("should enter neutral text, click Sentiment, and check for a neutral result", () => {
    // Type text into the textarea
    cy.get("#inputted-text").type("This is a test text.");

    // Click the Sentiment button
    cy.get("button").contains("Sentiment").click();

    // Wait for the API call and result to appear (you may need to adjust the wait time)
    cy.wait(3000); // Adjust the wait time as needed

    // Assert that the text contains the sentiment and score
    cy.get("#sentiment-result", { timeout: 10000 }).then(($span) => {
      // Get the text content of the <span> element
      const spanText = $span.text();
      expect(spanText).to.include("Neutral");
      expect(spanText).to.include("73%");
    });
  });

  it("should enter negative text, click Sentiment, and check for a negative result", () => {
    // Type text into the textarea
    cy.get("#inputted-text").type(
      "I am very disappointed with the outcome of this test."
    );

    // Click the Sentiment button
    cy.get("button").contains("Sentiment").click();

    // Assert that the text contains the sentiment and score
    cy.get("#sentiment-result", { timeout: 10000 }).then(($span) => {
      // Get the text content of the <span> element
      const spanText = $span.text();
      expect(spanText).to.include("Negative");
      expect(spanText).to.include("98%");
    });
  });
});
