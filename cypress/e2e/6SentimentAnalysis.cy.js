describe("Sentiment Analysis Test", () => {
    const positiveText =
        "In the tapestry of life, there are countless moments that fill our hearts with joy and gratitude. From the simple pleasure of a warm sunrise to the embrace of loved ones, positivity abounds. Acts of kindness ripple through communities, inspiring hope and connection. Achievements, big and small, fuel our sense of accomplishment and drive. Nature's beauty, with its serene landscapes and vibrant blooms, reminds us of the wonder that surrounds us. Each day is a canvas on which we can paint our dreams and aspirations. Embracing optimism, we can navigate life's challenges with resilience, knowing that the future holds endless opportunities for growth, love, and happiness";
    const neutralText =
        "In this paragraph, we will provide information and details without expressing any bias or taking a stance on the topic. Our aim is to present the facts objectively, allowing readers to form their own opinions based on the information provided. We will avoid any subjective language or personal opinions, focusing solely on providing an unbiased account of the topic at hand. This neutral approach ensures that the information is presented in a fair and balanced manner, promoting a clear understanding of the subject matter. This paragraph will then be processed by the text insights software to identify its sentiment and score.";
    const negativeText =
        "In today's world, challenges and adversities seem to be ever-present. Economic uncertainties often lead to financial stress, job insecurities, and strained livelihoods. Health crises, such as the ongoing global pandemic, have brought illness, loss, and grief into the lives of countless individuals and families. Social divisions and conflicts continue to cast shadows over communities, leading to polarization and discord. Environmental concerns loom large, with issues like climate change and pollution threatening the planet's future. It's a time when anxiety and mental health struggles are on the rise, and the fast-paced digital age can leave many feeling isolated and overwhelmed. In such a complex landscape, finding solace and solutions can be an uphill battle.";
    beforeEach(() => {
        cy.visit("/");
        cy.viewport(1536, 960);
    });

    it("should enter positive text, click Sentiment, and check for a positive result", () => {
        // Type text into the textarea
        cy.get("#inputted-text").type(positiveText, { delay : 0 });

        // Click the Sentiment button
        cy.get("button").contains("Sentiment").click();

        // Assert that the text contains the sentiment and score
        cy.get("#sentiment-result", { timeout: 10000 }).should(($span) => {
            // Get the text content of the <span> element
            const spanText = $span.text();
            expect(spanText).to.include("Positive");
            expect(spanText).to.include("98%");
        });
    });

    it("should enter neutral text, click Sentiment, and check for a neutral result", () => {
        // Type text into the textarea
        cy.get("#inputted-text").type(neutralText, { delay : 0 });

        // Click the Sentiment button
        cy.get("button").contains("Sentiment").click();

        // Assert that the text contains the sentiment and score
        cy.get("#sentiment-result", { timeout: 10000 }).should(($span) => {
            // Get the text content of the <span> element
            const spanText = $span.text();
            expect(spanText).to.include("Neutral");
            expect(spanText).to.include("56%");
        });
    });

    it("should enter negative text, click Sentiment, and check for a negative result", () => {
        // Type text into the textarea
        cy.get("#inputted-text").type(negativeText, { delay : 0 });

        // Click the Sentiment button
        cy.get("button").contains("Sentiment").click();

        // Assert that the text contains the sentiment and score
        cy.get("#sentiment-result", { timeout: 10000 }).should(($span) => {
            // Get the text content of the <span> element
            const spanText = $span.text();
            expect(spanText).to.include("Negative");
            expect(spanText).to.include("85%");
        });
    });
});
