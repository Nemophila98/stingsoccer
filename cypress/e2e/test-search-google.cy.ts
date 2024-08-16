describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
    // Selector By ID will be changed when code re-deploy
    cy.get("#APjFqb").type("ngan Ho")
  })
})
