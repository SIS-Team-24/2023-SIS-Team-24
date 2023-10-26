describe("Share URL", () => {
  it("Sharing URL feature", () => {
    cy.visit("/");

    cy.get("#inputted-text").type(
      "Machine learning (ML) is an umbrella term for solving problems for which development of algorithms by human programmers would be cost-prohibitive, and instead the problems are solved by helping machines discover their own algorithms, without needing to be explicitly told what to do by any human-developed algorithms. Recently, generative artificial neural networks have been able to surpass results of many previous approaches. Machine-learning approaches have been applied to large language models, computer vision, speech recognition, email filtering, agriculture and medicine, where it is too costly to develop algorithms to perform the needed tasks. The mathematical foundations of ML are provided by mathematical optimisation (mathematical programming) methods. Data mining is a related (parallel) field of study, focusing on exploratory data analysis through unsupervised learning.",
      { delay: 0 }
    );

    cy.get("#summarise-button-id").click();

    cy.visit(
      "/?state=N4IgLgpgHmCSB2AHArmEAuEIA0ICWSqAagIYA2yEGIAsiQMYAWBEABGRCQE7wEDmrABQ0AMgEpWeAM6sS8VsgC2AIy4QyZEq0hdFrAGYB7LqymGyAN36tEXQ8o6KZRkwHdmTVgBMIF9YcRFCHgwVkN9WTI+YzwwRidWZQBPVkYlORs7Pi4SRSCuGVdDZDIvRLZ6QykwAFpbQ2ZlWLw-bFl4MoJqzjK4tnqHCATuNjNLCDLk1PVEa0UGZngIGS9pSr8TPrwTQ1d5cmiuWPipNtdj4tClieswQ3LWaEQyPHpYshS70tZ3ElC77z3KZyFJpebwGo+PxkAITSKHY5OAB0rAAShB6MEwB82nxghAcmAWmxuET9K88ORWEtkDkyNSIGAilwANYyRgkPzlYKyQbae5SWmIEhSGRqQVkMAycKscEpWy+PDFGQkRD1BbLFF0JgsGocbi8eACVXqpjLVKctjKCA8k0vOEAzRcPHsOR8ZAkF2KQw+MinViVRQoHSsKxSJXwNpSRA2zxqSp8XhEwyRx7zPD08mSgn8Nqeo70EpgWkkjqym5vJZnRgEtixSQyO73SrVD787y+fyIeExOIJAExrguPR9BkTB0itkogAqNdlfxr8yJ9CpRmQHT+EelEVEsjUmUMVh8kxSS8Xm5X9ICRMU0k3KaEZ6GF6p9WyuVvRokQTiPqkKIAET+LRP2saRZFYNRNEgMpBGFOkODICRyXUMoZWqZAvCSNojELcMjTCeQnhhQljBSLxgPacgknDRtGDsZA+EYBR4EFQcwzhfUeH4JEcBAZkvAAYWKEIMAARgAJgAZlwKQsTwIIQmnaAwAABU0TFGHMHwuGoPihkMZN4HIZSYHUhgIC00oCT02T5MUsBTLQTA+LkkIFKxABlSo1AwAAGXAWQgJIBKkDBgAAX1wAyjJEEhrTIWyQDkjh6BggAxFNnKwCKgA"
    );

    cy.visit("/");

    cy.url().should("include", "/");
  });

  it("State URL", () => {
    cy.visit(
      "/?state=N4IgLgpgHmCSB2AHArmEAuEIA0ICWSqAagIYA2yEGIAsiQMYAWBEABGRCQE7wEDmrABQ0AMgEpWeAM6sS8VsgC2AIy4QyZEq0hdFrAGYB7LqymGyAN36tEXQ8o6KZRkwHdmTVgBMIF9YcRFCHgwVkN9WTI+YzwwRidWZQBPVkYlORs7Pi4SRSCuGVdDZDIvRLZ6QykwAFpbQ2ZlWLw-bFl4MoJqzjK4tnqHCATuNjNLCDLk1PVEa0UGZngIGS9pSr8TPrwTQ1d5cmiuWPipNtdj4tClieswQ3LWaEQyPHpYshS70tZ3ElC77z3KZyFJpebwGo+PxkAITSKHY5OAB0rAAShB6MEwB82nxghAcmAWmxuET9K88ORWEtkDkyNSIGAilwANYyRgkPzlYKyQbae5SWmIEhSGRqQVkMAycKscEpWy+PDFGQkRD1BbLFF0JgsGocbi8eACVXqpjLVKctjKCA8k0vOEAzRcPHsOR8ZAkF2KQw+MinViVRQoHSsKxSJXwNpSRA2zxqSp8XhEwyRx7zPD08mSgn8Nqeo70EpgWkkjqym5vJZnRgEtixSQyO73SrVD787y+fyIeExOIJAExrguPR9BkTB0itkogAqNdlfxr8yJ9CpRmQHT+EelEVEsjUmUMVh8kxSS8Xm5X9ICRMU0k3KaEZ6GF6p9WyuVvRokQTiPqkKIAET+LRP2saRZFYNRNEgMpBGFOkODICRyXUMoZWqZAvCSNojELcMjTCeQnhhQljBSLxgPacgknDRtGDsZA+EYBR4EFQcwzhfUeH4JEcBAZkvAAYWKEIMAARgAJgAZlwKQsTwIIQmnaAwAABU0TFGHMHwuGoPihkMZN4HIZSYHUhgIC00oCT02T5MUsBTLQTA+LkkIFKxABlSo1AwAAGXAWQgJIBKkDBgAAX1wAyjJEEhrTIWyQDkjh6BggAxFNnKwCKgA"
    );
  });
});
