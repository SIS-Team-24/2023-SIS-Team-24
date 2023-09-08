describe('Learning Material Summary', () => {
    it('Going to Learning Material Summary Page', () => {
        cy.visit('/')
        cy.contains('Learning Material Summary').click();
        cy.wait(2000)

        cy.contains('What dataset was Text Insights trained on?').click();
        cy.contains('BERT')
        cy.wait(2000)

        cy.contains('What dataset was Text Insights trained on?').click();
        cy.contains('How does BERT work?').click();
        cy.contains('BERT')
        
        cy.wait(2000)
        cy.contains('How does BERT work?').click();
    })
})