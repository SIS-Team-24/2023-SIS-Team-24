describe("Key Insights", () => {
  beforeEach(() => {
    cy.viewport(1536, 960);
  });

  it("should be empty on initial load (no summary)", () => {
    cy.visit("/");

    // Assert the placeholder (Summarise text to view keywords) is present with expected text
    cy.get('[data-cy="key-insights-placeholder"]')
      .should('exist')
      .should('be.visible')
      .should('contain', 'Summarise text to view keywords');
  });

  it("should populate after summarising", () => {
    cy.visit("/");

    cy.get("#inputted-text").type(
      "Machine learning (ML) is an umbrella term for solving problems for which development of algorithms by human programmers would be cost-prohibitive, and instead the problems are solved by helping machines discover their own algorithms, without needing to be explicitly told what to do by any human-developed algorithms. Recently, generative artificial neural networks have been able to surpass results of many previous approaches. Machine-learning approaches have been applied to large language models, computer vision, speech recognition, email filtering, agriculture and medicine, where it is too costly to develop algorithms to perform the needed tasks. The mathematical foundations of ML are provided by mathematical optimisation (mathematical programming) methods. Data mining is a related (parallel) field of study, focusing on exploratory data analysis through unsupervised learning.",
      { delay: 0 }
    );

    cy.get("#summarise-button-id").click();

    // Hard coding the expected values instead of manually calculating the top frequencies.
    // The logic behind this is in the backend, we just want to test that it works and shows up.
    const expectedValues = {
      'algorithms': '4',
      'learning': '3',
      'mathematical': '3',
      'Machine' : '2',
      'ML' : '2',
      'problems' : '2',
      'human' : '2',
      'approaches' : '2',
      'umbrella' : '1',
      'term' : '1'
    };
    
    for (const [keyword, count] of Object.entries(expectedValues)) {
      cy.get('[data-cy="key-insights-table"]').contains('div', keyword, { timeout : 30000 }).parent().within(() => {
        cy.contains(keyword).should('exist');
        cy.contains(count).should('exist');
      });
    }
  });

});
