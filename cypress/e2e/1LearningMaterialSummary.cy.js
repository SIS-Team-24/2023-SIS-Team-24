describe('Learning Material Summary', () => {
    it('Going to Learning Material Summary Page', () => {
        cy.visit('/')
        cy.contains('Learning Material Summary').click();
        
        cy.url().should('include', 'learningMaterialSummary')

        cy.contains('What dataset was Text Insights trained on?').click();
        cy.get('#0').should('contain', 'BERT');
        
        cy.contains('What dataset was Text Insights trained on?').click();
        cy.contains('How does BERT work?').click();
        cy.get('#1').should('contain', 'BERT');
        
        cy.contains('How does BERT work?').click();
    })
})