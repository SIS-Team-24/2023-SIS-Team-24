describe("Emotion Analysis", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.viewport(1536, 960);
    });

    it("Testing Emotion Analysis doesn't work", () => {
        cy.get("#sentiment-button").should("be.disabled");
    });

    it("Testing Emotion Analysis works", () => {
        cy.get("#inputted-text").type(
            "Machine learning (ML) is an umbrella term for solving problems for which development of algorithms by human programmers would be cost-prohibitive, and instead the problems are solved by helping machines discover their own algorithms, without needing to be explicitly told what to do by any human-developed algorithms. Recently, generative artificial neural networks have been able to surpass results of many previous approaches. Machine-learning approaches have been applied to large language models, computer vision, speech recognition, email filtering, agriculture and medicine, where it is too costly to develop algorithms to perform the needed tasks. The mathematical foundations of ML are provided by mathematical optimisation (mathematical programming) methods. Data mining is a related (parallel) field of study, focusing on exploratory data analysis through unsupervised learning."
        );

        cy.get("#sentiment-button").click();

        cy.get("#emotion-result", { timeout: 5000 }).should(($span) => {
            // Get the text content of the <span> element
            const spanText = $span.text();
            expect(spanText).to.not.equal("Not set");
        });
    });
});
