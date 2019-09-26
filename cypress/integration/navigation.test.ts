describe('login', () => {
  it('go to logged out pages', () => {
    cy.visit('/')
    cy.find('connexion').click()
    cy.url().should('include', '/login')
  })
})
