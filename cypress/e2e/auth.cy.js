describe('The login page', () => {
  it('user can authenticate using the login from', () => {
    const email = 'alice.carr@example.com'
    const password = 'k12h1k0$5;lpa@Afn'

    cy.visit('/')

    cy.get('input[name=email').type(email)
    cy.get('input[name=password').type(password)

    cy.get('button[type=submit').click()

    cy.get('[aria-label="tasks"] div').should('have.length', 6)
  })
})
