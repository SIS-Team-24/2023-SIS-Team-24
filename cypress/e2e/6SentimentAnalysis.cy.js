// Sentiment Analysis API Tests
// Test for Positive, Neutral, and Negative inputs

describe("Sentiment Analysis API Test", () => {
  it("should return correct results when posting data to api sentiment process", () => {
    // Set correct API route
    const port = process.env.PORT ? parseInt(process.env.PORT) : 8000;
    const target =
      process.env.REACT_ENV == "production"
        ? "https://goat-thankful-iguana.ngrok-free.app" // Production backend URL (currently not used)
        : `http://127.0.0.1:${port}`; // Default development backend URL (make sure backend is running before running this test)

    /* Positive Test */

    // Define the request payload
    const positivePayload = {
      text: "I am delighted to announce that this test was a success!",
    };

    // Send a POST request to the API endpoint
    cy.request("POST", `${target}/api/sentiment/process`, positivePayload).then(
      (response) => {
        // Assert that the response status is 200 OK
        expect(response.status).to.eq(200);

        // Assert that the response body contains the expected properties
        expect(response.body)
          .to.have.property("sentiment")
          .and.equal("Positive");
        expect(response.body).to.have.property("score");
      }
    );

    /* Neutral Test */

    // Define the request payload
    const neutralPayload = {
      text: "This is a test text.",
    };

    // Send a POST request to the API endpoint
    cy.request("POST", `${target}/api/sentiment/process`, neutralPayload).then(
      (response) => {
        // Assert that the response status is 200 OK
        expect(response.status).to.eq(200);

        // Assert that the response body contains the expected properties
        expect(response.body)
          .to.have.property("sentiment")
          .and.equal("Neutral");
        expect(response.body).to.have.property("score");
      }
    );

    /* Negative Test */

    // Define the request payload
    const negativePayload = {
      text: "I am very disappointed with the outcome of this test.",
    };

    // Send a POST request to the API endpoint
    cy.request("POST", `${target}/api/sentiment/process`, negativePayload).then(
      (response) => {
        // Assert that the response status is 200 OK
        expect(response.status).to.eq(200);

        // Assert that the response body contains the expected properties
        expect(response.body)
          .to.have.property("sentiment")
          .and.equal("Negative");
        expect(response.body).to.have.property("score");
      }
    );
  });
});
