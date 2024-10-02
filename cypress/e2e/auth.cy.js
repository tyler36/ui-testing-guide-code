import { Default as TaskListDefaults } from '../../src/components/TaskList.stories'

describe('The login page', () => {
  beforeEach(() => {
    cy.intercept('POST', '/authenticate', {
      statusCode: 201,
      body: {
        user: {
          name: 'Alice Carr',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        },
      },
    })

    cy.intercept('GET', '/tasks', {
      statusCode: 201,
      body: TaskListDefaults.args,
    })
  })

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
